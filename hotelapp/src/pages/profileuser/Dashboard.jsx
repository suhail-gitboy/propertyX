import React from 'react'
import { useGetbookings, useGetuserproperty } from '../../ApiServices/tanstack/PropertyMethod'
import { ContextDatas } from '../../Common/ContextWrapped'
import Rating from '@mui/material/Rating'
import { FaHome, FaCalendarCheck, FaStar } from "react-icons/fa";
import { FaHeart, FaMapMarkerAlt, FaBed, FaRulerCombined } from "react-icons/fa";
import { property } from 'lodash';
import { motion } from 'framer-motion';
import { Link } from 'react-router';




const Dashboard = () => {


    const { token, User } = ContextDatas()
    const { data: bookings } = useGetbookings(token)


    const { data } = useGetuserproperty(User._id)


    if (!data) return <>loading...</>



    return (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="min-h-screen bg-gray-50">
            <Header data={data} />

            <main className="mx-auto max-w-7xl px-5 py-6 space-y-6">
                <DashboardStats bookings={bookings} data={data} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <PropertiesSection data={data} />
                    </div>

                    <div className="space-y-6">
                        <BookingsSection />
                        <ReviewsSection data={data} />
                    </div>
                </div>
            </main>
        </motion.div>

    )
}

export default Dashboard





const DashboardStats = ({ data, bookings }) => {
    const totalProperties = data.length;

    const totalBookings = data.reduce(
        (sum, p) => sum + (p.bookings?.length || 0),
        0
    );

    const reviews = data.flatMap((p) => p.comments || []);
    const avgRating =
        reviews.length > 0
            ? (
                reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
            ).toFixed(1)
            : "0.0";

    const stats = [
        {
            label: "Properties",
            value: totalProperties,
            icon: FaHome,
            color: "text-blue-600",
            bg: "bg-blue-100",
        },
        {
            label: "Bookings",
            value: bookings?.length,
            icon: FaCalendarCheck,
            color: "text-green-600",
            bg: "bg-green-100",
            view: "view"
        },
        {
            label: "Avg Rating",
            value: avgRating,
            icon: FaStar,
            color: "text-yellow-500",
            bg: "bg-yellow-100",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <div
                        key={stat.label}
                        className="flex items-center gap-4 rounded-xl border border-blue-600/50 bg-white p-5 transition hover:shadow-md"
                    >
                        {/* Icon */}
                        <div
                            className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bg}`}
                        >
                            <Icon className={`text-2xl ${stat.color}`} />
                        </div>

                        {/* Text */}
                        <div>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-semibold text-gray-900">
                                    {stat.value}
                                </h3>
                                {stat.view && <Link to="/profile/bookings" className="text-sm text-indigo-600 text-sm hover:underline">View </Link>}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};












const Header = ({ data }) => (
    <header className="flex items-center justify-between bg-white border-b border-black/15 px-5 py-4">
        <h1 className="text-xl font-semibold">Host Dashboard</h1>
        <img
            src={data[0]?.seller?.picture.url}
            className="h-9 w-9 rounded-full"
        />
    </header>
);


const PropertiesSection = ({ data }) => (
    <section className="rounded-xl bg-white overflow-auto h-190 no-scrollbar  border border-black/20 p-5">
        <h2 className="font-semibold mb-4">Your Properties</h2>

        <div className="space-y-4  ">
            {
                data.length == 1 ? <PropertyRow property={data[0]} /> : data.length > 0 && 1 ? data.map((items) => (
                    <PropertyRow property={items} />
                )) : <div className=' flex justify-center  w-full  bg-blue-50'>
                    <div className=' bg-linear-to-r from-blue-600 via-blue-500 to-blue-900 rounded-md text-white p-8 rounded-md'>
                        <p className='text-center py-3'>you havent published your property yet</p>
                        <div className='flex justify-center'>
                            <Link to="/property/host" className="mt-3 px-3 py-2 rounded-md text-blue-600 bg-white flex items-center  ">publish<FaHome className='ml-2' /> </Link>
                        </div>


                    </div>
                </div>
            }

        </div>
    </section>
)


export const PropertyRow = ({ property }) => {

    const Reviewrating = property.comments.reduce((prev, s) => prev + s.rating, 0) / property.comments.length
    return (
        <div className="overflow-hidden rounded-2xl border border-blue-500/25 bg-white shadow-sm transition hover:shadow-md">

            {/* Image */}
            <div className="relative h-48">
                <img
                    src={property?.images?.[0]?.url}
                    alt={property?.title}
                    className="h-full w-full object-cover"
                />

                {/* Status Badge */}
                <span className="absolute top-3 left-3 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                    {property.isActive}
                </span>

                {/* Likes */}
                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs">
                    <FaHeart className="text-rose-500" />
                    {property?.likes?.length}
                </div>
            </div>

            {/* Content */}
            <div className="space-y-3 p-5">

                {/* Title + Price */}
                <div className="flex items-start justify-between gap-2">
                    <h3 className="truncate text-lg font-semibold text-slate-800">
                        {property.title}
                    </h3>
                    <span className="text-sm font-semibold text-indigo-600">
                        ₹{property.price.toLocaleString()}
                    </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <FaMapMarkerAlt className="text-indigo-500" />
                    <span className="truncate">
                        {property.location?.city}, {property.location?.pincode}
                    </span>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                        <FaBed className="text-slate-500" />
                        {property.roomsAvailable} Rooms
                    </div>

                    <div className="flex items-center gap-1">
                        <FaRulerCombined className="text-slate-500" />
                        {property.squareFeet} sqft
                    </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                    <Rating value={Number(Reviewrating)} precision={0.5} readOnly size="small" />
                    <span className="text-xs text-slate-500">
                        ({property.comments.length} reviews)
                    </span>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-between border-t pt-3 text-sm">
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${property.isAvailable
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                            }`}
                    >
                        {property.isAvailable ? "Available" : "Unavailable"}
                    </span>

                    <div className="flex items-center gap-5">
                        <Link to={`/roomdetail/${property._id}`} className="font-medium text-rose-600 hover:underline">
                            view
                        </Link>
                        <Link to={`/editproperty/${property._id}`} className="font-medium text-indigo-600 hover:underline">
                            Manage
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}


const BookingsSection = () => (
    <section className="rounded-xl bg-white border border-black/15 p-5">
        <h2 className="font-semibold mb-4">Recent Bookings</h2>

        <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
                <span>John – 2 nights</span>
                <span className="text-gray-500">₹6,400</span>
            </li>
            <li className="flex justify-between">
                <span>Sarah – 1 night</span>
                <span className="text-gray-500">₹3,200</span>
            </li>
        </ul>
    </section>
);
const ReviewsSection = ({ data }) => {

    const comments = data?.flatMap((comments) => comments.comments)



    return (
        <section className="rounded-xl bg-white border border-black/10 p-5">
            <h2 className="font-semibold mb-4">Latest Reviews</h2>

            <ul className="space-y-4">
                {comments?.map((comment) => (
                    <li
                        key={comment._id}
                        className="w-full max-w-md overflow-hidden rounded-lg border-black/10 bg-gray-50 p-4"
                    >
                        {/* Top row: avatar + name + rating */}
                        <div className="flex items-center gap-3">
                            <img
                                src={comment?.picture?.url}
                                alt={comment?.name}
                                className="h-10 w-10 rounded-full object-cover"
                            />

                            <div className="flex-1 overflow-hidden">
                                <p className="truncate font-medium text-gray-900">
                                    {comment?.name}
                                </p>

                                <Rating
                                    value={comment?.rating}
                                    precision={0.5}
                                    readOnly
                                    size="small"
                                />
                            </div>
                        </div>

                        {/* Comment text */}
                        <p className="mt-2 line-clamp-3 text-sm text-gray-700">
                            {comment?.text}
                        </p>

                        {/* Date */}
                        <p className="mt-1 text-xs text-gray-400">
                            {new Date(comment?.createdAt).toLocaleDateString()}
                        </p>
                    </li>
                ))}
            </ul>
        </section>

    );
};

{/* <div className="flex gap-4 items-center" >
    <img
        src={data.length == 1 ? data[0].images[0].url : data.images[0].url}
        className="h-20 w-28 rounded-lg object-cover"
    />
    <div className="flex-1">
        <h3 className="font-medium">{data.title}</h3>
        <p className="text-sm text-gray-500">{data.location.city} • Active</p>
    </div>
    <button className="text-sm underline">Manage</button>
</div > */}