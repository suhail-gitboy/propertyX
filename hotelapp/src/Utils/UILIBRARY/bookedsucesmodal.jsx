"use client"

import React from "react"
import {
    FaCheckCircle,
    FaHotel,
    FaCalendarAlt,
    FaUserFriends,
    FaRupeeSign,
    FaMoneyBillWave,
    FaPhoneAlt,
} from "react-icons/fa"
import { MdClose } from "react-icons/md"
import { Link } from "react-router"
import { ContextDatas } from "../../Common/ContextWrapped"
import { formatDate } from "./Realtime"
import { AnimatePresence, motion } from "framer-motion"

export default function BookingSuccessModal({ onClose }) {



    const { notidyuser, Setnotifydata } = ContextDatas()
    console.log(notidyuser);

    return (<>
        <AnimatePresence>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
                <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative">

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-black"
                    >
                        <MdClose size={22} />
                    </button>

                    {/* Header */}
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
                        <div className="flex items-center gap-3">
                            <FaCheckCircle size={28} />
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Booking Confirmed!
                                </h2>
                                <p className="text-sm opacity-90">
                                    Your rooms have been successfully booked
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Property Image */}
                    <div className="relative">
                        <img
                            src={notidyuser?.propertyId?.images[0].url}
                            alt="property"
                            className="w-full h-48 object-cover"
                        />
                        <div className="absolute bottom-3 left-3 bg-white/90 px-4 py-2 rounded-xl shadow">
                            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                <FaHotel className="text-teal-600" />
                                {notidyuser?.propertyId.name}
                            </h3>
                        </div>
                    </div>

                    {/* Booking Details */}
                    <div className="p-6 space-y-4 text-sm text-gray-700">

                        <div className="flex items-center gap-3">
                            <FaCalendarAlt className="text-teal-600" />
                            <span>
                                {formatDate(notidyuser?.checkIn)} → {formatDate(notidyuser?.checkOut)}
                                <span className="text-gray-500">
                                    {" "}({notidyuser?.nights} nights)
                                </span>
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <FaUserFriends className="text-teal-600" />
                            <span>
                                {notidyuser?.room} rooms
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <FaPhoneAlt className="text-teal-600" />
                            <span>{notidyuser?.phone}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <FaMoneyBillWave className="text-teal-600" />
                            <span>
                                Payment: <span className="font-medium">{notidyuser?.paymentMode}</span>
                            </span>
                        </div>

                        <hr />

                        <div className="flex justify-between items-center font-semibold text-gray-900">
                            <span className="flex items-center gap-1">
                                <FaRupeeSign />
                                Total ${notidyuser?.paymentMode === "online" ? "Paid Amount" : "Amount to be paid at hotel"}
                            </span>
                            <span className="text-lg text-emerald-600">
                                ₹{notidyuser?.totalPrice}
                            </span>
                        </div>

                        <div className="text-xs text-gray-500 text-center">
                            Booking ID: {notidyuser?._id}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-5 border-t flex justify-center items-center">
                        <Link
                            to={"/profile/bookings"}
                            onClick={onClose}
                            className="w-full bg-gradient-to-r text-center from-teal-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
                        >
                            View My Bookings
                        </Link>
                    </div>

                </div>
            </motion.div>
        </AnimatePresence>
    </>

    )
}
