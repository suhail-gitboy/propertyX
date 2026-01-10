import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config()
export const sendMail = async ({ to, subject, html }) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    return transporter.sendMail({
        from: `"propertyX booking mail" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html,
    });
};
