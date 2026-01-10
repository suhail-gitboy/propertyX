import { FaCheckCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa";
import React from "react";
const HostBookingSummary = ({ data }) => {
    // Dummy data


    const confirmed = data?.filter(booking => booking.bookingStatus === "confirmed").length;
    const pending = data?.filter(booking => booking.bookingStatus === "pending").length;
    const cancelled = data?.filter(booking => booking.bookingStatus === "cancelled").length;

    return (
        <section className="p-6 bg-gray-50 rounded-lg shadow-sm">

            {/* Header */}
            <header className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Active Reservations</h2>
                <p className="text-sm text-gray-500">
                    View and manage your current bookings here
                </p>
            </header>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                {/* Confirmed */}
                <div className="bg-green-100 text-green-700 rounded-xl p-4 flex items-center justify-between shadow">
                    <div>
                        <h3 className="text-lg font-semibold">Confirmed</h3>
                        <p className="mt-1 text-2xl font-bold">{confirmed}</p>
                    </div>
                    <FaCheckCircle className="w-10 h-10" />
                </div>

                {/* Pending */}
                <div className="bg-yellow-100 text-yellow-700 rounded-xl p-4 flex items-center justify-between shadow">
                    <div>
                        <h3 className="text-lg font-semibold">Pending</h3>
                        <p className="mt-1 text-2xl font-bold">{pending}</p>
                    </div>
                    <FaHourglassHalf className="w-10 h-10" />
                </div>

                {/* Cancelled */}
                <div className="bg-red-100 text-red-700 rounded-xl p-4 flex items-center justify-between shadow">
                    <div>
                        <h3 className="text-lg font-semibold">Cancelled</h3>
                        <p className="mt-1 text-2xl font-bold">{cancelled}</p>
                    </div>
                    <FaTimesCircle className="w-10 h-10" />
                </div>

            </div>
        </section>
    );
};

export default HostBookingSummary;
