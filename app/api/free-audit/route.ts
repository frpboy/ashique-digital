import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/resend";
import { writeClient } from "@/lib/sanity-server";
import { ratelimit } from "@/lib/ratelimit";
import { AuditAutoResponder } from "@/emails/AuditAutoResponder";
import { LeadNotification } from "@/emails/LeadNotification";
import { getPostHogClient } from "@/lib/posthog-server";

const schema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(254),
  businessName: z.string().min(2).max(100).trim(),
  budget: z.string().min(1),
  challenge: z.string().min(1),
  fax_number: z.string().optional(), // Honeypot
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
      return NextResponse.json({ success: true }); // Silent reject
    }

    // 3. Validation
    const result = schema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, businessName, budget, challenge } = result.data;

    // 4. Get Dynamic PDF from Sanity
    let auditUrl = "https://ashique.digital/lead-gen-audit.pdf";
    try {
      const { getSiteSettings } = await import("@/lib/settings");
      const settings = await getSiteSettings();
      if (settings?.auditPdfUrl) {
        auditUrl = settings.auditPdfUrl;
      }
    } catch (err) {
      console.error("Sanity Settings Fetch Error:", err);
    }

    // 5. Log lead to Sanity
    try {
      await writeClient.create({
        _type: "lead",
        name,
        email,
        businessType: businessName,
        message: `Budget: ${budget}\nMain Challenge: ${challenge}`,
        source: "Free Audit Page",
        submittedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Sanity Lead Logging Error:", err);
    }

    // 6. Send Auto-Responder to Client
    await sendEmail({
      to: email,
      from: "Ashique <notifications@ashique.digital>",
      subject: "Your 15-Point Lead Generation Audit (Download Inside)",
      react: AuditAutoResponder({ name, downloadUrl: auditUrl }),
    });

    // 6. Send Notification to Ashique
    await sendEmail({
      to: process.env.CONTACT_EMAIL ?? "frpboy12@gmail.com",
      subject: `🔥 New Audit Request: ${name}`,
      react: LeadNotification({ 
        name, 
        email, 
        businessType: businessName, 
        message: `Requested Free Audit\nBudget: ${budget}\nChallenge: ${challenge}` 
      }),
    });

    const posthog = getPostHogClient();
    posthog.identify({ distinctId: email, properties: { email, name, business_name: businessName } });
    posthog.capture({
      distinctId: email,
      event: "lead_captured",
      properties: { name, business_name: businessName, source: "free_audit" },
    });
    await posthog.shutdown();

    return NextResponse.json({ 
      success: true, 
      message: "Success! Your audit is on its way to your inbox." 
    });

  } catch (error) {
    console.error("[/api/free-audit] Server Error:", error);
    return NextResponse.json(
      { success: false, error: "Critical failure. Please contact ashique@ashique.digital" },
      { status: 500 }
    );
  }
}
