import React, { useState } from "react";
import { toast } from "sonner";
import { useGetallusers } from "./ApiTanstack/Propertyfetch";
import { ContextDatas } from "../Common/ContextWrapped";
import { timeAgo } from "../Utils/UILIBRARY/Realtime";
import { Link } from "react-router";
import NotifyUsersByStateModal from "./Notify";

const Adminuserpage = () => {
    const { token } = ContextDatas();
    const { data } = useGetallusers(token);
    const [datas, setData] = useState({
        state: "",
        subject: "",
        message: "",
        email: ""
    });

    const handleDelete = () => {
        toast.error("User removed");
    };

    const handleNotify = (email) => {
        setData({ ...datas, email: email })
        Setnotify(true)


    };
    const [notfy, Setnotify] = useState(false)
    return (


        <div className="min-h-screen bg-slate-50 p-6">
            {notfy && <NotifyUsersByStateModal data={datas} setData={setData} onClose={() => Setnotify(false)} />}
            {/* Page Title */}
            <h1 className="text-3xl font-semibold text-slate-900 mb-6">
                Users & Hosts
            </h1>

            {/* Table Card */}
            <div className="bg-white relative rounded-xl shadow-sm border border-slate-200 h-140 overflow-auto">
                <table className="w-full text-sm text-left ">
                    {/* Table Header */}
                    <thead className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                        <tr>
                            <th className="px-6 py-4 font-medium">User</th>
                            <th className="px-6 py-4 font-medium">Email</th>
                            <th className="px-6 py-4 font-medium">Role</th>
                            <th className="px-6 py-4 font-medium">Last Updated</th>
                            <th className="px-6 py-4 font-medium text-center">Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y divide-slate-100 ">
                        {data?.map((user) => (
                            <tr
                                key={user._id}
                                className="hover:bg-slate-50 transition"
                            >
                                {/* User */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={
                                                typeof user?.picture === "string"
                                                    ? user?.picture
                                                    : user?.picture?.url
                                            }
                                            className="h-10 w-10 rounded-full object-cover border"
                                            alt=""
                                        />
                                        <p className="font-medium text-slate-800">
                                            {user?.name}
                                        </p>
                                    </div>
                                </td>

                                {/* Email */}
                                <td className="px-6 py-4 text-slate-600">
                                    {user?.email}
                                </td>

                                {/* Role */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${user.role === "host"
                                                    ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white"
                                                    : "bg-blue-100 text-blue-700"
                                                }`}
                                        >
                                            {user.role}
                                        </span>

                                        {user.role === "host" && (
                                            <Link
                                                to={`/host/${user._id}/profile`}
                                                className="text-indigo-600 hover:underline text-xs"
                                            >
                                                View profile
                                            </Link>
                                        )}
                                    </div>
                                </td>

                                {/* Time */}
                                <td className="px-6 py-4 text-slate-500">
                                    {timeAgo(user?.updatedAt)}
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 text-center space-x-2">
                                    <button
                                        onClick={() => handleNotify(user?.email)}
                                        className="px-3 py-1.5 rounded-md text-xs font-medium
                    bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition"
                                    >
                                        Notify
                                    </button>

                                    <button
                                        onClick={handleDelete}
                                        className="px-3 py-1.5 rounded-md text-xs font-medium
                    bg-red-50 text-red-600 hover:bg-red-100 transition"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {data?.length === 0 && (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center py-10 text-slate-500"
                                >
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Adminuserpage;
