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
    FaUser,
    FaPhoneAlt,
    FaClock,
} from "react-icons/fa"
import { MdClose } from "react-icons/md"

import { formatDate } from "../../Utils/UILIBRARY/Realtime"

export default function BookedRoomWithModal({ open, setOpen, data }) {

    console.log(data);

    return (

        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
            <div className="bg-[#0f2027] text-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative">

                {/* Close */}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    <MdClose size={22} />
                </button>

                {/* Header */}
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-xl font-semibold">
                        Booking Details
                    </h2>
                    <p className="text-sm text-gray-400">
                        Booking ID: {data._id}
                    </p>
                </div>

                {/* Property */}
                <div className="flex">
                    <img
                        src={data?.propertyId?.images[0].url}
                        alt="property"
                        className="w-1/2 h-40 object-cover"
                    />
                    <img
                        src={data?.propertyId?.images[3].url}
                        alt="property"
                        className="w-1/2 h-40 object-cover"
                    />
                </div>

                {/* Details */}
                <div className="p-6 space-y-4 text-sm">

                    <Detail icon={<FaHotel />} label="Property">
                        {data?.propertyId?.title}
                    </Detail>

                    <Detail icon={<FaUser />} label="Guest Name">
                        {data?.userId?.name}
                    </Detail>

                    <Detail icon={<FaPhoneAlt />} label="Phone">
                        {data?.phone}
                    </Detail>

                    <Detail icon={<FaCalendarAlt />} label="Stay">
                        {formatDate(data?.checkIn)} → {formatDate(data?.checkOut)}
                    </Detail>

                    <Detail icon={<FaBed />} label="Rooms">
                        {data.rooms}
                    </Detail>

                    <Detail icon={<FaMoneyBillWave />} label="Payment">
                        {data?.paymentMode?.toUpperCase()}
                    </Detail>

                    <Detail icon={<FaClock />} label="Booked On">
                        {formatDate(data?.createdAt)}
                    </Detail>

                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                        <span>{data?.paymentMode == "arrival" ? "payment at arrival" : "payment done"}</span>
                        <span className="text-lg font-bold text-emerald-400">
                            ₹{data.totalPrice}
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-5 border-t border-white/10">
                    <button
                        onClick={() => setOpen(false)}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 font-semibold"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>

    )



}

/* ---------- Reusable Detail Row ---------- */
function Detail({ icon, label, children }) {
    return (
        <div className="flex items-start gap-3">
            <span className="text-teal-400 mt-1">{icon}</span>
            <div>
                <p className="text-gray-400 text-xs">{label}</p>
                <p className="font-medium">{children}</p>
            </div>
        </div>
    )
}
