export const adminBroadcastTemplate = ({
    subject,
    message,
    location,
    platformName = "MyProperty Platform",
    ctaLink = "https://yourplatform.com",
}) => `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color:#f9fafb; padding:24px;">
  <div style="max-width:600px; margin:auto; background:#fff; border-radius:12px; box-shadow:0 10px 25px rgba(0,0,0,0.06); padding:24px;">
    
    <!-- Header -->
    <div style="margin-bottom:16px;">
      <h2 style="color:#e11d48; margin:0;">${subject}</h2>
      <p style="color:#6b7280; font-size:14px; margin-top:4px;">
        Notification for users in <b>${location}</b>
      </p>
    </div>

    <hr style="border:none; border-top:1px solid #e5e7eb; margin:16px 0;" />

    <!-- Message -->
    <div style="color:#374151; font-size:15px; line-height:1.6;">
      ${message}
    </div>

    <!-- CTA Button -->
    <a href="${ctaLink}" style="display:inline-block; padding:10px 20px; background:#e11d48; color:white; border-radius:6px; text-decoration:none; margin-top:16px; font-weight:bold;">
      Go to Platform
    </a>

    <!-- Footer -->
    <div style="margin-top:24px; padding-top:16px; border-top:1px solid #e5e7eb; font-size:13px; color:#6b7280;">
      <p style="margin:0;">
        — Admin Team<br />
        <b>${platformName}</b>
      </p>
      <p style="margin-top:8px;">This is an automated message. Please do not reply.</p>
      <p style="color:#9ca3af; font-size:12px; margin-top:8px;">Sent on ${new Date().toLocaleString()}</p>
    </div>

  </div>
</div>
`;
