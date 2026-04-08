import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, project, consent } = await req.json();

    if (!name || !email || !project || !consent) {
      return NextResponse.json(
        { error: "All fields including NDA consent are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL ?? "hey@mangeshux.in";

    if (!apiKey || apiKey === "re_your_api_key_here") {
      console.log("🔐 [DEV] Access request:", { name, email, project, consent });
      return NextResponse.json({ success: true, dev: true });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Access <contact@mangeshux.in>",
        to: [toEmail],
        reply_to: email,
        subject: `[Access Request] ${project} — ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 560px; color: #111;">
            <h2 style="margin-bottom: 4px;">🔐 Case Study Access Request</h2>
            <hr style="border:none; border-top:1px solid #eee; margin:16px 0;" />
            <p><strong>Project:</strong> ${project}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>NDA Consent:</strong> ✅ Agreed — they will not disclose any confidential information</p>
            <hr style="border:none; border-top:1px solid #eee; margin:16px 0;" />
            <p style="color: #666; font-size: 13px;">Reply to this email to share the case study password if approved.</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return NextResponse.json({ error: "Failed to send request." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Request access error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
