import dotenv from "dotenv"
dotenv.config()

export const sendMailsmtp = async ({ to, subject, html }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
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
