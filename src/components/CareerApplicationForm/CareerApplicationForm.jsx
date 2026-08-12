import { useId, useRef, useState } from "react";
import "./CareerApplicationForm.css";

// ============================================================
// CareerApplicationForm — purpose-built job application form,
// entirely separate from the shared Salesforce Web-to-Lead
// ContactForm. Submits multipart/form-data (fields + resume) to
// a secure backend endpoint; no email credentials of any kind
// exist in this file. See /api/career-application for the
// server-side handler that actually sends the email.
// ============================================================

const API_ENDPOINT = "/api/career-application";
const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB
const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const ACCEPTED_MIME_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const EMPTY_FIELDS = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  experience: "",
  linkedin: "",
  portfolio: "",
  coverMessage: "",
};

function validateResumeFile(file) {
  if (!file) return "Please attach your resume.";
  const name = file.name.toLowerCase();
  const hasValidExtension = ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext));
  const hasValidType = file.type ? ACCEPTED_MIME_TYPES.includes(file.type) : true;
  if (!hasValidExtension || !hasValidType) {
    return "Resume must be a .pdf, .doc, or .docx file.";
  }
  if (file.size > MAX_RESUME_BYTES) {
    return "Resume must be smaller than 5MB.";
  }
  return null;
}

function validateFields(fields) {
  const errors = {};
  if (!fields.fullName.trim()) errors.fullName = "Full name is required.";
  if (!fields.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!fields.phone.trim()) errors.phone = "Phone number is required.";
  if (!fields.location.trim()) errors.location = "Current location is required.";
  if (!fields.experience.trim()) errors.experience = "Years of experience is required.";
  return errors;
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function CareerApplicationForm({ job }) {
  const [fields, setFields] = useState(EMPTY_FIELDS);
  const [resumeFile, setResumeFile] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | uploading | submitting | success | error
  const fileInputRef = useRef(null);
  const formIdPrefix = useId();
  const isBusy = status === "uploading" || status === "submitting";

  const handleFieldChange = (field) => (e) => {
    setFields((prev) => ({ ...prev, [field]: e.target.value }));
    setFieldErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0] || null;
    const error = file ? validateResumeFile(file) : null;
    if (error) {
      setFieldErrors((prev) => ({ ...prev, resume: error }));
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setFieldErrors((prev) => ({ ...prev, resume: undefined }));
    setResumeFile(file);
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    setFieldErrors((prev) => ({ ...prev, resume: undefined }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBusy) return;

    // Honeypot: a real applicant never sees or fills this field (hidden via
    // CSS, not `type="hidden"`, so basic bots that only skip hidden inputs
    // still trip it). A non-empty value here means the request is spam and
    // is dropped client-side without ever calling the API.
    if (e.currentTarget.elements.company_website?.value) {
      return;
    }

    const errors = validateFields(fields);
    const resumeError = validateResumeFile(resumeFile);
    if (resumeError) errors.resume = resumeError;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("idle");
      return;
    }

    setFieldErrors({});
    setStatus("uploading");

    const formData = new FormData();
    formData.append("jobTitle", job?.title || "");
    formData.append("jobSlug", job?.slug || "");
    Object.entries(fields).forEach(([key, value]) => formData.append(key, value));
    formData.append("resume", resumeFile);

    try {
      // Brief, deliberate pause so the "Uploading resume…" status is
      // legible before the request moves into "Submitting application…" —
      // both statuses describe the same single network call below, since
      // this is a single multipart POST rather than a two-step upload.
      await new Promise((resolve) => setTimeout(resolve, 350));
      setStatus("submitting");

      const response = await fetch(API_ENDPOINT, { method: "POST", body: formData });
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

      setStatus("success");
      setFields(EMPTY_FIELDS);
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="career-application" id="career-application" aria-labelledby="career-application-heading">
      <div className="container career-application__inner">
        <div className="career-application__intro">
          <p className="career-application__eyebrow">Apply for this position</p>
          <h2 id="career-application-heading">{job?.title || "Apply for this position"}</h2>
          <p className="career-application__lede">Interested in joining Mirketa? Share your details and resume with our hiring team.</p>

          {job && (
            <dl className="career-application__meta">
              {job.location && (
                <div>
                  <dt>Location</dt>
                  <dd>{job.location}</dd>
                </div>
              )}
              {job.employmentType && (
                <div>
                  <dt>Employment Type</dt>
                  <dd>{job.employmentType}</dd>
                </div>
              )}
            </dl>
          )}

          <p className="career-application__hiring-message">A member of our hiring team reviews every application personally and will follow up if your profile matches an open opportunity.</p>
          <p className="career-application__privacy">Your information is used solely to evaluate your application and will not be shared outside Mirketa's hiring process.</p>
        </div>

        <div className="career-application__card">
          <form className="career-application-form" onSubmit={handleSubmit} noValidate>
            {/* Honeypot field — visually hidden, not display:none, so it
                remains in the accessibility/DOM tree for naive bots to fill. */}
            <div className="career-application-form__honeypot" aria-hidden="true">
              <label htmlFor={`${formIdPrefix}-company_website`}>Company Website</label>
              <input id={`${formIdPrefix}-company_website`} name="company_website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="career-application-form__row">
              <Field id={`${formIdPrefix}-fullName`} label="Full Name" required error={fieldErrors.fullName}>
                <input id={`${formIdPrefix}-fullName`} type="text" value={fields.fullName} onChange={handleFieldChange("fullName")} disabled={isBusy} aria-invalid={!!fieldErrors.fullName} aria-describedby={fieldErrors.fullName ? `${formIdPrefix}-fullName-error` : undefined} />
              </Field>
              <Field id={`${formIdPrefix}-email`} label="Email Address" required error={fieldErrors.email}>
                <input id={`${formIdPrefix}-email`} type="email" value={fields.email} onChange={handleFieldChange("email")} disabled={isBusy} aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? `${formIdPrefix}-email-error` : undefined} />
              </Field>
            </div>

            <div className="career-application-form__row">
              <Field id={`${formIdPrefix}-phone`} label="Phone Number" required error={fieldErrors.phone}>
                <input id={`${formIdPrefix}-phone`} type="tel" value={fields.phone} onChange={handleFieldChange("phone")} disabled={isBusy} aria-invalid={!!fieldErrors.phone} aria-describedby={fieldErrors.phone ? `${formIdPrefix}-phone-error` : undefined} />
              </Field>
              <Field id={`${formIdPrefix}-location`} label="Current Location" required error={fieldErrors.location}>
                <input id={`${formIdPrefix}-location`} type="text" value={fields.location} onChange={handleFieldChange("location")} disabled={isBusy} aria-invalid={!!fieldErrors.location} aria-describedby={fieldErrors.location ? `${formIdPrefix}-location-error` : undefined} />
              </Field>
            </div>

            <div className="career-application-form__row">
              <Field id={`${formIdPrefix}-experience`} label="Years of Experience" required error={fieldErrors.experience}>
                <input id={`${formIdPrefix}-experience`} type="text" placeholder="e.g. 5 years" value={fields.experience} onChange={handleFieldChange("experience")} disabled={isBusy} aria-invalid={!!fieldErrors.experience} aria-describedby={fieldErrors.experience ? `${formIdPrefix}-experience-error` : undefined} />
              </Field>
              <Field id={`${formIdPrefix}-linkedin`} label="LinkedIn Profile" error={fieldErrors.linkedin}>
                <input id={`${formIdPrefix}-linkedin`} type="url" placeholder="https://linkedin.com/in/..." value={fields.linkedin} onChange={handleFieldChange("linkedin")} disabled={isBusy} />
              </Field>
            </div>

            <Field id={`${formIdPrefix}-portfolio`} label="Portfolio / Website" error={fieldErrors.portfolio} full>
              <input id={`${formIdPrefix}-portfolio`} type="url" placeholder="https://..." value={fields.portfolio} onChange={handleFieldChange("portfolio")} disabled={isBusy} />
            </Field>

            <Field id={`${formIdPrefix}-coverMessage`} label="Cover Message" error={fieldErrors.coverMessage} full>
              <textarea id={`${formIdPrefix}-coverMessage`} rows={4} value={fields.coverMessage} onChange={handleFieldChange("coverMessage")} disabled={isBusy} />
            </Field>

            <div className="career-application-form__field career-application-form__field--full">
              <label htmlFor={`${formIdPrefix}-resume`}>
                Resume Upload <span className="career-application-form__required">*</span>
              </label>
              <input
                ref={fileInputRef}
                id={`${formIdPrefix}-resume`}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileSelect}
                disabled={isBusy}
                className="career-application-form__file-input"
                aria-invalid={!!fieldErrors.resume}
                aria-describedby={fieldErrors.resume ? `${formIdPrefix}-resume-error` : `${formIdPrefix}-resume-hint`}
              />
              <label htmlFor={`${formIdPrefix}-resume`} className="career-application-form__dropzone">
                <span aria-hidden="true">
                  <FileIcon />
                </span>
                {resumeFile ? "Change file" : "Choose resume file"}
              </label>
              {!resumeFile && (
                <p id={`${formIdPrefix}-resume-hint`} className="career-application-form__hint">
                  Accepted formats: PDF, DOC, DOCX. Maximum size 5MB.
                </p>
              )}
              {resumeFile && (
                <div className="career-application-form__file-selected">
                  <span aria-hidden="true">
                    <FileIcon />
                  </span>
                  <span className="career-application-form__file-name">Selected file: {resumeFile.name}</span>
                  <button type="button" onClick={handleRemoveFile} disabled={isBusy} aria-label="Remove selected resume file">
                    <CloseIcon />
                  </button>
                </div>
              )}
              {fieldErrors.resume && (
                <p id={`${formIdPrefix}-resume-error`} className="career-application-form__error">
                  {fieldErrors.resume}
                </p>
              )}
            </div>

            <button type="submit" className="career-application-form__submit" disabled={isBusy}>
              {status === "uploading" && "Uploading resume…"}
              {status === "submitting" && "Submitting application…"}
              {(status === "idle" || status === "success" || status === "error") && "Submit Application"}
            </button>

            <div className="career-application-form__status" role="status" aria-live="polite">
              {status === "success" && <p className="career-application-form__status--success">Your application has been submitted successfully. Our hiring team will review your application and get back to you if your profile matches the opportunity.</p>}
              {status === "error" && <p className="career-application-form__status--error">Something went wrong while submitting your application. Please try again.</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, required, error, full, children }) {
  return (
    <div className={`career-application-form__field ${full ? "career-application-form__field--full" : ""}`.trim()}>
      <label htmlFor={id}>
        {label} {required && <span className="career-application-form__required">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="career-application-form__error">
          {error}
        </p>
      )}
    </div>
  );
}
