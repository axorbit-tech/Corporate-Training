import nodemailer from "nodemailer";

interface EmailOptions {
  from: any;
  replyTo?: string;
  to: string | undefined;
  subject: string;
  text: string;
  html?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  console.log("after sendmail");

  // Mail options
  const mailOptions = {
    from: options.from,
    replyTo: options.replyTo,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  // Send email
  await transporter.sendMail(mailOptions);
};