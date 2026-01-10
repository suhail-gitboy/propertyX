import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaHome } from "react-icons/fa";
import { ContextDatas } from "../Common/ContextWrapped";
import { useAllPropertiesAdmin, useGetallusers } from "./ApiTanstack/Propertyfetch";

const Adminhome = () => {

    const [approvedproperties, Setapprovedproperties] = useState(null)
    const [approvedHost, Setapprovedhost] = useState(null)
    const [pendingproperties, Setpendingproperties] = useState(null)


    const { token } = ContextDatas()

    const { data: userData } = useGetallusers(token)
    const { data: propertyData, isLoading, isError, error } = useAllPropertiesAdmin(token)


    useEffect(() => {
        Setapprovedproperties(propertyData?.filter(data => data.isActive == "approved"))
        const FilteredPending = propertyData?.filter((data) => data.isActive == "pending")
        Setpendingproperties(FilteredPending)
        Setapprovedhost(userData?.filter((data) => data.role == "host"))
    }, [userData, propertyData])
    return (
        <div className="w-full p-6 bg-gray-200 min-h-screen text-gray-900">
            {/* Page Title */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold mb-8 text-blue-900">
                    Admin Dashboard
                </h1>
                <Link to={"/"} className="flex items-center gap-2 text-blue-900 font-semibold"><FaHome />Home</Link>
            </div>

            {/* MAIN STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatBox title="Total Properties" value={propertyData?.length} />
                <StatBox title="Active Listings" value={approvedproperties?.length} />
                <StatBox title="Users & Hosts" value={userData?.length} />
                <StatBox title="Total Revenue" value="₹2,45,000" />
            </div>

            {/* MONTHLY STATS */}
            <h2 className="text-xl font-semibold mb-4 text-blue-900">
                Monthly Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <StatBox title="Monthly Bookings" value="185" />
                <StatBox title="Monthly Revenue" value="₹58,400" />
                <StatBox title="New Users (This Month)" value="96" />
            </div>

            {/* APPROVAL SECTION */}
            <h2 className="text-xl font-semibold mb-4 text-blue-900">
                Pending Approvals
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <ApprovalBox
                    title="approved properties"
                    count={approvedproperties?.length}
                    link="/admin/property-approvals"
                />
                <ApprovalBox
                    title="Host Approval"
                    count={approvedHost?.length}
                    link="/admin/host-approvals"
                />
            </div>

            {/* QUICK NAVIGATION */}
            <h2 className="text-xl font-semibold mb-4 text-blue-900">
                Quick Navigation
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <QuickLink label="Manage Properties" to="/admin/product" />
                <QuickLink label="Manage Users" to="/admin/user" />
                <QuickLink label="Manage Hosts" to="/admin/user" />
                <QuickLink label="Manage profile" to="/admin/profile" />
            </div>
        </div>
    );
};

/* ================= COMPONENTS ================= */

const StatBox = ({ title, value }) => (
    <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition">
        <h3 className="text-sm uppercase text-gray-600 mb-2">{title}</h3>
        <p className="text-3xl font-bold text-blue-900">{value}</p>
    </div>
);

const ApprovalBox = ({ title, count, link }) => (
    <div className="bg-gray-100 p-6 rounded-lg shadow flex justify-between items-center">
        <div>
            <h3 className="text-lg font-semibold text-blue-900">{title}</h3>
            <p className="text-2xl font-bold mt-2">{count}</p>
        </div>
        <Link
            to={link}
            className="text-sm text-blue-700 hover:underline font-medium"
        >
            Review →
        </Link>
    </div>
);

const QuickLink = ({ label, to }) => (
    <Link
        to={to}
        className="bg-blue-900 text-white text-center py-4 rounded-lg shadow hover:bg-blue-800 transition font-semibold"
    >
        {label}
    </Link>
);

export default Adminhome;
