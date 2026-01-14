// sendMail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendMailsmtp = async ({ to, subject, html }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            tls: { rejectUnauthorized: false },
        });

        await transporter.verify();
        const info = await transporter.sendMail({
            from: `"PropertyX Booking Mail" <${process.env.MAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log("Email sent:", info.messageId);
        return { success: true, info };
    } catch (error) {
        console.error("sendMail error:", error);

        return { success: false, error: error.message };
    }
};
