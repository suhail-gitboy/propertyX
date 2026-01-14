
import { Booking } from "../models/Booking.model.js";
import { Propertymodel } from "../models/Property.model.js"
import { sendMail } from "../utils/Nodemailer.js";
import { bookingToHostTemplate, bookingToUserTemplate } from "../utils/emailtemplate.js";
import { sendWhatsApp } from "../services/WatsappService.js";
import Stripe from "stripe";
import { adminBroadcastTemplate } from "../services/admintemplateemail.js";
const stripe = new Stripe(process.env.STRIPE_SECRET)


export const checkAvailability = async (req, res) => {
    try {
        const { propertyId, checkin, checkout, rooms } = req.body;




        const property = await Propertymodel.findById({ _id: propertyId });

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }

        const totalRooms = property.roomsAvailable;


        const overlappingBookings = await Booking.find({
            propertyId,
            bookingStatus: { $ne: "cancelled" },

            checkIn: { $lt: new Date(checkout) },
            checkOut: { $gt: new Date(checkin) }
        });

        const bookedRooms = overlappingBookings.reduce(
            (sum, booking) => sum + booking.rooms,
            0
        );


        const availableRooms = totalRooms - bookedRooms;


        if (rooms > availableRooms) {
            return res.status(200).json({
                success: false,
                availableRooms,
                message: `Only ${availableRooms} rooms available`
            });
        }


        return res.status(200).json({
            success: true,
            availableRooms,
            message: "Rooms available"
        });

    } catch (error) {
        console.error("Availability error:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};



export const Newbooking = async (req, res) => {
    try {
        const {
            propertyId,
            hostId,
            name,
            phone,
            checkin,
            checkout,
            rooms,
            paymentMode,
            totalPrice
        } = req.body;

        const booking = await Booking.create({
            propertyId,
            userId: req.payload._id,
            hostId,
            name,
            phone,
            checkIn: checkin,
            checkOut: checkout,
            rooms,
            paymentMode,
            totalPrice,
            bookingStatus: paymentMode === "online" ? "confirmed" : "pending"
        });

        console.log(phone);



        await booking.populate([
            { path: "propertyId", select: "title location price images" },
            { path: "userId", select: "name email" },
            { path: "hostId", select: "name email" }
        ]);

        const Alldetails = booking.toObject();


        //    tohostpending



        await sendWhatsApp({
            to: `whatsapp:+91${Alldetails.phone}`,
            message: `
✅ *Booking has been Considered*

Hello *${Alldetails.userId.name}* 👋

✅ within hours will send you confirmation
Your booking has been successfully placed. Here are the details:

🏠 *Property Details*
• Title: ${Alldetails.propertyId.title}
• Location: ${Alldetails.propertyId.location}

📅 *Stay Information*
• Check-in: ${new Date(Alldetails.checkIn).toDateString()}
• Check-out: ${new Date(Alldetails.checkOut).toDateString()}
• Rooms: ${Alldetails.rooms}

💰 *Payment*
• Total Price: ₹${Alldetails.totalPrice}
• Payment Mode: ${Alldetails.paymentMode}

👤 *Host Details*
• Name: ${Alldetails.hostId.name}
• Contact: ${Alldetails.hostId.phone || "Will be shared soon"}

🔔 You will be notified once the host confirms your booking.
  check it Link:http://localhost:5173/profile/bookings
Thank you for choosing us!
`
        });


        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking: Alldetails
        });

    } catch (error) {
        console.error("Newbooking error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create booking",
            error: error.message
        });
    }
};



export const BookinglistAll = async (req, res) => {
    const Usertype = req.payload
    console.log(Usertype);

    try {

        const filter =
            Usertype.role === "user"
                ? { userId: Usertype._id }
                : { hostId: Usertype._id };

        const users = await Booking.find(filter).populate({
            path: "propertyId",
            select: "title location price images"
        })
            .populate({
                path: "userId",
                select: "name email"
            })
            .populate({
                path: "hostId",
                select: "name email"
            })
            .sort({ createdAt: -1 })


        res.status(200).json(users)
    } catch (error) {

        res.status(500).json(error)

    }
}


export const Cancelbooking = async (req, body) => {
    const { id } = req.params

    try {
        const booking = await Booking.findByIdAndUpdate({ _id: id }, { bookingStatus: "cancelled" }, { new: true });

        const Alldetails = await Booking.findById({ _id: id }).populate({ path: "propertyId" }).populate({ path: "userId" }).populate({ path: "hostId" })
        await sendWhatsApp({
            to: `whatsapp:+91${Alldetails.hostId.phone}`,
            message: `
❌ *Booking Cancelled Notification*

Hello *${Alldetails.hostId.name}*,

A booking for your property has been *cancelled*. Please find the details below:

🏠 *Property*
• Title: ${Alldetails.propertyId.title}

👤 *Guest*
• Name: ${Alldetails.userId.name}

📅 *Booking Dates*
• Check-in: ${new Date(Alldetails.checkIn).toDateString()}
• Check-out: ${new Date(Alldetails.checkOut).toDateString()}
• Rooms: ${Alldetails.rooms}

⚠️ No further action is required from your side.


Thank you for staying updated.
`
        });








        res.status(200).json({ success: true, message: "Booking cancelled successfully" });
    } catch (error) {
        console.error("Cancelbooking error:", error);
        res.status(500).json({ success: false, message: "Failed to cancel booking", error: error.message });
    }
}



export const UserConfirmation = async (req, res) => {
    const { id } = req.params
    console.log(id);


    try {
        const booking = await Booking.findByIdAndUpdate({ _id: id }, { bookingStatus: "confirmed" }, { new: true });

        const Alldetails = await Booking.findById({ _id: id }).populate({ path: "propertyId" }).populate({ path: "userId" }).populate({ path: "hostId" })


        console.log(Alldetails.phone, "checkif its there");

        await sendWhatsApp({
            to: `whatsapp:+91${Alldetails.phone}`,
            message: `
✅ *Booking Confirmed!*

Hello *${Alldetails.userId.name}* 👋,

Great news! Your booking has been *successfully confirmed*. Here are your booking details:

🏠 *Property*
• Title: ${Alldetails.propertyId.title}

👤 *Host*
• Name: ${Alldetails.hostId.name}

📅 *Booking Dates*
• Check-in: ${new Date(Alldetails.checkIn).toDateString()}
• Check-out: ${new Date(Alldetails.checkOut).toDateString()}
• Rooms: ${Alldetails.rooms}

💰 *Payment*
• Total Price: ₹${Alldetails.totalPrice}

📌 We look forward to hosting you. If you have any questions, feel free to contact the host.

Thank you for choosing us!
`
        });









        res.status(200).json({ success: true, message: "Booking cancelled successfully" });
    } catch (error) {
        console.error("Cancelbooking error:", error);
        res.status(500).json({ success: false, message: "Failed to cancel booking", error: error.message });
    }
}


export const Cancelbookingbyhost = async (req, res) => {
    const { id } = req.params;
    const { subject, reason, message } = req.body;


    try {

        const booking = await Booking.findByIdAndUpdate(
            id,
            { bookingStatus: "cancelled" },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }


        const Alldetails = await Booking.findById(id)
            .populate("propertyId")
            .populate("userId")
            .populate("hostId");


        await sendWhatsApp({
            to: `whatsapp:+91${Alldetails.phone}`,
            message: `
❌ *${subject || "Booking Cancelled"}*

Hello *${Alldetails.userId.name}*,

We regret to inform you that your booking has been *cancelled by the host*.

🏠 *Property*
• Title: ${Alldetails.propertyId.title}

👤 *Host*
• Name: ${Alldetails.hostId.name}

📅 *Booking Dates*
• Check-in: ${new Date(Alldetails.checkIn).toDateString()}
• Check-out: ${new Date(Alldetails.checkOut).toDateString()}
• Rooms: ${Alldetails.rooms}

📝 *Reason*
${reason || "Not specified"}

💬 *Message from Host*
${message || "We apologize for the inconvenience caused."}

🔔 If any refund applies, you will be notified separately.

Thank you for your understanding.
`
        });

        return res.status(200).json({
            success: true,
            message: "Booking cancelled and user notified"
        });

    } catch (error) {
        console.error("Cancelbookingbyhost error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to cancel booking"
        });
    }
};


export const PaymentStripe = async (req, res) => {
    const {
        propertyId,
        hostId,
        name,
        phone,
        checkin,
        checkout,
        rooms,
        paymentMode,
        totalPrice
    } = req.body;

    const image = await Propertymodel.findById({ _id: propertyId }).select("images")
    console.log(image.images[0].url);

    try {

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: name,
                            images: [image.images[0].url]
                        },
                        unit_amount: totalPrice * 100
                    },
                    quantity: 1,
                }
            ],
            mode: "payment",
            success_url: "http://localhost:5173/payment/success",
            cancel_url: "http://localhost:5173/payment/cancel"
        })

        res.status(200).json({ url: session.url })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Payment failed",
            error: error.message
        })
    }


}



export const Notifyuserfromadminpanel = async (req, res) => {

    const { state,
        subject,
        message,
        email } = req.body;


    try {


        await sendMail({
            to: email,
            subject,
            html: adminBroadcastTemplate({
                subject,
                message,
                location: state,
            }),
        });


        return res.status(200).json({
            message: `Notification sent successfully to ${email}`,
        });



    }






    catch (error) {
        console.error("Cancelbookingbyhost error:", error);
        return res.status(500).json({
            success: false,
            message: "failed"
        });
    }
};


