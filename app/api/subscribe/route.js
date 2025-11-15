export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req) {
  try {
    const { email, company } = await req.json();

    // Honeypot
    if (company) return NextResponse.json({ ok: true, message: 'Thanks!' }, { status: 200 });

    if (
      !email ||
      typeof email !== 'string' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 });
    }

    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const DC = process.env.MAILCHIMP_SERVER_PREFIX; // e.g. us6
    if (!API_KEY || !AUDIENCE_ID || !DC) {
      return NextResponse.json({ error: 'Server not configured.' }, { status: 500 });
    }

    const base = `https://${DC}.api.mailchimp.com/3.0`;
    const auth = 'Basic ' + Buffer.from(`anystring:${API_KEY}`).toString('base64');

    async function mc(path, init = {}) {
      const res = await fetch(`${base}${path}`, {
        headers: { 'Content-Type': 'application/json', Authorization: auth },
        ...init,
      });
      const data = await res.json().catch(() => ({}));
      return { res, data };
    }

    // Mailchimp requires an MD5 hash of the lowercase email for member endpoints
    const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');

    // Upsert member to 'pending' (double opt-in); this triggers confirmation when allowed.
    const upsertBody = {
      email_address: email,
      status_if_new: 'pending',
      status: 'pending', // for existing records, request pending (re)confirmation
      // merge_fields: { FNAME: '', LNAME: '' },
      // tags: ['Website-Signup'],
    };

    const { res: putRes, data: putData } = await mc(
      `/lists/${AUDIENCE_ID}/members/${hash}`,
      { method: 'PUT', body: JSON.stringify(upsertBody) }
    );

    if (putRes.ok) {
      // Mailchimp accepted the upsert; if already subscribed, it will keep them subscribed.
      // If pending/unsubscribed, this should (re)send the DOI email when allowed.
      const status = putData?.status;
      if (status === 'subscribed') {
        return NextResponse.json(
          { ok: true, already: true, message: 'You’re already subscribed.' },
          { status: 200 }
        );
      }
      if (status === 'pending') {
        return NextResponse.json(
          { ok: true, message: 'Check your inbox to confirm. If you don’t see an email, check spam/promotions.' },
          { status: 200 }
        );
      }
      // Other statuses: informative fallback
      return NextResponse.json(
        { ok: true, message: `Contact is ${status}. If you don’t see an email, check spam/promotions.` },
        { status: 200 }
      );
    }

    // Helpful error messages for common states
    const detail = putData?.detail || 'Subscription failed.';
    if (putRes.status === 400 && typeof detail === 'string') {
      // Cleaned/blocked states often return 400 with a readable detail
      return NextResponse.json({ error: detail }, { status: 400 });
    }

    return NextResponse.json({ error: detail }, { status: putRes.status || 500 });
  } catch (err) {
    return NextResponse.json({ error: 'Unexpected error. Please try again.' }, { status: 500 });
  }
}
