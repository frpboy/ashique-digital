import { Resend } from "resend";

// Temporarily disabled while domain verification is pending
// const resend = new Resend(process.env.RESEND_API_KEY!);

interface SendEmailArgs {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: SendEmailArgs) {
  console.log("Email sending is currently disabled (Domain verification in progress).");
  return { id: "disabled" };
  /*
  return resend.emails.send({
    from: from ?? "website@ashique.digital",
    to,
    subject,
    html,
  });
  */
}
