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
        <div className="mx-auto max-w-3xl px-4 py-10">
            <h1 className="text-2xl font-semibold mb-8">Property Information</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                {/* Email */}


                {/* Phone Number */}
                <div className="space-y-1">
                    <label className="text-sm text-gray-600">Phone Number</label>
                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2 focus-within:border-black">
                        <Phone size={18} className="text-gray-400" />
                        <input
                            value={property.seller.sellerPhone}
                            onChange={(e) => setProperty({
                                ...property, seller: {
                                    ...property.seller, sellerPhone: e.target.value
                                }
                            })}
                            type="text"
                            placeholder="10-digit mobile number"
                            className="w-full bg-transparent text-sm outline-none"
                        />
                    </div>
                </div>

                {/* Pincode */}
                <div className="space-y-1">
                    <label className="text-sm text-gray-600">Pincode</label>
                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2 focus-within:border-black">
                        <MapPin size={18} className="text-gray-400" />
                        <input
                            value={property.location.pincode}
                            onChange={(e) => setProperty({
                                ...property, location: {
                                    ...property.location, pincode: e.target.value
                                }
                            })}
                            type="text"
                            placeholder="Area pincode"
                            className="w-full bg-transparent text-sm outline-none"
                        />
                    </div>
                </div>

                {/* Price */}
                <div className="space-y-1">
                    <label className="text-sm text-gray-600">Price</label>
                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2 focus-within:border-black">
                        <DollarSign size={18} className="text-gray-400" />
                        <input
                            value={property.price}
                            onChange={(e) => setProperty({
                                ...property, price: e.target.value
                            }
                            )}
                            type="text"
                            placeholder="Enter the price"
                            className="w-full bg-transparent text-sm outline-none"
                        />
                    </div>
                </div>

                {/* City */}
                <div className="space-y-1">
                    <label className="text-sm text-gray-600">City</label>
                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2 focus-within:border-black">
                        <MapPin size={18} className="text-gray-400" />
                        <input
                            value={property.location.city}
                            onChange={(e) => setProperty({
                                ...property, location: {
                                    ...property.location,
                                    city: e.target.value
                                }
                            })}
                            type="text"
                            placeholder="Enter the accurate city"
                            className="w-full bg-transparent text-sm outline-none"
                        />
                    </div>
                </div>

                {/* Property Name */}
                <div className="space-y-1">
                    <label className="text-sm text-gray-600">Property Name</label>
                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2 focus-within:border-black">
                        <Home size={18} className="text-gray-400" />
                        <input
                            value={property.title}
                            onChange={(e) => setProperty({
                                ...property, title: e.target.value
                            }
                            )}
                            type="text"
                            placeholder="Property title"
                            className="w-full bg-transparent text-sm outline-none"
                        />
                    </div>
                </div>
                {/* Property Name */}
                {/* <div className="space-y-1">
                    <label className="text-sm text-gray-600">Property Name</label>
                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2 focus-within:border-black">
                        <Home size={18} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Property title"
                            className="w-full bg-transparent text-sm outline-none"
                        />
                    </div>
                </div> */}


                {/* Conditional Fields */}
                {property.listingType === "sell" && (
                    <div className="space-y-1">
                        <label className="text-sm text-gray-600">Total Area (sq ft)</label>
                        <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2 focus-within:border-black">
                            <Layers size={18} className="text-gray-400" />
                            <input
                                value={property.squareFeet}
                                onChange={(e) => setProperty({
                                    ...property, squareFeet: e.target.value
                                }
                                )}
                                name=""
                                type="text"
                                placeholder="Eg: 1200"
                                className="w-full bg-transparent text-sm outline-none"
                            />
                        </div>
                    </div>
                )}


                <div className="space-y-1">
                    <label className="text-sm text-gray-600">Rooms Available</label>
                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2 focus-within:border-black">
                        <BedDouble size={18} className="text-gray-400" />
                        <input
                            value={property.roomsAvailable}
                            onChange={(e) => setProperty({
                                ...property, roomsAvailable: e.target.value
                            }
                            )}
                            type="text"
                            placeholder="Eg: 2"
                            className="w-full bg-transparent text-sm outline-none"
                        />
                    </div>
                </div>


                {/* amenities */}
                <div className="w-full mt-6 col-span-2">
                    <details className="group w-full rounded-xl border">
                        <summary className="flex w-full cursor-pointer items-center justify-between px-5 py-4 font-medium list-none">
                            Amenities
                            <span className="text-sm text-gray-500 group-open:hidden">Show</span>
                            <span className="text-sm text-gray-500 hidden group-open:block">Hide</span>
                        </summary>

                        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4 px-5 pb-5">
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
                                    onClick={() => OnclickFunctionamenity(item)}
                                    key={item}
                                    className="flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-sm hover:bg-gray-50 cursor-pointer"
                                >
                                    <div className={`h-4 w-4 ${property.amenities.includes(item) ? "bg-black" : "bg-white"} rounded border shrink-0`}></div>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </details>
                </div>


                {/* Property Details Textarea */}
                <div className="space-y-1 md:col-span-2">
                    <label className="text-sm text-gray-600">Property Details</label>
                    <div className="flex items-start gap-3 rounded-lg border border-gray-200 px-3 py-2 focus-within:border-black">
                        <PenIcon size={18} className="text-gray-400 mt-2" />
                        <textarea
                            value={property.description}
                            onChange={(e) => setProperty({
                                ...property, description: e.target.value
                            }
                            )}
                            rows={5}
                            name="description"
                            placeholder="Tell about property..."
                            className="w-full bg-transparent text-sm outline-none resize-none"
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