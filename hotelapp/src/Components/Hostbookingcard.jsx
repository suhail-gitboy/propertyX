import { FaUser, FaCalendarAlt, FaRupeeSign } from "react-icons/fa";
import React from "react";
import { useConfirmbooking } from "../ApiServices/tanstack/PropertyMethod";
import { ContextDatas } from "../Common/ContextWrapped";
import { property } from "lodash";

const HostBookingCard = ({ booking, id, Setnotify }) => {

    const { token, bookingID, SetbookingID } = ContextDatas()
    const { mutate: confirmBooking } = useConfirmbooking(token);
    return (
        <div key={id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col md:flex gap-4">

            {/* Property Image */}
            <img
                src={booking?.propertyId?.images?.[0]?.url}
                alt="property"
                className="w-32 h-28 object-cover rounded-lg"
            />

            {/* Details */}
            <div className="flex-1 space-y-2">

                <h3 className="text-lg font-semibold text-gray-800">
                    {booking?.propertyId?.title}
                </h3>

                {/* ✅ FIXED LOCATION */}
                <p className="text-sm text-gray-500">
                    📍 {booking?.propertyId?.location?.address},{" "}
                    {booking?.propertyId?.location?.city} -{" "}
                    {booking?.propertyId?.location?.pincode}
                </p>

                {/* User Info */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaUser />
                    <span>{booking?.userId?.name}</span>
                    <span className="text-gray-400">
                        ({booking?.userId?.email})
                    </span>
                </div>

                {/* Dates */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaCalendarAlt />
                    <span>
                        {new Date(booking?.checkIn).toLocaleDateString()} →{" "}
                        {new Date(booking?.checkOut).toLocaleDateString()}
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-1 font-semibold text-green-600">
                    <FaRupeeSign />
                    {booking?.totalPrice}
                </div>

                {/* Status */}
                <span
                    className={`inline-block px-3 py-1 text-xs rounded-full font-medium
                    ${booking?.bookingStatus === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : booking?.bookingStatus === "cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    {booking?.bookingStatus}
                </span>
            </div>

            {/* Action Buttons */}
            {
                booking?.bookingStatus !== "cancelled" && (
                    <div className="flex  justify-center gap-2">
                        {
                            booking?.bookingStatus !== "confirmed" && (
                                <button onClick={() => confirmBooking(booking?._id)} className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm">
                                    Confirm
                                </button>
                            )
                        }

                        <button onClick={() => { Setnotify(true); SetbookingID(booking?._id) }} className="bg-red-400 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm">
                            Cancel
                        </button>
                    </div>
                )
            }
        </div>
    );
};

export default HostBookingCard;
