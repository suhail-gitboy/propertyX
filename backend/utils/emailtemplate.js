// Email to User after booking
export const bookingToUserTemplate = ({ userName, propertyName, checkIn, checkOut, rooms, totalPrice }) => `
  <div style="font-family:sans-serif; line-height:1.5;">
    <h2 style="color:#008080;">Booking Confirmed!</h2>
    <p>Hi ${userName},</p>
    <p>Your booking at <b>${propertyName}</b> is confirmed.</p>
    <ul>
      <li>Check-In: ${checkIn}</li>
      <li>Check-Out: ${checkOut}</li>
      <li>Rooms: ${rooms}</li>
      <li>Total Paid: ₹${totalPrice}</li>
    </ul>
    <p>Thank you for choosing MyProperty Platform!</p>
  </div>
`;

// Email to Host after booking
export const bookingToHostTemplate = ({ hostName, propertyName, userName, checkIn, checkOut, rooms }) => `
  <div style="font-family:sans-serif; line-height:1.5;">
    <h2 style="color:#008080;">New Booking Received!</h2>
    <p>Hi ${hostName},</p>
    <p>${userName} has booked your property <b>${propertyName}</b>.</p>
    <ul>
      <li>Check-In: ${checkIn}</li>
      <li>Check-Out: ${checkOut}</li>
      <li>Rooms: ${rooms}</li>
    </ul>
    <p>Please prepare accordingly.</p>
  </div>
`;
