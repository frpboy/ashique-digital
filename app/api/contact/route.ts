import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/resend";

const schema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(254),
  businessType: z.string().min(2).max(100).trim(),
  message: z.string().min(10).max(2000).trim(),
  website: z.string().optional(), // honeypot
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot check
    if (body.website) {
      return NextResponse.json({ success: true }); // silent reject
    }

    const result = schema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, businessType, message } = result.data;

    // Temporarily disabled while Resend domain verification is pending
    /*
    await sendEmail({
      to: process.env.CONTACT_EMAIL ?? "ashique@ashique.digital",
      subject: `New Contact: ${name} — ${businessType}`,
      html: `
        <h2 style="font-family:sans-serif;color:#0D1B2A">New contact from ashique.digital</h2>
        <table style="font-family:sans-serif;border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600">Name</td><td style="padding:8px;border-bottom:1px solid #eee">${name}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600">Email</td><td style="padding:8px;border-bottom:1px solid #eee">${email}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600">Business Type</td><td style="padding:8px;border-bottom:1px solid #eee">${businessType}</td></tr>
          <tr><td style="padding:8px;font-weight:600;vertical-align:top">Message</td><td style="padding:8px">${message.replace(/\n/g, "<br>")}</td></tr>
        </table>
        <p style="font-family:sans-serif;color:#64748b;font-size:13px;margin-top:16px">Reply directly to this email to respond to ${name}.</p>
      `,
    });
    */
    console.log("Contact form submission (Email disabled):", { name, email, businessType, message });

    return NextResponse.json({ success: true, message: "Your message has been sent. Ashique will get back to you within 24 hours." });
  } catch (error) {
    console.error("[/api/contact]", error);
    return NextResponse.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
