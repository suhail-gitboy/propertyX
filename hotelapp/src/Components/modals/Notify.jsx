import React, { useState } from "react";
import { FaTimes, FaExclamationTriangle, FaPaperPlane } from "react-icons/fa";
import { ContextDatas } from "../../Common/ContextWrapped";
import { useCancelbookingbyhost } from "../../ApiServices/tanstack/PropertyMethod";

const CancelBookingModal = ({ onclose, bookingId }) => {
    const { token, bookingID, loading } = ContextDatas();
    const { mutate } = useCancelbookingbyhost(token);
    const [data, Setdata] = useState({
        reason: "",
        subject: "",
        message: ""
    })

    const Funcbookingcancel = () => {
        const { reason, subject, message } = data;
        if (!reason || !subject || !message) {
            alert("Please fill all fields");
        } else {
            mutate({ id: bookingID, body: data });
            onclose();
        }
        mutate({ id: bookingID, body: data });
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            {/* Modal */}
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative">


                {/* Close Icon */}


                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                    <div className="bg-red-100 text-red-600 p-3 rounded-full">
                        <FaExclamationTriangle size={20} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Cancel Booking
                        </h2>
                        <p className="text-sm text-gray-500">
                            Notify the user about this cancellation
                        </p>
                    </div>
                </div>

                {/* Reason */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cancellation Reason
                    </label>
                    <select onChange={(e) => Setdata({ ...data, reason: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400">
                        <option value="Property unavailable">Property unavailable</option>
                        <option value="Maintenance issue">Maintenance issue</option>
                        <option value="Overbooking">Overbooking</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Subject */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                    </label>
                    <input
                        type="text"
                        value={data.subject}
                        onChange={(e) => Setdata({ ...data, subject: e.target.value })}
                        placeholder="Booking cancellation notice"
                        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                </div>

                {/* Message */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message to User
                    </label>
                    <textarea
                        rows="4"
                        value={data.message}
                        onChange={(e) => Setdata({ ...data, message: e.target.value })}
                        placeholder="Explain the reason for cancellation..."
                        className="w-full border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <button onClick={onclose} className="px-4 py-2 text-sm rounded-lg border text-gray-600 hover:bg-gray-100">
                        Close
                    </button>

                    <button onClick={() => Funcbookingcancel()} className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white flex items-center gap-2 hover:bg-red-700">
                        <FaPaperPlane />
                        {loading ? "Loading..." : "Notify User"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CancelBookingModal;
