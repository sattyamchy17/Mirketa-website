// ============================================================
// POST /api/career-application
//
// Secure backend handler for the CareerApplicationForm component
// (src/components/CareerApplicationForm/). Receives the applicant's
// details + resume as multipart/form-data, validates everything
// server-side, and emails the application (with the resume attached)
// to the hiring team. No email/SMTP credentials ever live in the
// React/frontend code — they are read exclusively from environment
// variables that only exist on the server at runtime.
//
// PLATFORM ASSUMPTION: this repo (Mirketa-coding-website-2026) is a
// plain Vite SPA with no backend of its own before this file. The
// `/api/career-application` path the frontend calls matches Vercel's
// zero-config convention for serverless functions living in an /api
// folder at the project root (this file, deployed alongside the Vite
// `dist` build). If this project is hosted somewhere else (Netlify,
// a custom Node server, etc.), this file's *logic* is portable but
// its *location/export shape* will need to move to match that
// platform's serverless-function convention.
//
// LOCAL DEV: `npm run dev` (plain Vite) has no idea this file exists —
// Vite only auto-deploys /api as functions on Vercel itself. A small
// plugin in vite.config.js mounts this exact handler inside the dev
// server so the form has something real to POST to locally too.
//
// EMAIL PROVIDER: Microsoft 365 / Outlook (smtp.office365.com), sending
// as sattyam.choudhary@mirketa.com — see .env.example for the exact
// values and the two prerequisites that trip up most first attempts:
//   1. "Authenticated SMTP" (SMTP AUTH) must be turned on for that
//      specific mailbox in the Microsoft 365 admin center (it's off by
//      default on modern tenants). Admin center > Users > Active users
//      > sattyam.choudhary@mirketa.com > Mail > Manage email apps >
//      enable "Authenticated SMTP".
//   2. If that account has MFA/Security Defaults enabled, SMTP_PASS
//      must be an *app password* generated for it, not the normal
//      sign-in password — and some tenants disable app passwords
//      entirely via Conditional Access, in which case Basic Auth SMTP
//      cannot work at all and this endpoint would need to be rewritten
//      to send via the Microsoft Graph API (OAuth2 app registration)
//      instead. Ask your Microsoft 365 admin if either of those is the
//      case for this mailbox before assuming a wrong password.
//
// REQUIRED ENVIRONMENT VARIABLES — copy .env.example to .env for local
// testing (gitignored, never commit real values); set the same names in
// the hosting platform's dashboard for production:
//   SMTP_HOST     smtp.office365.com
//   SMTP_PORT     587
//   SMTP_SECURE   "false" (STARTTLS on 587 — Microsoft doesn't offer 465)
//   SMTP_USER     sattyam.choudhary@mirketa.com
//   SMTP_PASS     that mailbox's password, or an app password if MFA is on
//   SMTP_FROM     optional "From" address (defaults to SMTP_USER)
//
// Until those are set this endpoint responds with a clear "isn't
// configured yet" error (500) instead of silently failing — it is
// fully wired but cannot send real email without real credentials.
// ============================================================

import { formidable } from "formidable";
import nodemailer from "nodemailer";
import fs from "node:fs";

// Vercel/Next-style Node function convention: disable the platform's
// default body parsing so formidable can read the raw multipart stream.
export const config = {
  api: { bodyParser: false },
};

const RECIPIENT = "sattyam.choudhary@mirketa.com";
const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const ALLOWED_MIME_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

// Best-effort, single-instance-only rate limiting. Serverless
// instances are ephemeral and can run many copies in parallel, so
// this Map does NOT provide real distributed rate limiting — it only
// helps within one warm instance. For genuine abuse protection, add
// a real rate limiter (Vercel Edge Config, Upstash Redis, a WAF rule)
// in front of this endpoint.
const submissionsByIp = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

function sanitize(value, maxLength = 2000) {
  if (typeof value !== "string") return "";
  // Strip angle brackets so raw input can never inject markup into the
  // HTML email body assembled below (in addition to the escaping done
  // at render time).
  return value.replace(/[<>]/g, "").trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

// Plain Node `res.writeHead`/`res.end` rather than Vercel's `res.status().json()`
// sugar, so this exact handler runs unmodified both on Vercel (whose Node
// runtime still exposes the real http.ServerResponse underneath that sugar)
// and under the Vite dev-server middleware in vite.config.js, which hands
// this handler a vanilla Node response with no `.status()` helper at all.
function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(payload));
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
  if (isRateLimited(ip)) {
    return sendJson(res, 429, { error: "Too many submissions. Please try again later." });
  }

  const form = formidable({
    maxFileSize: MAX_RESUME_BYTES,
    maxFields: 20,
    maxFieldsSize: 20 * 1024,
  });

  let fields;
  let files;
  try {
    [fields, files] = await form.parse(req);
  } catch {
    return sendJson(res, 400, { error: "Invalid submission. Please check your file and try again." });
  }

  const get = (key, maxLength) => sanitize(Array.isArray(fields[key]) ? fields[key][0] : fields[key], maxLength);

  // Honeypot: a real applicant never fills this field. Bots that do
  // get a fake success response so they don't learn to skip it.
  if (get("company_website")) {
    return sendJson(res, 200, { ok: true });
  }

  const fullName = get("fullName");
  const email = get("email");
  const phone = get("phone");
  const location = get("location");
  const experience = get("experience");
  const linkedin = get("linkedin");
  const portfolio = get("portfolio");
  const coverMessage = get("coverMessage", 5000);
  const jobTitle = get("jobTitle") || "General Application";

  if (!fullName || !email || !phone || !location || !experience) {
    return sendJson(res, 400, { error: "Missing required fields." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return sendJson(res, 400, { error: "Invalid email address." });
  }

  const resumeFile = Array.isArray(files.resume) ? files.resume[0] : files.resume;
  if (!resumeFile) {
    return sendJson(res, 400, { error: "Resume file is required." });
  }
  const originalName = resumeFile.originalFilename || "resume";
  const hasValidExtension = ALLOWED_EXTENSIONS.some((ext) => originalName.toLowerCase().endsWith(ext));
  const hasValidType = !resumeFile.mimetype || ALLOWED_MIME_TYPES.includes(resumeFile.mimetype);
  if (!hasValidExtension || !hasValidType) {
    fs.unlink(resumeFile.filepath, () => {});
    return sendJson(res, 400, { error: "Resume must be a .pdf, .doc, or .docx file." });
  }
  if (resumeFile.size > MAX_RESUME_BYTES) {
    fs.unlink(resumeFile.filepath, () => {});
    return sendJson(res, 400, { error: "Resume exceeds the 5MB size limit." });
  }

  // SMTP transport — credentials come exclusively from server-side
  // environment variables, never from this source file or the client.
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("career-application: SMTP_HOST/SMTP_USER/SMTP_PASS are not set — see api/career-application.js header comment for setup steps.");
    fs.unlink(resumeFile.filepath, () => {});
    return sendJson(res, 500, { error: "Email sending isn't configured on this server yet." });
  }

  const smtpSecure = process.env.SMTP_SECURE === "true";
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: smtpSecure,
    // Microsoft's own SMTP AUTH docs for smtp.office365.com call for this
    // explicitly rather than relying on opportunistic STARTTLS — harmless
    // for other providers, since it just enforces TLS on port 587.
    requireTLS: !smtpSecure,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const html = `
    <h2>New Career Application: ${escapeHtml(jobTitle)}</h2>
    <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Location:</strong> ${escapeHtml(location)}</p>
    <p><strong>Experience:</strong> ${escapeHtml(experience)}</p>
    <p><strong>LinkedIn:</strong> ${linkedin ? escapeHtml(linkedin) : "—"}</p>
    <p><strong>Portfolio:</strong> ${portfolio ? escapeHtml(portfolio) : "—"}</p>
    <p><strong>Cover Message:</strong><br/>${coverMessage ? escapeHtml(coverMessage).replace(/\n/g, "<br/>") : "—"}</p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: RECIPIENT,
      replyTo: email,
      subject: `Career Application: ${jobTitle} — ${fullName}`,
      html,
      attachments: [{ filename: originalName, path: resumeFile.filepath }],
    });
  } catch (err) {
    console.error("career-application: email send failed:", err);
    return sendJson(res, 502, { error: "Unable to send application email right now." });
  } finally {
    fs.unlink(resumeFile.filepath, () => {});
  }

  return sendJson(res, 200, { ok: true });
}
