import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

interface SendEmailArgs {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: SendEmailArgs) {
  return resend.emails.send({
    from: from ?? "website@ashique.digital",
    to,
    subject,
    html,
  });
}
