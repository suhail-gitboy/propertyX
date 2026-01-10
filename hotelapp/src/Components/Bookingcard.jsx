"use client"

import React, { useState } from "react"
import {
    FaHotel,
    FaCalendarAlt,
    FaBed,
    FaMoneyBillWave,
    FaRupeeSign,
    FaEye,
    FaTimesCircle,
} from "react-icons/fa"
import BookedRoomWithModal from "./modals/ViewMorebookingdetail"
import { formatDate } from "../Utils/UILIBRARY/Realtime"
import { usecancelbookedproperty } from "../ApiServices/tanstack/PropertyMethod"
import { ContextDatas } from "../Common/ContextWrapped"
export default function BookedRoomCard({ booking }) {

    const [open, setOpen] = useState(false)
    // 🧪 Dummy booking data (matches your Booking schema)

    const statusStyle = {
        confirmed: "bg-emerald-500/20 text-emerald-400",
        pending: "bg-amber-500/20 text-amber-400",
        cancelled: "bg-red-500/20 text-red-400",
    }
    const { token } = ContextDatas()


    const cancel = usecancelbookedproperty(token)

    return (
        <div className="max-w-md mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-[#0b1d26] via-[#132f3a] to-[#1c4a5a] shadow-2xl border border-white/10">

            {open && <BookedRoomWithModal data={booking} open={open} setOpen={setOpen} />}
            <div className="relative h-48">
                <img
                    src={booking.propertyId.images[0].url}
                    alt="Property"
                    className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-black/30" />

                {/* Status Badge */}
                <span
                    className={`absolute top-4 right-4 px-4 py-1 rounded-full text-xs font-semibold tracking-wide ${statusStyle[booking.bookingStatus]}`}
                >
                    {booking.bookingStatus.toUpperCase()}
                </span>

                {/* Property Name */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                    <FaHotel className="text-teal-400 text-lg" />
                    <h3 className="text-lg font-semibold">
                        {booking.propertyName}
                    </h3>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 text-sm text-gray-200">

                {/* Dates */}
                <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-teal-400" />
                    <span>
                        {formatDate(booking.checkIn)} → {formatDate(booking.checkOut)}
                    </span>
                </div>

                {/* Rooms */}
                <div className="flex items-center gap-3">
                    <FaBed className="text-teal-400" />
                    <span>{booking.rooms} Rooms Booked</span>
                </div>

                {/* Payment Mode */}
                <div className="flex items-center gap-3">
                    <FaMoneyBillWave className="text-teal-400" />
                    <span>
                        Payment Mode:{" "}
                        <span className="capitalize">{booking.paymentMode}</span>
                    </span>
                </div>

                {/* Price */}
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <span className="flex items-center gap-1 text-gray-300">
                        <FaRupeeSign /> {booking?.paymentMode == "arrival" ? "payment at arrival" : "total paid"}
                    </span>
                    <span className="text-xl font-bold text-emerald-400">
                        ₹{booking.totalPrice}
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 p-5 pt-0">
                <button onClick={() => setOpen(true)} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition text-white font-medium">
                    <FaEye />
                    View Details
                </button>

                {booking.bookingStatus !== "cancelled" && (
                    <button onClick={() => {
                        cancel.mutate(booking._id)
                    }} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 transition text-red-400 font-medium">
                        <FaTimesCircle />
                        Cancel
                    </button>
                )}
            </div>
        </div>
    )
}
