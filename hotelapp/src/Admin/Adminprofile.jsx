import React, { useEffect, useState } from "react";
import { ContextDatas } from "../Common/ContextWrapped";
import EdituserAdmin from "./EditModal";

const AdminProfile = () => {

    const [modaledit, Setmodal] = useState(false)
    const { SetUser, User } = ContextDatas()



    const [userDetails, SetuserDetails] = useState({
        name: "",
        email: "",
        picture: "",
        password: "",
        phone: "",
        newPassword: ""


    })

    useEffect(() => {
        SetuserDetails({
            name: User?.name,
            email: User?.email,
            picture: User?.picture,
            phone: User?.phone
        })

    }, [User])
    return (
        <div className="w-full min-h-screen bg-gray-200 p-6">
            {modaledit && <EdituserAdmin userDetails={userDetails} SetuserDetails={SetuserDetails} User={User} Setmodal={Setmodal} />}
            <h1 className="text-3xl font-bold text-blue-900 mb-8">
                Admin Profile
            </h1>

            {/* PROFILE CARD */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT PROFILE */}
                <div className="bg-gray-100 rounded-xl shadow p-6 flex flex-col items-center text-center">
                    <img
                        src={
                            typeof User?.picture === "string"
                                ? User.picture
                                : User?.picture?.url
                        }
                        alt="Admin"
                        className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-blue-900"
                    />

                    <h2 className="text-xl font-semibold text-blue-900">
                        {User?.name}
                    </h2>
                    <p className="text-gray-600">{User?.email}</p>

                    <div className="flex gap-2 mt-3">
                        <span className="bg-blue-900 text-white text-xs px-3 py-1 rounded-full">
                            {User?.role}
                        </span>
                        <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                            Active
                        </span>
                    </div>

                    <button onClick={() => Setmodal(true)} className="mt-6 bg-blue-900 text-white px-5 py-2 rounded-md hover:bg-blue-800 transition">
                        Edit Profile
                    </button>
                </div>

                {/* RIGHT DETAILS */}
                <div className="lg:col-span-2 bg-gray-100 rounded-xl shadow p-6">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">
                        Account Details
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Detail label="Full Name" value={User?.name} />
                        <Detail label="Email Address" value={User?.email} />
                        <Detail label="Role" value={User?.role} />
                        <Detail label="Member Since" value={"01-01-2026"} />
                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-wrap gap-4 mt-8">
                        <button onClick={() => Setmodal(true)} className="bg-blue-900 text-white px-5 py-2 rounded-md hover:bg-blue-800">
                            Change Password
                        </button>
                        <button className="bg-gray-600 text-white px-5 py-2 rounded-md hover:bg-gray-700">
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* QUICK STATS */}
            <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <StatBox label="Total Users" value="1,820" />
                <StatBox label="Total Properties" value="420" />
                <StatBox label="Total Revenue" value="₹2.4L" />
            </div>
        </div>
    );
};

/* ========== COMPONENTS ========== */

const Detail = ({ label, value }) => (
    <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-800">{value}</p>
    </div>
);

const StatBox = ({ label, value }) => (
    <div className="bg-gray-100 rounded-lg shadow p-5 text-center">
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-blue-900 mt-1">{value}</p>
    </div>
);

export default AdminProfile;


