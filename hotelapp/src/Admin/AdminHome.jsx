import React from "react";
import { Link } from "react-router";
import { FaHome, FaCity, FaMoneyBillWave, FaCrown, FaStar, FaUsers } from "react-icons/fa";
import { ContextDatas } from "../Common/ContextWrapped";
import { useAllPropertiesAdmin, useGetallusers } from "./ApiTanstack/Propertyfetch";
import { FaCalendarCheck } from "react-icons/fa";

const Adminhome = () => {
    const { token } = ContextDatas();
    const { data: userData } = useGetallusers(token);
    const { data } = useAllPropertiesAdmin(token);

    const {
        property: propertyData,
        tophosts,
        lastweakbooking,
        totalrevenue,
        topuser
    } = data || {};
    console.log(data);


    if (!data) return <>Loading...</>;

    return (
        <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
                <Link to="/" className="flex items-center gap-2 text-rose-600 font-medium">
                    <FaHome /> Home
                </Link>
            </div>

            {/* MAIN STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatBox title="Total Properties" value={propertyData?.length} icon={<FaHome />} />
                <StatBox title="Active Listings" value={propertyData?.filter(p => p.isActive === 'approved').length} icon={<FaCity />} />
                <StatBox title="Users & Hosts" value={userData?.length} icon={<FaUsers />} />
                <StatBox title="Weekly Revenue" value={`₹${totalrevenue?.[0]?.totalrevenue || 0}`} highlight icon={<FaMoneyBillWave />} />
            </div>

            <div className="flex  items-center flex-col md:flex-row gap-6 mb-10">
                <div className="w-full  md:w-2/6">
                    <div className="w-full flex flex-col gap-4 justify-center mt-6">
                        <div className="
        w-full 
        rounded-2xl
        bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700
        p-6
        text-white
        shadow-xl
        backdrop-blur-lg
      ">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold tracking-wide">
                                    Weekly Performance
                                </h2>
                                <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                                    Last 7 Days
                                </span>
                            </div>

                            {/* Metrics */}
                            <div className="flex flex-col gap-4">
                                {/* Total Bookings */}
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-purple-200">Total Bookings</p>
                                    <p className="text-3xl font-bold">{totalrevenue[0]?.totalbooking}</p>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-white/20" />

                                {/* Total Revenue */}
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-purple-200">Total Revenue</p>
                                    <p className="text-3xl font-bold">
                                        ₹{totalrevenue[0]?.totalrevenue.toLocaleString("en-IN")}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-rose-400 via-rose-500 to-rose-400 rounded-2xl p-6 shadow-lg text-white">

                            {/* Header */}
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-lg font-semibold">Top Users</h3>
                                <FaCrown className="text-yellow-300 text-xl" />
                            </div>

                            {/* Users List */}
                            <div className="space-y-4">
                                {topuser?.map((user, index) => {
                                    const image =
                                        typeof user.picture === "string"
                                            ? user.picture
                                            : user.picture?.url;

                                    return (
                                        <div
                                            key={user._id}
                                            className="flex items-center justify-between bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/20"
                                        >
                                            {/* Left */}
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={image}
                                                    alt={user.username}
                                                    className="w-11 h-11 rounded-full object-cover border-2 border-white"
                                                />

                                                <div>
                                                    <p className="font-semibold capitalize">
                                                        {user.username}
                                                    </p>
                                                    <p className="text-xs opacity-90">
                                                        User Rank #{index + 1}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Right */}
                                            <div className="text-right">
                                                <p className="text-xl font-bold">
                                                    {user.totalbooking}
                                                </p>
                                                <p className="text-xs opacity-90">
                                                    Bookings
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-4/6">
                    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        {/* HEADER */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-slate-800">
                                🔥 Leading hosts
                            </h2>
                        </div>

                        {/* ROW */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                            {tophosts?.map((item, index) => (
                                <div
                                    key={item.propertyId}
                                    className="relative  rounded-xl border border-slate-200 overflow-hidden bg-slate-50 hover:shadow-md transition"
                                >
                                    {/* RANK BADGE */}
                                    <div className="absolute top-3 left-3 z-10">
                                        <span className="flex items-center gap-1 bg-rose-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                                            <FaCrown />
                                            Top #{index + 1}
                                        </span>
                                    </div>

                                    {/* IMAGE */}
                                    <img
                                        src={item.image?.url}
                                        alt={item.title}
                                        className="h-44 w-full object-cover"
                                    />

                                    {/* CONTENT */}
                                    <div className="p-4 space-y-3">
                                        {/* TITLE */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-900 leading-tight">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-slate-500">
                                                by <span className="font-medium">{item.sellerName}</span>
                                            </p>
                                        </div>

                                        {/* RATING */}
                                        <div className="flex items-center gap-2">
                                            <FaStar className="text-yellow-400" />
                                            <span className="text-sm font-semibold text-slate-700">
                                                {item.avgRating} / 5
                                            </span>
                                        </div>

                                        {/* METRICS */}
                                        <div className="grid grid-cols-2 gap-4 pt-2">
                                            <Metric
                                                icon={<FaCalendarCheck />}
                                                label="Bookings"
                                                value={item.totalBookings}
                                            />
                                            <Metric
                                                icon={<FaMoneyBillWave />}
                                                label="Revenue"
                                                value={`₹${item.revenue}`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>



            </div>



            <div className="mt-10 flex items-center justify-center gap-6 mb-10">
                <div className="w-4/6">
                    <div className="w-full mt-8">
                        <div className="w-full mt-8">
                            <div className="rounded-2xl bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-800 p-6 text-white shadow-xl">

                                {/* Header */}
                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold tracking-wide">
                                        Top Hosts — Last Week
                                    </h2>
                                    <p className="text-sm text-purple-200">
                                        Based on confirmed bookings & revenue
                                    </p>
                                </div>

                                {/* Host List */}
                                <div className="flex flex-col gap-4">
                                    {lastweakbooking.map((host, index) => (
                                        <div
                                            key={host._id}
                                            className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/10 rounded-xl p-4 backdrop-blur-md"
                                        >
                                            {/* LEFT — Host */}
                                            <div className="flex items-center gap-4 min-w-[220px]">
                                                <div className="relative">
                                                    <img
                                                        src={host.hostImage?.url}
                                                        alt={host.hostName}
                                                        className="w-14 h-14 rounded-full object-cover border-2 border-white/30"
                                                    />
                                                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-yellow-400 text-purple-900 text-xs font-bold flex items-center justify-center">
                                                        {index + 1}
                                                    </span>
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-base">
                                                        {host.hostName}
                                                    </p>
                                                    <p className="text-xs text-purple-200">
                                                        Host
                                                    </p>
                                                </div>
                                            </div>

                                            {/* CENTER — Metrics */}
                                            <div className="flex gap-6">
                                                <div>
                                                    <p className="text-xs text-purple-200">Bookings</p>
                                                    <p className="text-lg font-bold">
                                                        {host.totalBookings}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-xs text-purple-200">Revenue</p>
                                                    <p className="text-lg font-bold">
                                                        ₹{host.revenue.toLocaleString("en-IN")}
                                                    </p>
                                                </div>
                                            </div>


                                            <div className="flex items-center gap-2">

                                                <img

                                                    src={
                                                        host.properties?.[0]?.picture?.[0]?.url ||
                                                        "https://cdn-icons-png.flaticon.com/512/684/684908.png"
                                                    }
                                                    alt={host.properties.title}
                                                    className="w-9 h-9 rounded-md object-cover border border-white/20"
                                                />

                                                {host.properties.length > 3 && (
                                                    <span className="text-xs text-purple-200">
                                                        +{host.properties.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>


            {/* QUICK NAV */}
            <h2 className="text-xl font-semibold mb-4">Quick Navigation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <QuickLink label="Manage Properties" to="/admin/product" />
                <QuickLink label="Manage Users" to="/admin/user" />
                <QuickLink label="Manage Hosts" to="/admin/user" />
                <QuickLink label="Admin Profile" to="/admin/profile" />
            </div>
        </div>
    );
};

export default Adminhome;

const StatBox = ({ title, value, highlight, icon }) => (
    <div className={`p-6 rounded-xl border shadow-sm flex items-center gap-4 ${highlight ? "bg-gradient-to-br from-rose-600 to-pink-600 text-white" : "bg-white border-slate-200"}`}>
        <div className="text-3xl">{icon}</div>
        <div>
            <h3 className="text-sm uppercase opacity-80 mb-2">{title}</h3>
            <p className="text-3xl font-semibold">{value}</p>
        </div>
    </div>
);



const QuickLink = ({ label, to }) => (
    <Link
        to={to}
        className="bg-white border border-slate-200 rounded-xl py-4 text-center font-medium text-rose-600 hover:bg-rose-50 transition"
    >
        {label}
    </Link>
);

const InsightCard = ({ title, icon, children, accent }) => {
    const colors = {
        rose: "bg-rose-50 text-rose-600",
        emerald: "bg-emerald-50 text-emerald-600",
        indigo: "bg-indigo-50 text-indigo-600",
    };

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${colors[accent]}`}>{icon}</div>
                <h3 className="font-semibold text-slate-800">{title}</h3>
            </div>
            <div className="space-y-3">{children}</div>
        </div>
    );
};

const Metric = ({ label, value, highlight }) => (
    <div className="flex justify-between items-center">
        <p className="text-sm text-slate-500">{label}</p>
        <p className={`text-sm font-semibold ${highlight ? "text-rose-600" : "text-slate-800"}`}>
            {value}
        </p>
    </div>
);
