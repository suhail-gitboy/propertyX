import React, { useEffect, useState } from "react";
import { FaHotel, FaRupeeSign, FaCreditCard, FaMoneyBillWave, FaTimes, FaUserAltSlash } from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";
import { ContextDatas } from "../../Common/ContextWrapped";
import { LoaderOne } from "../../Utils/UILIBRARY/Loader";
import { NewbookingApi, NewpaymentApi } from "../../ApiServices/Allapi";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const RoomPaymentModal = ({
    open,

    pricePerRoom = 4500,
    nights = 6,
    maxRooms = 6,
    onConfirm,
    Setbookmodal,

}) => {
    const [rooms, setRooms] = useState(1);




    const { Booking, Setbooking, loading, Setloading, token, User, Setloginmodal, Setnotifydata, bookingsuccessmodal, SetbookingSuccessfull } = ContextDatas()

    useEffect(() => { Setloading(false) }, [])
    const checkin = new Date(Booking.checkin);
    const checkout = new Date(Booking.checkout);

    const diffTime = checkout - checkin; // difference in milliseconds
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convert to days
    const Navigate = useNavigate()



    const FuncBooking = async () => {
        try {
            const Headers = { Authorization: `Bearer ${token}` }
            const Res = await NewbookingApi(Booking, Headers)

            if (Res.data.success) {
                Setbookmodal(false)
                Setnotifydata(Res.data.booking)

                setTimeout(() => {
                    SetbookingSuccessfull(true)
                }, 2000)
            } else {
                toast.error("Server error, try again")
            }
        } catch (error) {
            toast.error("Something went wrong")
            console.error(error)
        } finally {
            Setloading(false)
        }
    }


    const FunctionNewbooking = async () => {
        Setloading(true)

        if (!token || User.role == "host") {
            Setloginmodal(true)
            toast.error("Login to continue")
            Setloading(false)
            Navigate("/")
            return
        }

        try {
            const Headers = { Authorization: `Bearer ${token}` }

            if (Booking.paymentMode === "online") {
                const Res = await NewpaymentApi(Booking, Headers)

                if (Res.status === 200) {

                    window.location.href = Res.data.url
                    return
                } else {
                    toast.error("Payment failed")
                }
            } else {
                await FuncBooking()
            }
        } catch (error) {
            toast.error("Something went wrong")
            console.error(error)
        } finally {
            Setloading(false)
        }
    }

    console.log(Booking);

    return (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
            <div className="  bg-white
    w-[92%] sm:w-[90%]
    max-w-sm md:max-w-lg lg:max-w-xl
    max-h-[85vh] sm:max-h-[90vh]
    rounded-3xl
    shadow-[0_20px_60px_rgba(0,0,0,0.25)]
    overflow-y-auto">

                {/* Header */}
                <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Complete your booking
                        </h2>
                        <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                            <FaRupeeSign className="text-teal-600" />
                            <span className="font-medium text-gray-800">
                                {Booking.pricePerRoom}
                            </span>
                            <span>/ room / night</span>
                        </p>
                    </div>

                    <button
                        onClick={() => Setbookmodal(prev => !prev)}
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                        <FaTimes className="text-gray-500" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-6">

                    {/* Rooms */}
                    <div>
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <FaHotel className="text-teal-600" />
                                valid mobile number
                            </label>

                        </div>


                        <input
                            type="text"
                            placeholder="mobile number"

                            value={Booking.phone}
                            onChange={(e) => Setbooking(prev => ({ ...prev, phone: Number(e.target.value) }))}
                            className="mt-3 w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm
          focus:ring-2 focus:ring-teal-500 focus:border-teal-500 mb-3 outline-none transition"
                        />
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <FaHotel className="text-teal-600" />
                                no of guest
                            </label>
                            <label className="text-sm  text-gray-400 font-light flex items-center gap-2">

                                maximum 3 member per room
                                <FaUserAltSlash className="text-yellow-600" />
                            </label>
                        </div>
                        <input
                            type="number"
                            min={1}
                            max={maxRooms}
                            value={rooms}
                            onChange={e => setRooms(+e.target.value)}
                            className="mt-3 w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm
          focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                        />
                        <p className="mt-2 text-xs text-gray-400">
                            Up to {maxRooms} rooms available
                        </p>
                    </div>

                    {/* Payment Mode */}
                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-3">
                            Payment preference
                        </p>

                        <div className="space-y-3">

                            {/* Online */}
                            <button
                                onClick={() => Setbooking(prev => ({ ...prev, paymentMode: "online" }))}
                                className={`w-full rounded-2xl border px-4 py-4 flex items-center gap-4 transition
            ${Booking.paymentMode === "online"
                                        ? "border-teal-600 bg-teal-50 ring-1 ring-teal-600"
                                        : "border-gray-300 hover:border-gray-400"
                                    }`}
                            >
                                <div className="p-3 bg-teal-100 rounded-xl">
                                    <FaCreditCard className="text-teal-700" />
                                </div>

                                <div className="text-left">
                                    <p className="text-sm font-semibold text-gray-900">
                                        Pay online
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        UPI • Card • Net banking
                                    </p>
                                </div>
                            </button>

                            {/* Arrival */}
                            <button
                                onClick={() => Setbooking(prev => ({ ...prev, paymentMode: "arrival" }))}
                                className={`w-full rounded-2xl border px-4 py-4 flex items-center gap-4 transition
            ${Booking.paymentMode === "arrival"
                                        ? "border-teal-600 bg-teal-50 ring-1 ring-teal-600"
                                        : "border-gray-300 hover:border-gray-400"
                                    }`}
                            >
                                <div className="p-3 bg-teal-100 rounded-xl">
                                    <FaMoneyBillWave className="text-teal-700" />
                                </div>

                                <div className="text-left">
                                    <p className="text-sm font-semibold text-gray-900">
                                        Pay at property
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Cash or host-approved mode
                                    </p>
                                </div>
                            </button>

                        </div>
                    </div>

                    {/* Price Summary */}
                    <div className="rounded-2xl bg-gray-50 p-4 text-sm space-y-3">
                        <div className="flex justify-between text-gray-600">
                            <span>
                                ₹{pricePerRoom} × {Booking.rooms} rooms × {diffDays} days
                            </span>
                            <span>₹{Booking.totalPrice}</span>
                        </div>

                        <div className="flex justify-between font-semibold text-gray-900 text-base">
                            <span>Total payable</span>
                            <span>₹{Booking.totalPrice}</span>
                        </div>
                    </div>

                    {/* Host Note */}
                    <div className="flex gap-3 rounded-2xl border border-teal-200 bg-teal-50 p-4 text-xs text-teal-900">
                        <MdInfoOutline className="text-lg mt-0.5" />
                        <p>
                            The host will confirm or update the payment option after
                            reviewing your booking request.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6">
                    <button
                        className={`w-full rounded-2xl ${loading ? "bg-black" : " bg-gradient-to-r from-teal-600 to-teal-700"}
        text-white py-3.5 flex justify-center items-center font-semibold tracking-wide
        hover:opacity-95 transition shadow-lg`}
                        onClick={() => FunctionNewbooking()}  >
                        {Booking.paymentMode == "online" ? (loading ? <LoaderOne /> : "Proceed to pay") : (loading ? <LoaderOne /> : "Confirm Booking")}
                    </button>
                </div>

            </div>
        </div>



    );
};

export default RoomPaymentModal;
