import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/resend";
import { getPostHogClient } from "@/lib/posthog-server";
import { writeClient } from "@/lib/sanity-server";
import { ratelimit } from "@/lib/ratelimit";
import { LeadNotification } from "@/emails/LeadNotification";

const schema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(254),
  businessType: z.string().min(2).max(100).trim(),
  message: z.string().min(10).max(2000).trim(),
  fax_number: z.string().optional(), // honeypot
});

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const { success: limitSuccess } = await ratelimit.limit(ip);
    
    if (!limitSuccess) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again in 10 minutes." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 2. Honeypot check
    if (body.fax_number) {
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

    // 3. Log to Sanity
    try {
      await writeClient.create({
        _type: "leadLog",
        name,
        email,
        businessType,
        message,
        source: "Contact Form",
        submittedAt: new Date().toISOString(),
      });
    } catch (sanityError) {
      console.error("Sanity Mutation Error:", sanityError);
    }

    // 4. Send Email Notification to Ashique
    await sendEmail({
      to: process.env.CONTACT_EMAIL ?? "ashique@ashique.digital",
      subject: `New Inquiry: ${name} — ${businessType}`,
      replyTo: email,
      react: LeadNotification({ name, email, businessType, message }),
    });

    const posthog = getPostHogClient();
    posthog.identify({ distinctId: email, properties: { email, name, business_type: businessType } });
    posthog.capture({
      distinctId: email,
      event: "contact_form_received",
      properties: { name, business_type: businessType, source: "api" },
    });
    await posthog.shutdown();

    return NextResponse.json({ 
      success: true, 
      message: "Your inquiry has been received. I'll get back to you personally within 24 hours." 
    });
  } catch (error) {
    console.error("[/api/contact]", error);
    return NextResponse.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
