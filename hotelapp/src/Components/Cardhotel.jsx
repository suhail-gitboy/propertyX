import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { Rating } from "@mui/material";
import React from "react";

const PropertyCard = ({ data, grid = 2, type = "sell", id }) => {
  // calculate average rating
  const avgRating =
    data?.comments?.length > 0
      ? data.comments.reduce((sum, c) => sum + c.rating, 0) / data.comments.length
      : 0;

  return (
    <motion.div
      key={id}
      initial={{ scale: 0.95, opacity: 0.3, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`${grid === 3 ? "flex flex-col" : "flex flex-row"
        } w-full mb-4 mx-auto bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative`}
    >
      {/* Image */}
      <div className={`${grid === 3 ? "w-full" : "w-1/2"}`}>
        <img
          src={data.images[0]?.url || "https://via.placeholder.com/400x300"}
          alt={data.title}
          className="w-full h-64 md:h-60 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div
        className={`${grid === 3 ? "w-full" : "w-1/2"
          } p-5 flex flex-col justify-between relative`}
      >
        <div className="mt-8">
          <h2 className="text-md md:text-xl font-semibold text-gray-900 truncate">
            {data.title}
          </h2>
          <p className="text-gray-500 text-sm mt-1 truncate">{data.location.address}</p>

          <div className="flex items-center mt-3">
            <Rating
              name="read-only"
              value={avgRating}
              precision={0.5}
              readOnly
              size="small"
            />
            <span className="ml-4 text-gray-500 text-sm">
              {type === "rent"
                ? `${data.roomsAvailable} Room(s)`
                : `${data.roomsAvailable} Sq.Ft`}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-black font-bold text-sm md:text-xl">
            ₹{data.price.toLocaleString()}
          </span>
          <Link
            to={`/roomdetail/${data._id}`}
            className="bg-blue-500 text-white text-xs md:text-sm px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Book Now
          </Link>
        </div>

        {/* Favorite Heart */}
        <div className="absolute top-3 left-3 bg-white p-2 rounded-full shadow hover:shadow-md transition-shadow duration-200">
          <FaRegHeart className="text-red-500 text-xl hover:text-red-600 transition-colors duration-200" />
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
