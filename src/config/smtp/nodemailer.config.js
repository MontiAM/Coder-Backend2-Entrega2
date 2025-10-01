import { createTransport } from "nodemailer";
import { templateHtmlResetPassword } from "../../utils/resetPassword-template.js";

export const transporter = createTransport({
    // host: process.env.SMTP_HOST,
    service: "gmail",
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const emailResetPassword = (email, resetUrl) => {
    return {
        from: process.env.SMTP_USER,
        to: email,
        subject: "Reset password",
        html: templateHtmlResetPassword(resetUrl),
    };
};
