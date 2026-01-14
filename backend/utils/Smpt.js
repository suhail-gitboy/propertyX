// utils/sendMailjet.js
import Mailjet from "node-mailjet";
import dotenv from "dotenv";
dotenv.config();

const mailjet = Mailjet.apiConnect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_SECRET_KEY
);

export const sendMailjet = async ({ to, subject, html }) => {
    try {
        const request = await mailjet
            .post("send", { version: "v3.1" })
            .request({
                Messages: [
                    {
                        From: {
                            Email: process.env.MAIL_FROM_EMAIL,
                            Name: "PropertyX",
                        },
                        To: [{ Email: to }],
                        Subject: subject,
                        HTMLPart: html,
                    },
                ],
            });

        return { success: true, data: request.body };
    } catch (error) {
        console.error(
            "Mailjet error:",
            error?.response?.data || error.message
        );
        return { success: false, error: error.message };
    }
};
