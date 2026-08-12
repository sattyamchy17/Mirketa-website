import { useEffect, useRef } from "react";
import "./ContactForm.css";

// ============================================================
// SALESFORCE WEB-TO-LEAD CONFIGURATION
// Field names, hidden values, org ID, reCAPTCHA site key, and the
// retURL redirect below are exactly as provided and must not change
// — Salesforce's Web-to-Lead endpoint requires these exact values
// to route submissions into the correct org and lead fields.
// ============================================================
const SALESFORCE_ACTION = "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00Dd0000000hivg";
const ORG_ID = "00Dd0000000hivg";
const RET_URL = "https://mirketa.com/thank-you/";

// The production site key is registered in Google's reCAPTCHA admin
// console with mirketa.us/mirketa.com as allowed domains, and is tied
// to the secret key Salesforce validates against under the
// "Mirketa_Latest_reCAPTCHA" keyname below — it must stay exactly as
// provided for real submissions to work. localhost isn't (and can't
// be, without changing that production key's domain allowlist) on
// that list, so rendering it during local development throws
// reCAPTCHA's "domain not in the list of supported domains" error.
// Rather than touch the production key, local dev renders Google's
// own publicly documented "always passes" v2 test key instead —
// https://developers.google.com/recaptcha/docs/faq — so the widget
// just renders cleanly while testing locally. Submissions made
// against the test key won't validate through Salesforce (there's no
// way around that without registering localhost on the real key), but
// no real lead is ever submitted from a dev machine anyway.
const RECAPTCHA_SITE_KEY_PROD = "6LepUL0mAAAAADb01WwX9NRdsVjg8VDkgYa0PT8j";
const RECAPTCHA_SITE_KEY_TEST = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
const RECAPTCHA_SITE_KEY = import.meta.env.DEV ? RECAPTCHA_SITE_KEY_TEST : RECAPTCHA_SITE_KEY_PROD;
const RECAPTCHA_KEYNAME = "Mirketa_Latest_reCAPTCHA";
const RECAPTCHA_SCRIPT_SRC = "https://www.google.com/recaptcha/api.js?render=explicit";
const URL_TRACKING_FIELD_ID = "00N0W000008z5D6";

// This site is a single-page app: `DOMContentLoaded` and Google's
// automatic ".g-recaptcha" page-scan (the mechanisms the original
// static snippet relies on) both fire only once, on the very first
// page ever loaded — not on every client-side route change. Every
// value below (URL tracking field, the captcha timestamp refresh,
// and the reCAPTCHA widget itself) is instead re-applied on every
// mount of this component via useEffect, so the form works
// identically no matter which page it's rendered on or how many
// client-side navigations happened before it. The Salesforce
// endpoint, field names, hidden values, org ID, and reCAPTCHA site
// key are unchanged from the original implementation.

let recaptchaScriptPromise = null;
function loadRecaptchaScript() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.grecaptcha && window.grecaptcha.render) return Promise.resolve();
  if (recaptchaScriptPromise) return recaptchaScriptPromise;

  recaptchaScriptPromise = new Promise((resolve) => {
    const existing = document.querySelector(`script[src="${RECAPTCHA_SCRIPT_SRC}"]`);
    if (existing) {
      if (window.grecaptcha) {
        resolve();
      } else {
        existing.addEventListener("load", resolve, { once: true });
      }
      return;
    }
    const script = document.createElement("script");
    script.src = RECAPTCHA_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    document.head.appendChild(script);
  });

  return recaptchaScriptPromise;
}

export default function ContactForm({ title }) {
  const captchaSettingsRef = useRef(null);
  const urlFieldRef = useRef(null);
  const recaptchaContainerRef = useRef(null);

  // Stamp the hidden URL-tracking field with the current page URL.
  useEffect(() => {
    if (urlFieldRef.current) {
      urlFieldRef.current.value = window.location.href;
    }
  }, []);

  // Keep captcha_settings.ts fresh every 500ms while this form is
  // mounted (same behavior as the original setInterval), cleaned up
  // on unmount so it never leaks across page navigations.
  useEffect(() => {
    const timer = setInterval(() => {
      const input = captchaSettingsRef.current;
      if (!input) return;
      const response = document.getElementById("g-recaptcha-response");
      if (!response || response.value.trim() === "") {
        const settings = JSON.parse(input.value);
        settings.ts = JSON.stringify(new Date().getTime());
        input.value = JSON.stringify(settings);
      }
    }, 500);
    return () => clearInterval(timer);
  }, []);

  // Explicitly render the reCAPTCHA widget into this instance's
  // container every time the component mounts. The script's `onload`
  // firing does not guarantee `grecaptcha.render` is callable yet —
  // Google's documented fix is to wait on `grecaptcha.ready()`.
  useEffect(() => {
    let cancelled = false;
    loadRecaptchaScript().then(() => {
      if (cancelled || !window.grecaptcha) return;
      window.grecaptcha.ready(() => {
        if (!cancelled && recaptchaContainerRef.current && !recaptchaContainerRef.current.hasChildNodes()) {
          window.grecaptcha.render(recaptchaContainerRef.current, { sitekey: RECAPTCHA_SITE_KEY });
        }
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const captchaSettingsDefault = JSON.stringify({ keyname: RECAPTCHA_KEYNAME, fallback: "true", orgId: ORG_ID, ts: "" });

  return (
    <div className="contact-form-card">
      {title && <h3 className="contact-form-card__title">{title}</h3>}
      <form className="contact-form" action={SALESFORCE_ACTION} method="POST">
        <input type="hidden" name="captcha_settings" ref={captchaSettingsRef} defaultValue={captchaSettingsDefault} />
        <input type="hidden" name="oid" value={ORG_ID} />
        <input type="hidden" name="retURL" value={RET_URL} />
        <input type="hidden" id={URL_TRACKING_FIELD_ID} name={URL_TRACKING_FIELD_ID} ref={urlFieldRef} />

        <div className="contact-form__row">
          <div className="contact-form__field">
            <label htmlFor="first_name">First Name *</label>
            <input id="first_name" maxLength={40} name="first_name" type="text" required />
          </div>
          <div className="contact-form__field">
            <label htmlFor="last_name">Last Name</label>
            <input id="last_name" maxLength={80} name="last_name" type="text" />
          </div>
        </div>

        <div className="contact-form__row">
          <div className="contact-form__field">
            <label htmlFor="mobile">Mobile *</label>
            <input id="mobile" maxLength={40} name="mobile" type="text" required />
          </div>
          <div className="contact-form__field">
            <label htmlFor="company">Company *</label>
            <input id="company" maxLength={40} name="company" type="text" required />
          </div>
        </div>

        <div className="contact-form__field contact-form__field--full">
          <label htmlFor="email">Email *</label>
          <input id="email" maxLength={80} name="email" type="email" required />
        </div>

        <div className="contact-form__field contact-form__field--full">
          <label htmlFor="description">Description *</label>
          <textarea id="description" name="description" rows={4} required />
        </div>

        <div className="contact-form__recaptcha" ref={recaptchaContainerRef} />

        <button type="submit" className="contact-form__submit">
          Submit
        </button>
      </form>
    </div>
  );
}
