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
        lastweekbooking,
        totalrevenue
    } = data || {};
    console.log(tophosts);


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

            <div className="flex  flex-col md:flex-row gap-6 mb-10">
                <div className="w-full bg-blue-600 md:w-1/6">
                </div>
                <div className="w-full bg-yellow-400 md:w-5/6">
                    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        {/* HEADER */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-slate-800">
                                🔥 Most Booked Properties (This Week)
                            </h2>
                        </div>

                        {/* ROW */}
                        <div className="flex flex-col md:flex-row gap-6">
                            {tophosts?.map((item, index) => (
                                <div
                                    key={item.propertyId}
                                    className="relative flex-1 rounded-xl border border-slate-200 overflow-hidden bg-slate-50 hover:shadow-md transition"
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
