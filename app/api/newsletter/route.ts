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

    // Temporarily disabled while Resend domain verification is pending
    /*
    await sendEmail({
      to: email,
      from: "ashique@ashique.digital",
      subject: "You're on the list — weekly growth insights incoming 🚀",
      html: `
        <h2 style="font-family:sans-serif;color:#0D1B2A">Hey ${firstName},</h2>
        <p style="font-family:sans-serif;color:#1A1A2E;line-height:1.7">Thanks for subscribing to Ashique's growth newsletter.</p>
        <p style="font-family:sans-serif;color:#1A1A2E;line-height:1.7">Every week, I share practical lead generation and brand strategy insights for SME owners and startup founders — straight from real client work, no fluff.</p>
        <p style="font-family:sans-serif;color:#1A1A2E;line-height:1.7">Talk soon,<br><strong>Ashique</strong><br><a href="https://ashique.digital" style="color:#00C2CB">ashique.digital</a></p>
      `,
    });
    */

    // Notify Ashique (Disabled)
    /*
    await sendEmail({
      to: process.env.CONTACT_EMAIL ?? "ashique@ashique.digital",
      subject: `New newsletter subscriber: ${email}`,
      html: `<p style="font-family:sans-serif">New subscriber: <strong>${name ?? "N/A"}</strong> — ${email}</p>`,
    });
    */
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
