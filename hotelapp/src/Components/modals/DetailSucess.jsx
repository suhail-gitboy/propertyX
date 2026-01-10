import React from 'react'
import { ContextDatas } from '../../Common/ContextWrapped'
import { useNavigate } from 'react-router'
import { CheckCircle } from "lucide-react";


const DetailSucess = () => {
    const Navigate = useNavigate()

    const { popUpinputsuccess, Setpopupinputsuccess, property, setProperty } = ContextDatas()
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl relative text-center">
                {/* Icon */}
                <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />

                {/* Heading */}
                <h2 className="text-2xl font-bold mb-3 text-gray-800">
                    Property Details Submitted!
                </h2>

                {/* Description */}
                <p className="text-gray-700 mb-6">
                    You have successfully completed your property details. Our team will review it, and you will receive a notification via <strong>WhatsApp</strong> and <strong>Email</strong> when your property is published by admin.
                </p>

                {/* OK Button */}
                <button
                    onClick={() => { Setpopupinputsuccess(false), Navigate("/") }}

                    className="mt-2 rounded-lg bg-green-500 px-6 py-2 text-white font-medium hover:bg-green-600 transition"
                >
                    OK
                </button>
            </div>
        </div>
    )
}

export default DetailSucess
