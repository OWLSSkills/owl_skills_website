// app/api/contact/route.js
import { NextResponse } from "next/server";
export const runtime = "nodejs";

function sanitize(s){ return String(s || "").trim().slice(0, 5000); }
function isEmail(s){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || "").trim()); }

export async function GET() {
  // quick ping to confirm the route is reachable
  return NextResponse.json({ ok: true });
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const name    = sanitize(body.name);
    const email   = sanitize(body.email);
    const message = sanitize(body.message);
    const honey   = sanitize(body.honey);

    if (honey) return NextResponse.json({ success: true }); // silently OK for bots
    if (!name || !email || !message || !isEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide name, a valid email, and a message." },
        { status: 400 },
      );
    }

    const provider = (process.env.MAIL_PROVIDER || "gmail").toLowerCase();
    const sent = provider === "resend"
      ? await sendWithResend({ name, email, message })
      : await sendWithGmail({ name, email, message });

    if (!sent.ok) {
      console.error("Email send failed:", sent.error);
      return NextResponse.json({ success: false, error: sent.error || "Send failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("contact api error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

/* ---- Gmail (Nodemailer) ---- */
async function sendWithGmail({ name, email, message }) {
  try {
    const mod = await import("nodemailer");
    const nodemailer = mod.default ?? mod;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
      },
    });

    // verify connection (great for diagnosing bad creds/firewalls)
    await transporter.verify();

    const to = process.env.MAIL_TO || process.env.GMAIL_USER;
    const subject = `New website inquiry from ${name}`;
    const html = renderHtml({ name, email, message });

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
      replyTo: email,
    });

    return { ok: true };
  } catch (e) {
    return { ok: false, error: e?.message || String(e) };
  }
}



function renderHtml({ name, email, message }) {
  // Brand palette
  const GREEN   = "#276C4C";
  const LIGHT   = "#D2DE9C";
  const PURPLE  = "#7A5EA4";
  const LTPURP  = "#D1C2DA";
  const INK     = "#122932";
  const PAGE_BG = "#F5F9F6"; // your --green-50

  return `
  <!-- Outer page background -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
         style="background:${PAGE_BG}; padding:24px 12px; font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <tr>
      <td align="center">
        <!-- Card -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0"
               style="width:100%; max-width:600px; background:#ffffff; border:1px solid ${LTPURP};
                      border-radius:12px; overflow:hidden; color:${INK}">
          <!-- Header band -->
          <tr>
            <td style="background:${GREEN}; color:${LIGHT}; padding:16px 20px; font-weight:800; font-size:20px; letter-spacing:.2px;">
              New website inquiry
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:18px 20px;">
              <!-- two-column label/value table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                     style="border-collapse:separate; border-spacing:0 10px; font-size:15px; line-height:1.5;">
                <tr>
                  <td style="width:120px; vertical-align:top; font-weight:700; color:${GREEN};">Name</td>
                  <td style="vertical-align:top;">${escapeHtml(name)}</td>
                </tr>
                <tr>
                  <td style="width:120px; vertical-align:top; font-weight:700; color:${GREEN};">Email</td>
                  <td style="vertical-align:top;">
                    <a href="mailto:${encodeURIComponent(email)}"
                       style="color:${GREEN}; text-decoration:none;">${escapeHtml(email)}</a>
                  </td>
                </tr>
              </table>

              <div style="margin-top:14px; font-weight:700; color:${GREEN};">Message</div>
              <div style="
                margin-top:6px; white-space:pre-wrap;
                background:${LIGHT}; color:${INK};
                border:1px solid ${LTPURP}; padding:12px 14px; border-radius:10px;">
                ${escapeHtml(message)}
              </div>

              <div style="margin-top:16px; font-size:12px; color:#6b7280;">
                Sent from the OWLS Skills website
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;
}


function escapeHtml(s){
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;")
    .replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");
}
