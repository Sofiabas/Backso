import { createTransport } from "nodemailer";

const ADMIN_MAIL = process.env.adminMail;

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: ADMIN_MAIL,
    pass: "GZARu8P5efSUMJe8az",
  },
});

const mailOptions = {
  from: "boring-shop",
  to: ADMIN_MAIL,
};

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

export { transporter, mailOptions };
