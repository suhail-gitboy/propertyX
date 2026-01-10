import twilio from "twilio";
import dotenv from "dotenv"
dotenv.config()
const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

export const sendWhatsApp = async ({ to, message }) => {
    return await client.messages.create({
        from: process.env.TWILIO_WHATSAPP_FROM,
        to,
        body: message,
    });
};
