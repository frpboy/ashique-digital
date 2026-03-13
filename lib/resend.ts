import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

interface SendEmailArgs {
  to: string;
  subject: string;
  html?: string;
  react?: React.ReactElement;
  from?: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, react, from, replyTo }: SendEmailArgs) {
  return resend.emails.send({
    from: from ?? process.env.RESEND_FROM ?? "Ashique Digital <notifications@ashique.digital>",
    to,
    subject,
    html,
    react,
    replyTo: replyTo ?? process.env.RESEND_REPLY_TO,
  });
}
