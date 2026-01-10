import React from "react";
import { PropertyRow } from "./Dashboard";
import { ContextDatas } from "../../Common/ContextWrapped";
import { useGetuserproperty } from "../../ApiServices/tanstack/PropertyMethod";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaHome } from "react-icons/fa";


const PropertiesGrid = () => {
    const { User } = ContextDatas()



    const { data } = useGetuserproperty(User._id)

    return (
        <motion.section initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-4 p-4">
            <h2 className="text-lg font-semibold">Your Properties</h2>


            {data?.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{data?.map((property) => (
                <PropertyRow property={property} />
            ))}</div> : <>   <div className=' flex justify-center h-screen w-full items-center bg-blue-50'>
                <div className=' bg-linear-to-r from-blue-600 via-blue-500 to-blue-900 rounded-md text-white p-8 rounded-md'>
                    <p className='text-center py-3'>you havent published your property yet</p>
                    <div className='flex justify-center'>
                        <Link to="/property/host" className="mt-3 px-3 py-2 rounded-md text-blue-600 bg-white flex items-center  ">publish<FaHome className='ml-2' /> </Link>
                    </div>


                </div>
            </div></>}

        </motion.section>
    );
};

export default PropertiesGrid;

const PropertyCard = ({ property }) => {
    return (
        <div className="rounded-xl overflow-hidden border bg-white">
            {/* Image */}
            <div className="relative h-44">
                <img
                    src={property.image}
                    alt={property.title}
                    className="h-full w-full object-cover"
                />

                <span
                    className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-medium
            ${property.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : property.status === "Paused"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-blue-100 text-blue-700"
                        }`}
                >
                    {property.status}
                </span>
            </div>

            {/* Content */}
            <div className="p-4 space-y-1">
                <h3 className="font-medium truncate">
                    {property.title}
                </h3>
                <p className="text-sm text-gray-500">
                    {property.location}
                </p>
                <p className="text-sm font-medium">
                    {property.price}
                </p>

                <button className="mt-3 w-full rounded-lg border py-2 text-sm font-medium hover:bg-gray-50">
                    Edit Property
                </button>
            </div>
        </div>
    );
};
