import express from "express"
import { BookinglistAll, Cancelbooking, Cancelbookingbyhost, checkAvailability, Newbooking, Notifyuserfromadminpanel, PaymentStripe, UserConfirmation } from "../controllers/Booking.controller.js"
import { AuthmiddleWare } from "../middlewares/auth.middleware.js"


export const BookingRoute = express.Router()



BookingRoute.post("/checkavailability", checkAvailability)

BookingRoute.post("/newbooking", AuthmiddleWare, Newbooking)

BookingRoute.get("/allbooking", AuthmiddleWare, BookinglistAll)

BookingRoute.put("/cancelbooking/:id", AuthmiddleWare, Cancelbooking)


BookingRoute.put("/cancelbookingbyhost/:id", AuthmiddleWare, Cancelbookingbyhost)

BookingRoute.put("/confirmation/:id", AuthmiddleWare, UserConfirmation)

BookingRoute.post("/payment", AuthmiddleWare, PaymentStripe)
BookingRoute.post("/notifybyadmin", Notifyuserfromadminpanel)