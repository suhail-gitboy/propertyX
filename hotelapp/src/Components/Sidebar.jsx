import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router";
import { FaBed, FaBath, FaStar, FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";
import "leaflet/dist/leaflet.css";


const Sidebar = ({ Hoteldata }) => {



  const houseIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/619/619032.png",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });

  const [location, setLocation] = useState([10.8505, 76.2711]);
  return (
    <div className="">
      <div>

        <div style={{ height: "100vh", width: "100%" }} className="rounded-lg">
          <MapContainer
            center={location}
            zoom={7}
            style={{ height: "100%", width: "100%" }}
            className="rounded-2xl"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {
              Hoteldata?.map((data, id) => (
                <Marker icon={houseIcon} key={id} position={[data.location.lat, data.location.lng]}>
                  <Popup className="">
                    <div className="lg:w-52 w-36 lg:h-auto h-48 rounded-2xl overflow-hidden shadow-xl bg-white p-2 transition-transform duration-200 hover:scale-105">

                      {/* Image */}
                      <img
                        src={data.images[0].url}
                        alt={data.title}
                        className="w-full lg:h-28 h-24 object-cover rounded-lg mb-2"
                      />

                      {/* Content */}
                      <div className="px-2 flex flex-col gap-1">

                        {/* Name */}
                        <h3 className="font-semibold text-sm lg:text-base text-gray-800 truncate">{data.name}</h3>

                        {/* Location & Rating */}
                        <div className="flex items-center justify-between text-gray-500 text-xs lg:text-sm">
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt className="text-red-500" /> {data.location.city}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaStar className="text-yellow-400" /> {data.rating}
                          </span>
                        </div>

                        {/* Price & Rooms */}
                        <div className="flex items-center justify-between text-gray-700 mt-1 text-sm">
                          <span className="flex items-center gap-1 font-semibold">
                            <FaRupeeSign className="text-green-600" /> {data.price}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaBed className="text-blue-500" /> {data.roomsAvailable} rooms
                          </span>
                        </div>

                        {/* View Details Button */}
                        <div className="flex justify-end mt-2">
                          <Link
                            to={`/roomdetail/${data._id}`}
                            className="px-3 py-1 bg-gray-100 text-white font-semibold text-xs rounded-lg hover:bg-gray-200 transition-colors duration-200"
                          >
                            View Details
                          </Link>
                        </div>

                      </div>
                    </div>

                  </Popup>
                </Marker>
              ))
            }
          </MapContainer>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
