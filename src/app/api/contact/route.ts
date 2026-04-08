import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL ?? "hey@mangeshux.in";

    if (!apiKey || apiKey === "re_your_api_key_here") {
      // Dev mode — log and return success without sending
      console.log("📩 [DEV] Contact form submission:", { name, email, subject, message });
      return NextResponse.json({ success: true, dev: true });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <contact@mangeshux.in>",
        to: [toEmail],
        reply_to: email,
        subject: `[Portfolio] ${subject || "New message"} — from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 560px; color: #111;">
            <h2 style="margin-bottom: 4px;">New message from your portfolio</h2>
            <hr style="border:none; border-top:1px solid #eee; margin:16px 0;" />
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject || "—"}</p>
            <hr style="border:none; border-top:1px solid #eee; margin:16px 0;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; color: #444;">${message}</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
