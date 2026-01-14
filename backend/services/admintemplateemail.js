export const adminBroadcastTemplate = ({
    subject,
    message,
    location,
    platformName = "MyProperty Platform",
}) => `
  <div style="
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #f9fafb;
    padding: 24px;
  ">
    <div style="
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.06);
      padding: 24px;
    ">

      <!-- Header -->
      <div style="margin-bottom: 16px;">
        <h2 style="color:#e11d48; margin:0;">
          ${subject}
        </h2>
        <p style="color:#6b7280; font-size:14px; margin-top:4px;">
          Notification for users in <b>${location}</b>
        </p>
      </div>

      <!-- Divider -->
      <hr style="border:none; border-top:1px solid #e5e7eb; margin:16px 0;" />

      <!-- Message -->
      <div style="color:#374151; font-size:15px; line-height:1.6;">
        ${message}
      </div>

      <!-- Footer -->
      <div style="
        margin-top: 24px;
        padding-top: 16px;
        border-top: 1px solid #e5e7eb;
        font-size: 13px;
        color: #6b7280;
      ">
        <p style="margin:0;">
          — Admin Team<br />
          <b>${platformName}</b>
        </p>
        <p style="margin-top:8px;">
          This is an automated message. Please do not reply.
        </p>
      </div>

    </div>
  </div>
`;
