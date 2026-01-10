import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";

// Custom marker icon
const houseIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/619/619032.png",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl:
    "https://toppng.com/uploads/preview/icons-logos-emojis-orange-location-icon-11553386112ofxvujhvy2.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const LocationPicker = ({ property, setProperty }) => {
  const [position, setPosition] = useState([10.5276, 76.2144]); // default
  const [results, setResults] = useState([]);

  // Update map marker if property.location changes externally
  useEffect(() => {
    if (property.location.lat && property.location.lng) {
      setPosition([property.location.lat, property.location.lng]);
    }
  }, [property.location.lat, property.location.lng]);

  // Search for places by name
  const searchPlace = async (query) => {
    if (!query) {
      setResults([]);
      return;
    }

    try {
      const res = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: { q: query, format: "json", addressdetails: 1, limit: 5 },
        }
      );
      setResults(res.data);
    } catch (err) {
      console.error("Error searching place:", err);
    }
  };

  // Select a search result
  const selectPlace = (item) => {
    const lat = parseFloat(item.lat);
    const lng = parseFloat(item.lon);

    setPosition([lat, lng]);
    setProperty((prev) => ({
      ...prev,
      location: { ...prev.location, lat, lng, address: item.display_name },
    }));
    setResults([]);
  };

  // Map click handler
  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);

        try {
          const res = await axios.get(
            "https://nominatim.openstreetmap.org/reverse",
            { params: { lat, lon: lng, format: "json" } }
          );
          const display_name = res.data.display_name || "";

          setProperty((prev) => ({
            ...prev,
            location: { ...prev.location, lat, lng, address: display_name },
          }));
        } catch (err) {
          console.error("Error reverse geocoding:", err);
        }
      },
    });
    return null;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Where is your property located?</h2>

      {/* Address Input */}
      <div className="relative">
        <input
          value={property.location.address}
          onChange={(e) =>
            setProperty((prev) => ({
              ...prev,
              location: { ...prev.location, address: e.target.value },
            }))
          }
          placeholder="Search city, area, or address"
          className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-1 focus:ring-black"
          onKeyUp={(e) => searchPlace(e.target.value)}
        />

        {/* Search Results */}
        {results.length > 0 && (
          <div className="absolute z-2 mt-1 w-full rounded-lg border bg-white shadow">
            {results.map((item) => (
              <button
                key={item.place_id}
                onClick={() => selectPlace(item)}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                {item.display_name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Map */}
      <MapContainer
        center={position}
        zoom={13}
        className="h-[400px] rounded-xl border"
      >
        <TileLayer
          attribution="© OpenStreetMap, © CartoDB"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Marker icon={houseIcon} position={position} />
        <MapClickHandler />
      </MapContainer>

      {/* Lat / Lng Display */}
      <div className="text-sm text-gray-600">
        Lat: {property.location.lat?.toFixed(5) || ""} | Lng:{" "}
        {property.location.lng?.toFixed(5) || ""}
      </div>
    </div>
  );
};

export default LocationPicker;
