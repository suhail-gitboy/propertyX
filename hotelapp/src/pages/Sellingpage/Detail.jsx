import React from "react";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Home,
    Layers,
    BedDouble,
    DollarSign,
    PenIcon,
} from "lucide-react";


const PropertyDetailsForm = ({ property, setProperty }) => {



    const OnclickFunctionamenity = (value) => {


        var amenities = property.amenities

        if (property.amenities?.includes(value)) {
            setProperty((prev) => ({ ...prev, amenities: amenities.filter(data => data !== value) }))
        } else {
            amenities?.push(value)
            setProperty((prev) => ({ ...prev, amenities: amenities }))
        }
        console.log(property.amenities);



    }

    return (
        <div className="mx-auto max-w-3xl px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
            <h1 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">Property Information</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

                {/* Phone Number */}
                <div className="space-y-1">
                    <label className="text-sm text-gray-600">Phone Number</label>
                    <div className="flex items-center gap-2 sm:gap-3 rounded-lg border border-gray-200 px-2 sm:px-3 py-2 focus-within:border-black">
                        <Phone size={16} className="text-gray-400" />
                        <input
                            value={property.seller.sellerPhone}
                            onChange={(e) =>
                                setProperty({
                                    ...property,
                                    seller: { ...property.seller, sellerPhone: e.target.value },
                                })
                            }
                            type="text"
                            placeholder="10-digit mobile number"
                            className="w-full bg-transparent text-sm sm:text-base outline-none"
                        />
                    </div>
                </div>

                {/* Pincode */}
                <div className="space-y-1">
                    <label className="text-sm text-gray-600">Pincode</label>
                    <div className="flex items-center gap-2 sm:gap-3 rounded-lg border border-gray-200 px-2 sm:px-3 py-2 focus-within:border-black">
                        <MapPin size={16} className="text-gray-400" />
                        <input
                            value={property.location.pincode}
                            onChange={(e) =>
                                setProperty({
                                    ...property,
                                    location: { ...property.location, pincode: e.target.value },
                                })
                            }
                            type="text"
                            placeholder="Area pincode"
                            className="w-full bg-transparent text-sm sm:text-base outline-none"
                        />
                    </div>
                </div>

                {/* Price */}
                <div className="space-y-1">
                    <label className="text-sm text-gray-600">Price</label>
                    <div className="flex items-center gap-2 sm:gap-3 rounded-lg border border-gray-200 px-2 sm:px-3 py-2 focus-within:border-black">
                        <DollarSign size={16} className="text-gray-400" />
                        <input
                            value={property.price}
                            onChange={(e) => setProperty({ ...property, price: e.target.value })}
                            type="text"
                            placeholder="Enter the price"
                            className="w-full bg-transparent text-sm sm:text-base outline-none"
                        />
                    </div>
                </div>

                {/* City */}
                <div className="space-y-1">
                    <label className="text-sm text-gray-600">City</label>
                    <div className="flex items-center gap-2 sm:gap-3 rounded-lg border border-gray-200 px-2 sm:px-3 py-2 focus-within:border-black">
                        <MapPin size={16} className="text-gray-400" />
                        <input
                            value={property.location.city}
                            onChange={(e) =>
                                setProperty({
                                    ...property,
                                    location: { ...property.location, city: e.target.value },
                                })
                            }
                            type="text"
                            placeholder="Enter the accurate city"
                            className="w-full bg-transparent text-sm sm:text-base outline-none"
                        />
                    </div>
                </div>

                {/* Property Name */}
                <div className="space-y-1 sm:col-span-2">
                    <label className="text-sm text-gray-600">Property Name</label>
                    <div className="flex items-center gap-2 sm:gap-3 rounded-lg border border-gray-200 px-2 sm:px-3 py-2 focus-within:border-black">
                        <Home size={16} className="text-gray-400" />
                        <input
                            value={property.title}
                            onChange={(e) => setProperty({ ...property, title: e.target.value })}
                            type="text"
                            placeholder="Property title"
                            className="w-full bg-transparent text-sm sm:text-base outline-none"
                        />
                    </div>
                </div>

                {/* Conditional Field: Total Area */}
                {property.listingType === "sell" && (
                    <div className="space-y-1">
                        <label className="text-sm text-gray-600">Total Area (sq ft)</label>
                        <div className="flex items-center gap-2 sm:gap-3 rounded-lg border border-gray-200 px-2 sm:px-3 py-2 focus-within:border-black">
                            <Layers size={16} className="text-gray-400" />
                            <input
                                value={property.squareFeet}
                                onChange={(e) => setProperty({ ...property, squareFeet: e.target.value })}
                                type="text"
                                placeholder="Eg: 1200"
                                className="w-full bg-transparent text-sm sm:text-base outline-none"
                            />
                        </div>
                    </div>
                )}

                {/* Rooms */}
                <div className="space-y-1">
                    <label className="text-sm text-gray-600">Rooms Available</label>
                    <div className="flex items-center gap-2 sm:gap-3 rounded-lg border border-gray-200 px-2 sm:px-3 py-2 focus-within:border-black">
                        <BedDouble size={16} className="text-gray-400" />
                        <input
                            value={property.roomsAvailable}
                            onChange={(e) => setProperty({ ...property, roomsAvailable: e.target.value })}
                            type="text"
                            placeholder="Eg: 2"
                            className="w-full bg-transparent text-sm sm:text-base outline-none"
                        />
                    </div>
                </div>

                {/* Amenities */}
                <div className="w-full mt-4 sm:col-span-2">
                    <details className="group w-full rounded-lg border">
                        <summary className="flex w-full cursor-pointer items-center justify-between px-4 py-3 font-medium">
                            Amenities
                            <span className="text-sm text-gray-500 group-open:hidden">Show</span>
                            <span className="text-sm text-gray-500 hidden group-open:block">Hide</span>
                        </summary>

                        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 px-4 pb-4">
                            {[
                                "WiFi",
                                "Parking",
                                "Swimming Pool",
                                "Air Conditioning",
                                "Kitchen",
                                "TV",
                                "Washing Machine",
                                "Power Backup",
                            ].map((item) => (
                                <div
                                    key={item}
                                    onClick={() => OnclickFunctionamenity(item)}
                                    className="flex items-center gap-2 sm:gap-3 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                                >
                                    <div
                                        className={`h-4 w-4 ${property.amenities.includes(item) ? "bg-black" : "bg-white"
                                            } rounded border shrink-0`}
                                    ></div>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </details>
                </div>

                {/* Property Details Textarea */}
                <div className="space-y-1 sm:col-span-2">
                    <label className="text-sm text-gray-600">Property Details</label>
                    <div className="flex items-start gap-2 sm:gap-3 rounded-lg border px-2 sm:px-3 py-2 focus-within:border-black">
                        <PenIcon size={16} className="text-gray-400 mt-1" />
                        <textarea
                            value={property.description}
                            onChange={(e) => setProperty({ ...property, description: e.target.value })}
                            rows={4}
                            placeholder="Tell about property..."
                            className="w-full bg-transparent text-sm sm:text-base outline-none resize-none"
                        />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PropertyDetailsForm;


//     title: "",
//     description: "",
//     propertyType: "",
//     listingType: "",
//     price: "",
//     description: "",
//     squareFeet: null,
//     roomsAvailable: null,
//     rentPeriod: "",
//     amenities: [],
//     // 👈 ARRAY HERE
//     seller: {
//       sellerId: "",
//       sellerName: "",
//       sellerEmail: "",
//       sellerPhone: ""

//     },
//     location: {
//       address: "",
//       city: "",
//       pincode: "",
//       lat: "",
//       lng: "",
//     },
//     images: [],
//   });
// // 