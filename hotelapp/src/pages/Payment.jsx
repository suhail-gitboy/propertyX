import React from 'react'

const Payment = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b px-6 py-4 flex items-center gap-3">
                <button className="text-xl">←</button>
                <h1 className="text-xl font-semibold">Confirm and pay</h1>
            </header>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Left Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Proceed to payment</h2>
                        <p className="text-gray-600 text-sm">
                            You’ll be redirected to a secure payment gateway to complete your booking.
                        </p>
                    </div>

                    <p className="text-sm text-gray-500">
                        By selecting the button below, you agree to our{" "}
                        <span className="underline cursor-pointer">booking terms</span>.
                    </p>

                    <button className="w-full md:w-auto bg-black text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition">
                        Continue to payment
                    </button>
                </div>

                {/* Right Section (Summary Card) */}
                <div className="border rounded-xl p-5 space-y-4 h-fit shadow-sm">

                    {/* Listing */}
                    <div className="flex gap-4">
                        <img
                            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
                            alt="room"
                            className="w-24 h-20 rounded-lg object-cover"
                        />
                        <div>
                            <h3 className="font-medium">One BHK Near City Hospital</h3>
                            <p className="text-sm text-gray-500">⭐ 4.8 (19 reviews)</p>
                        </div>
                    </div>

                    <hr />

                    {/* Cancellation */}
                    <div>
                        <p className="text-sm font-medium">Free cancellation</p>
                        <p className="text-sm text-gray-600">
                            Cancel before 18 January for a full refund.
                        </p>
                    </div>

                    <hr />

                    {/* Dates */}
                    <div className="flex justify-between text-sm">
                        <div>
                            <p className="font-medium">Dates</p>
                            <p className="text-gray-600">19–23 Jan 2026</p>
                        </div>
                        <button className="underline">Change</button>
                    </div>

                    {/* Guests */}
                    <div className="flex justify-between text-sm">
                        <div>
                            <p className="font-medium">Guests</p>
                            <p className="text-gray-600">1 adult</p>
                        </div>
                        <button className="underline">Change</button>
                    </div>

                    <hr />

                    {/* Price */}
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>4 nights × ₹2,546</span>
                            <span>₹10,184</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Taxes</span>
                            <span>₹509</span>
                        </div>
                    </div>

                    <hr />

                    {/* Total */}
                    <div className="flex justify-between font-semibold">
                        <span>Total (INR)</span>
                        <span>₹10,693</span>
                    </div>

                    <button className="text-sm underline mt-2">Price breakdown</button>
                </div>
            </div>
        </div>

    )
}

export default Payment
