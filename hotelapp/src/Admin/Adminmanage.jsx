import React, { use, useEffect, useState } from "react";
import { Link } from "react-router";
import { useAllPropertiesAdmin, useApproveProperty, useRejectApproval, useRemoveApproved } from "./ApiTanstack/Propertyfetch";
import { ContextDatas } from "../Common/ContextWrapped";

const Adminproductmanagement = () => {
    const { token } = ContextDatas()
    const [approvedproperties, Setapprovedproperties] = useState(null)
    const [pendingproperties, Setpendingproperties] = useState(null)

    const { data, isLoading, isError, error } = useAllPropertiesAdmin(token)
    const approvemutate = useApproveProperty(token);
    const Rejectapproval = useRejectApproval(token)
    const RemoveApproved = useRemoveApproved(token)

    const { property } = data || {}
    useEffect(() => {
        Setapprovedproperties(property?.filter(data => data.isActive == "approved"))
        const FilteredPending = property?.filter((data) => data.isActive == "pending")
        Setpendingproperties(FilteredPending)
    }, [data])
    console.log(approvedproperties);



    console.log("pending", pendingproperties);





    const handleApprove = (id) => {

        approvemutate.mutate(id);

    };

    const handleReject = (id) => {
        Rejectapproval.mutate(id)
    };

    const handleDelete = (id) => {
        if (window.confirm("Remove this property?")) {
            RemoveApproved.mutate(id)
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-200 p-6">
            <h1 className="text-3xl font-bold text-blue-900 mb-8">
                Property Management
            </h1>

            {/* ================= PENDING APPROVAL TABLE ================= */}
            <div className="bg-gray-100 rounded-lg shadow mb-12">
                <h2 className="text-xl font-semibold p-4 border-b text-blue-900">
                    Pending Property Approvals
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-300 uppercase text-gray-700">
                            <tr>
                                <th className="px-4 py-3">Property</th>
                                <th className="px-4 py-3">Owner</th>
                                <th className="px-4 py-3">Type</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingproperties?.map((item) => (
                                <tr
                                    key={item._id}
                                    className="border-b hover:bg-gray-200"
                                >
                                    <td className="px-4 py-3 font-medium">
                                        {item.title}
                                    </td>
                                    <td className="px-4 py-3">{item.seller.name}</td>
                                    <td className="px-4 py-3">{item.listingType}</td>
                                    <td className="px-4 py-3">{item.price}</td>
                                    <td className="px-4 py-3 text-center space-x-2">
                                        <button
                                            onClick={() => handleApprove(item._id)}
                                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(item._id)}
                                            className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ================= APPROVED PROPERTY CARDS ================= */}
            <h2 className="text-xl font-semibold mb-4 text-blue-900">
                Approved Properties
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {approvedproperties?.map((item) => (
                    <div
                        key={item._id}
                        className="bg-gray-100 rounded-lg shadow hover:shadow-md transition"
                    >
                        <img
                            src={item?.images[0].url}
                            alt={item?.title}
                            className="h-44 w-full object-cover rounded-t-lg"
                        />

                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-blue-900">
                                {item?.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {item.location.city}
                            </p>
                            <p className="text-sm text-gray-600">
                                host: {item.seller.name}
                            </p>
                            <p className="mt-2 font-medium">{item.price}</p>

                            <div className="flex justify-between items-center mt-4">
                                <Link
                                    to={`/roomdetail/${item._id}`}
                                    className="text-blue-700 hover:underline text-sm"
                                >
                                    View Details
                                </Link>

                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Adminproductmanagement;
