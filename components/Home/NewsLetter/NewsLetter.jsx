'use client';

import { useState } from 'react';
import styles from './NewsLetter.module.css';

export default function NewsLetter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // include "company" honeypot value (empty for humans)
        body: JSON.stringify({ email, company: '' }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || 'Subscription failed.');
      console.log('Submitting', email);

      setStatus('success');
      setMessage(data?.message || (data?.already ? 'You’re already subscribed.' : 'Check your inbox to confirm.'));
      setEmail('');

    } catch (err) {
        console.error('Subscription error:', err);

      setStatus('error');
      setMessage(err.message || 'Something went wrong.');
    }
  }

  return (
    <div id="newsletter" className={styles.section}>
      <h2 className={`${styles.subTitle} alfarn`}>
        WANT TO BE THE FIRST TO KNOW ABOUT UPCOMING COURSES AND DISCOUNTS?    <br /> <br />  SIGN UP FOR OUR NEWSLETTER!
      </h2>

      <form className={styles.form} onSubmit={onSubmit}>
        {/* Honeypot field: hidden from users, visible to bots */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          style={{ position: 'absolute', left: '-9999px' }}
          aria-hidden="true"
          onChange={() => {}}
          value=""
          readOnly
        />

        <input
          type="email"
          placeholder="Email"
          className={styles.email_input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={status === 'loading'}
          className={`background_color_light_green font_color_white call_to_action_button ${styles.submit_button}`}
        >
          {status === 'loading' ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
        </button>
      </form>

      {message && (
        <p className={status === 'success' ? styles.success : styles.error} role="status">
          {message}
        </p>
      )}
    </div>
  );
}
