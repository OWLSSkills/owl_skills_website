"use client";
import { useState } from "react";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [error, setError]   = useState("");

  async function handle_emailing_jessie(e) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;                 // << capture it now
    const fd = new FormData(form);
    const name    = (fd.get("name")    || "").toString().trim();
    const email   = (fd.get("email")   || "").toString().trim();
    const message = (fd.get("message") || "").toString().trim();
    const honey   = (fd.get("honey")   || "").toString().trim();

    if (!name || !email || !message) {
      setStatus("error");
      setError("Please fill out all fields.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, honey }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) throw new Error(data?.error || "Send failed");

      setStatus("success");
      form.reset();                               // << safe now
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong.");
    }
  }

  return (
    <div className={styles.mt5}>
      <h2 className={`${styles.title} alfarn`}>Contact Jessie!</h2>
      <form className={styles.form} onSubmit={handle_emailing_jessie}>
        {/* honeypot for bots */}
        <div className={styles.srOnly} aria-hidden="true">
          <label htmlFor="honey">Leave this empty</label>
          <input id="honey" name="honey" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className={`${styles.formRow} intervariable`}>
          <label className={styles.srOnly} htmlFor="name">Name</label>
          <input id="name" name="name" type="text" placeholder="Name" className={styles.input} required />

          <label className={`${styles.srOnly} intervariable`} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Email" className={styles.input} required />
        </div>

        <label className={`${styles.srOnly} intervariable`} htmlFor="message">Message</label>
        <textarea id="message" name="message" placeholder="Message" className={`${styles.textarea} intervariable`} rows={6} required />

        <button
          type="submit"
          disabled={status === "sending"}
          className="background_color_light_green font_color_white call_to_action_button"
        >
          {status === "sending" ? "SENDING…" : "CONTACT JESSIE"}
        </button>

        <div role="status" aria-live="polite" className={styles.mt5}>
          {status === "success" && <span>Thanks! Your message has been sent.</span>}
          {status === "error" && !!error && <span>{error}</span>}
        </div>
      </form>
    </div>
  );
}
