import { createRequire } from "module";
const require = createRequire(import.meta.url);

const Mailjet = require("node-mailjet");

const mailjet = Mailjet.apiConnect(
    process.env.MAILJET_API,
    process.env.MAIL_JETSECRET
);

export const sendMailjet = async ({ to, subject, html }) => {
    try {
        const request = await mailjet
            .post("send", { version: "v3.1" })
            .request({
                Messages: [
                    {
                        From: {
                            Email: process.env.MAIL_USER,
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
