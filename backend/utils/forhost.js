export const hostBookingTemplate = ({
    hostName,
    guestName,
    propertyName,
    checkIn,
    checkOut,
    rooms,
    phone,
    bookingId,
}) => `
<!DOCTYPE html>
<html>
<body style="margin:0;font-family:Arial;background:#0f172a;padding:20px;">
  <div style="max-width:600px;margin:auto;background:#020617;border-radius:14px;color:white;box-shadow:0 10px 40px rgba(0,0,0,.6)">

    <div style="padding:20px;border-bottom:1px solid #1e293b">
      <h2 style="margin:0;color:#38bdf8">📢 New Booking Received</h2>
      <p style="opacity:.8">Property: ${propertyName}</p>
    </div>

    <div style="padding:20px">
      <p><strong>Guest:</strong> ${guestName}</p>
      <p><strong>Phone:</strong> ${phone}</p>

      <p><strong>Check-In:</strong> ${checkIn}</p>
      <p><strong>Check-Out:</strong> ${checkOut}</p>
      <p><strong>Rooms:</strong> ${rooms}</p>

      <hr style="border-color:#1e293b"/>

      <p style="font-size:12px;color:#94a3b8">
        Booking ID: ${bookingId}
      </p>
    </div>

    <div style="padding:15px;text-align:center;background:#020617">
      <p style="font-size:12px;color:#64748b">
        Manage booking from your dashboard
      </p>
    </div>

  </div>
</body>
</html>
`
