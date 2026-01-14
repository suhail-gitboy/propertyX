import React from "react";
import { Link } from "react-router";
import {
    FaHome,
    FaCity,
    FaMoneyBillWave,
    FaCrown,
    FaStar,
} from "react-icons/fa";
import { ContextDatas } from "../Common/ContextWrapped";
import { useAllPropertiesAdmin, useGetallusers } from "./ApiTanstack/Propertyfetch";

const Adminhome = () => {
    const { token } = ContextDatas();
    const { data: userData } = useGetallusers(token);
    const { data } = useAllPropertiesAdmin(token);
    const {
        property: propertyData,
        tophosts,
        lastweakbooking,
        totalrevenue
    } = data || {};

    console.log(tophosts);

    if (!data) {
        return <>loading...</>
    }


    return (
        <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
                <Link
                    to="/"
                    className="flex items-center gap-2 text-rose-600 font-medium"
                >
                    <FaHome /> Home
                </Link>
            </div>

            {/* FIRST ROW – MAIN STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatBox title="Total Properties" value={propertyData?.length} />
                <StatBox title="Active Listings" value="128" />
                <StatBox title="Users & Hosts" value={userData?.length} />
                <StatBox title="Weakly Revenue" value="₹2,45,000" highlight />
            </div>

            {/* SINGLE ROW – INSIGHTS (3 BOXES ONLY) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <MostBookedCities />
                <PlatformRevenue />
                <TopHostCompact />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div></div>
                <div></div>
                <div></div>
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






const StatBox = ({ title, value, highlight }) => (
    <div
        className={`p-6 rounded-xl border shadow-sm ${highlight
            ? "bg-gradient-to-br from-rose-600 to-pink-600 text-white"
            : "bg-white border-slate-200"
            }`}
    >
        <h3 className="text-sm uppercase opacity-80 mb-2">{title}</h3>
        <p className="text-3xl font-semibold">{value}</p>
    </div>
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
                <div className={`p-2 rounded-lg ${colors[accent]}`}>
                    {icon}
                </div>
                <h3 className="font-semibold text-slate-800">{title}</h3>
            </div>
            <div className="space-y-3">{children}</div>
        </div>
    );
};


const Metric = ({ label, value, highlight }) => (
    <div className="flex justify-between items-center">
        <p className="text-sm text-slate-500">{label}</p>
        <p
            className={`text-sm font-semibold ${highlight ? "text-rose-600" : "text-slate-800"
                }`}
        >
            {value}
        </p>
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


const TopHostCompact = () => (
    <InsightCard
        title="Top Host"
        icon={<FaCrown />}
        accent="indigo"
    >
        <div className="flex items-center gap-3 mb-3">
            <img
                src="https://i.pravatar.cc/100?img=15"
                className="h-10 w-10 rounded-full border"
                alt=""
            />
            <div>
                <p className="font-semibold text-slate-800">Alex Johnson</p>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                    <FaStar className="text-yellow-400" /> 4.9 Rating
                </p>
            </div>
        </div>

        <Metric label="Total Bookings" value="342" />
        <Metric label="Revenue" value="₹4.8L" />
        <Metric label="Active Listings" value="12" />
    </InsightCard>
);
const PlatformRevenue = () => (
    <InsightCard
        title="Platform Revenue"
        icon={<FaMoneyBillWave />}
        accent="emerald"
    >
        <Metric label="This Month" value="₹58,400" />
        <Metric label="Last Month" value="₹46,200" />
        <Metric label="Growth" value="+26%" highlight />
    </InsightCard>
);
const MostBookedCities = () => (
    <InsightCard
        title="Most Booked Cities"
        icon={<FaCity />}
        accent="rose"
    >
        <Metric label="Bangalore" value="128" />
        <Metric label="Mumbai" value="96" />
        <Metric label="Delhi" value="74" />
    </InsightCard>
);
