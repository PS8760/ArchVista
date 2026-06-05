import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  projectType?: unknown;
  timeline?: unknown;
  message?: unknown;
  company?: unknown;
};

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const rateLimits = new Map<string, RateLimitBucket>();
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function sanitize(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim();
  return ip || request.headers.get("x-real-ip") || "local";
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const bucket = rateLimits.get(key);

  if (!bucket || bucket.resetAt < now) {
    rateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (bucket.count >= RATE_LIMIT_MAX) return false;

  bucket.count += 1;
  return true;
}

function buildInquiryId() {
  return `AV-${crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { ok: false, message: "Please send a valid contact request." },
      { status: 400 }
    );
  }

  const name = sanitize(payload.name, 80);
  const email = sanitize(payload.email, 120).toLowerCase();
  const phone = sanitize(payload.phone, 40);
  const projectType = sanitize(payload.projectType, 60) || "Private Villa";
  const timeline = sanitize(payload.timeline, 60) || "Discovery";
  const message = sanitize(payload.message, 1200);
  const company = sanitize(payload.company, 120);

  if (company) {
    return Response.json(
      { ok: true, inquiryId: buildInquiryId(), message: "Inquiry received." },
      { status: 202 }
    );
  }

  const clientKey = getClientKey(request);
  if (!checkRateLimit(clientKey)) {
    return Response.json(
      {
        ok: false,
        message:
          "Too many inquiries were sent from this connection. Please try again in a few minutes.",
      },
      { status: 429 }
    );
  }

  if (name.length < 2) {
    return Response.json(
      { ok: false, message: "Please enter your name." },
      { status: 400 }
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return Response.json(
      { ok: false, message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (message.length < 12) {
    return Response.json(
      {
        ok: false,
        message: "Please add a short project note so the studio can respond well.",
      },
      { status: 400 }
    );
  }

  const inquiry = {
    inquiryId: buildInquiryId(),
    submittedAt: new Date().toISOString(),
    name,
    email,
    phone,
    projectType,
    timeline,
    message,
    source: "archvista-landing-page",
  };

  const SMTP_HOST = process.env.SMTP_HOST;
  const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;
  const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;
  const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "no-reply@archvista.com";

  const isSmtpConfigured = !!(SMTP_HOST && SMTP_USER && SMTP_PASS && CONTACT_TO_EMAIL);

  if (isSmtpConfigured) {
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      const htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px; background-color: #fafafa;">
          <h2 style="color: #d7c29a; border-bottom: 2px solid #eaeaea; padding-bottom: 10px; font-weight: 300;">New Architectural Inquiry</h2>
          <p style="font-size: 14px; color: #555;">You have received a new inquiry from the ArchVista contact form.</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eaeaea; width: 30%;">Reference:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea;">${inquiry.inquiryId}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eaeaea;">Name:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea;">${inquiry.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eaeaea;">Email:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea;"><a href="mailto:${inquiry.email}">${inquiry.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eaeaea;">Phone:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea;">${inquiry.phone || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eaeaea;">Project Type:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea;">${inquiry.projectType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eaeaea;">Timeline:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea;">${inquiry.timeline}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; border-left: 3px solid #d7c29a; background-color: #fff; font-style: italic;">
            <strong>Vision / Message:</strong><br />
            ${inquiry.message.replace(/\n/g, "<br />")}
          </div>
          <p style="margin-top: 30px; font-size: 11px; color: #999; text-align: center; border-top: 1px solid #eaeaea; padding-top: 10px;">
            Submitted from ArchVista Landing Page at ${new Date(inquiry.submittedAt).toLocaleString()}
          </p>
        </div>
      `;

      const textContent = `
New Architectural Inquiry

Reference: ${inquiry.inquiryId}
Name: ${inquiry.name}
Email: ${inquiry.email}
Phone: ${inquiry.phone || "N/A"}
Project Type: ${inquiry.projectType}
Timeline: ${inquiry.timeline}

Vision / Message:
${inquiry.message}

Submitted from ArchVista Landing Page at ${new Date(inquiry.submittedAt).toLocaleString()}
      `;

      await transporter.sendMail({
        from: `"${inquiry.name} via ArchVista" <${CONTACT_FROM_EMAIL}>`,
        to: CONTACT_TO_EMAIL,
        cc: inquiry.email,
        replyTo: inquiry.email,
        subject: `[Inquiry ${inquiry.inquiryId}] ${inquiry.projectType} - ${inquiry.name}`,
        text: textContent,
        html: htmlContent,
      });

    } catch (err) {
      console.error("Nodemailer send failed:", err);
      return Response.json(
        {
          ok: false,
          message:
            "The mail desk is temporarily unavailable. Please try again shortly or email hello@archvista.com directly.",
        },
        { status: 502 }
      );
    }
  } else {
    // Graceful development fallback
    console.info("[ArchVista contact inquiry - SMTP NOT CONFIGURED]", inquiry);
  }

  return Response.json(
    {
      ok: true,
      inquiryId: inquiry.inquiryId,
      message: "Inquiry received.",
    },
    { status: 201 }
  );
}
