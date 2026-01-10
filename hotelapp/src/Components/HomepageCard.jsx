import Rating from "@mui/material/Rating";
import { motion, easeInOut } from "framer-motion";
import { FaRegHeart } from "react-icons/fa";
import React from "react";
import { Addapi } from "../ApiServices/crud/Adding";
import { toast } from "sonner";
import { Link } from "react-router";
import { useAddtowishlist } from "../ApiServices/tanstack/PropertyMethod";
import { ContextDatas } from "../Common/ContextWrapped";


const CardHome = ({ property, id }) => {

    const { token } = ContextDatas()
    // const FunAdd = async (data) => {
    //     const response = await Addapi({ data });
    //     if (response.status) {
    //         toast.success("Added to wishlist");
    //     }
    // };
    const { mutate: Addid } = useAddtowishlist(token)

    const Addtowishlist = (id) => {

        if (token) {
            Addid(id)
        } else {
            toast.warning("login to start exploring")
        }
    }

    return (
        <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeInOut }}
            className="w-full max-w-sm mx-auto cursor-pointer"
        >
            {/* IMAGE SECTION */}
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-200">
                <img
                    src={property.images[0].url}
                    alt={property.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />

                {/* Wishlist */}
                <button
                    onClick={() => Addtowishlist(property._id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow"
                >
                    <FaRegHeart className="text-lg text-rose-500" />
                </button>
            </div>

            {/* CONTENT */}
            <div className="mt-3 space-y-1">
                <div className="flex items-start justify-between">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                        {property.name}
                    </h3>

                    <div className="flex items-center gap-1">
                        <Rating
                            value={Number(property?.rating) || 0}
                            precision={0.5}
                            readOnly
                            size="small"
                        />
                    </div>
                </div>

                <p className="text-xs text-gray-500 line-clamp-1">
                    {property.location.city}
                </p>

                <p className="text-xs text-gray-500">
                    {property.roomsAvailable} rooms available
                </p>

                {/* PRICE */}
                <div className="flex items-center justify-between pt-1">
                    <p className="text-sm text-gray-900">
                        <span className="font-semibold">₹{property.price}</span>
                        <span className="text-gray-500"> / night</span>
                    </p>

                    <Link
                        to={`/roomdetail/${property._id}`}
                        className="text-sm font-medium underline hover:text-black"
                    >
                        View
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default CardHome;
