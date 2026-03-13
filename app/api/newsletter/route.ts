import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/resend";
import { getPostHogClient } from "@/lib/posthog-server";

const schema = z.object({
  email: z.string().email().max(254),
  name: z.string().max(100).optional(),
  website: z.string().optional(), // honeypot
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.website) {
      return NextResponse.json({ success: true }); // silent honeypot reject
    }

    const result = schema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    const { email, name } = result.data;
    const firstName = name?.split(" ")[0] ?? "there";

    // Welcome email to subscriber
    await sendEmail({
      to: email,
      from: "Weekly Growth Insights <notifications@ashique.digital>",
      subject: "You're on the list — weekly growth insights incoming 🚀",
      html: `
        <div style="font-family: sans-serif; color: #0D1B2A; max-width: 600px;">
          <h2 style="color: #00C2CB;">Hey ${firstName},</h2>
          <p style="font-size: 16px; line-height: 1.7;">
            Welcome to the growth list. I'm glad to have you here.
          </p>
          <p style="font-size: 16px; line-height: 1.7;">
            Every Monday, I'll send you a short, strategic breakdown of what's working right now in lead generation and customer acquisition — pulled directly from my work with SMEs and high-growth startups.
          </p>
          <p style="font-size: 16px; line-height: 1.7;">
            In the meantime, feel free to check out my latest growth insights on the site.
          </p>
          <div style="margin-top: 32px; padding: 24px; background: #f8f9fa; border-radius: 12px; border-left: 4px solid #00C2CB;">
             <p style="margin: 0; font-weight: 600;">Want a faster start?</p>
             <p style="margin: 8px 0 0; color: #64748b; font-size: 14px;">If you're ready to scale your specific business now, you can sempre <a href="https://ashique.digital/contact" style="color: #00C2CB; font-weight: 600;">book a free 30-minute strategy call here.</a></p>
          </div>
          <p style="margin-top: 32px; font-size: 16px; line-height: 1.7;">
            Talk soon,<br>
            <strong>Ashique</strong><br>
            <span style="color: #64748b; font-size: 14px;">Brand Strategist & Lead Gen Consultant</span>
          </p>
        </div>
      `,
    });

    // Internal notification to Ashique
    await sendEmail({
      to: process.env.CONTACT_EMAIL ?? "ashique@ashique.digital",
      subject: `New Newsletter Lead: ${email}`,
      html: `
        <div style="font-family: sans-serif; color: #0D1B2A;">
          <p>You have a new subscriber!</p>
          <p><strong>Name:</strong> ${name ?? "Not provided"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #64748b;">Ashique-Digital Marketing Engine</p>
        </div>
      `,
    });
    console.log("Newsletter subscription (Email disabled):", { email, name });

    const posthog = getPostHogClient();
    posthog.identify({ distinctId: email, properties: { email, name: name ?? undefined } });
    posthog.capture({
      distinctId: email,
      event: "newsletter_signup_received",
      properties: { source: "api" },
    });
    await posthog.shutdown();

    return NextResponse.json({ success: true, message: "You're on the list!" });
  } catch (error) {
    console.error("[/api/newsletter]", error);
    return NextResponse.json({ success: false, error: "Something went wrong." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
