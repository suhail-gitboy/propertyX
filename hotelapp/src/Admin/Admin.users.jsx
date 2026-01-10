import React from "react";
import { toast } from "sonner";
import { useGetallusers } from "./ApiTanstack/Propertyfetch";
import { ContextDatas } from "../Common/ContextWrapped";
import { formatDate, timeAgo } from "../Utils/UILIBRARY/Realtime";
import { Link } from "react-router";

const Adminuserpage = () => {



    const { token } = ContextDatas()

    const { data } = useGetallusers(token)

    console.log(data);


    const handleDelete = (id) => {
        if (window.confirm("Remove this user?")) {
            toast.error("User removed");
        }
    };

    const handleNotify = (id) => {
        toast.success("Notification sent to user");
    };

    return (
        <div className="w-full min-h-screen bg-gray-200 p-6">
            <h1 className="text-3xl font-bold mb-8 text-blue-900">
                User & Host Listing
            </h1>

            <div className="bg-gray-100 h-150 rounded-lg shadow overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-300 text-gray-700 uppercase">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">joined</th>
                            <th className="px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data?.map((user) => (
                            <tr
                                key={user._id}
                                className="border-b hover:bg-gray-200 transition"
                            >
                                <td className="px-4 py-3 font-medium"><div className="flex gap-2 items-center"><img className="h-10 w-10 rounded-full" src={typeof user?.picture == "string" ? user?.picture : user?.picture?.url} alt="" /><p>{user?.name}</p></div></td>
                                <td className="px-4 py-3">{user?.email}</td>
                                <td className={`px-4 py-3 flex items-center gap-2 `}><p className={`text-white ${user.role == "host" ? "bg-linear-to-b from-yellow-400  to-blue-600" : "bg-blue-400"}  px-1 py-1 rounded-md`}>{user?.role} </p>{user?.role == "host" && <Link to={`/host/${user._id}/profile`} className="text-blue-700">View user</Link>}</td>
                                <td className="px-4 py-3"> {timeAgo(user?.updatedAt)}</td>

                                <td className="px-4 py-3 text-center space-x-2">
                                    <button
                                        onClick={() => handleNotify(user._id)}
                                        className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800"
                                    >
                                        Notify
                                    </button>

                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {data?.length === 0 && (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center py-6 text-gray-500"
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
