import React, { useState } from "react";
import { FaBell, FaPaperPlane, FaTimes } from "react-icons/fa";
import { Allnotifyadmin } from "../ApiServices/Allapi";
import { toast } from "sonner";


const NotifyUsersByStateModal = ({ onClose, data, setData, loading, Setloading }) => {

    const handleSend = async () => {
        const { state, subject, message } = data;


        if (!state || !subject || !message) {
            alert("Please fill all fields");
            return;
        }

        try {
            Setloading(true)

            const res = await Allnotifyadmin(data)

            if (res.status == 200) {
                toast.success(res.data)
                Setloading(false)
            } else {
                console.log(res);
                Setloading(false)

            }

        } catch (error) {
            console.log(error);
            Setloading(false)

        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">

            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative">

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <FaTimes />
                </button>

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-rose-100 text-rose-600 p-3 rounded-full">
                        <FaBell size={18} />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Notify Users by State
                        </h2>
                        <p className="text-sm text-gray-500">
                            Send announcement to users in a specific location
                        </p>
                    </div>
                </div>

                {/* State Selector */}
                <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Select State / City
                    </label>
                    <select
                        onChange={(e) => setData({ ...data, state: e.target.value })}
                        className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-rose-400"
                    >
                        <option value="">Select location</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Delhi">Delhi</option>
                    </select>
                </div>

                {/* Subject */}
                <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Subject
                    </label>
                    <input
                        type="text"
                        value={data.subject}
                        onChange={(e) => setData({ ...data, subject: e.target.value })}
                        placeholder="Important update for users"
                        className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-rose-400"
                    />
                </div>

                {/* Message */}
                <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Message
                    </label>
                    <textarea
                        rows={4}
                        value={data.message}
                        onChange={(e) => setData({ ...data, message: e.target.value })}
                        placeholder="Write your announcement here..."
                        className="w-full rounded-lg border px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-rose-400"
                    />
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 text-sm"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSend}
                        className="px-4 py-2 rounded-lg bg-rose-600 text-white flex items-center gap-2 text-sm hover:bg-rose-700"
                    >
                        <FaPaperPlane />
                        Notify Users
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotifyUsersByStateModal;
