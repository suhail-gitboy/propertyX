
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
import { LoaderFive } from "../Utils/UILIBRARY/Loader";

import { RxCross2 } from "react-icons/rx";
import React, { useEffect, useState } from 'react'
import { ImagePlus } from "lucide-react";
import { ContextDatas } from '../Common/ContextWrapped';
import LocationPicker from './Sellingpage/Mapdetail';
import { Link, useNavigate, useParams } from "react-router";
import { useDeleteproperty, useGetsingleproperty, useHideproperty, useUpdateproperty } from "../ApiServices/tanstack/PropertyMethod";
import { FaEdit, FaEyeSlash, FaHome, FaTrash } from "react-icons/fa";
import { LoaderOne } from "../Utils/UILIBRARY/Loader";


const Editpage = () => {
    const { property, setProperty, token, loading, Setloading } = ContextDatas()
    const { id } = useParams()
    const Navigate = useNavigate()
    console.log(id);

    const { data } = useGetsingleproperty(id)
    const [Previews, Setpreview] = useState([]);
    const [removedImages, setRemovedImages] = useState([]);



    useEffect(() => {
        if (!data) return;
        console.log(data);

        setProperty({
            title: data.title || "",
            description: data.description || "",
            propertyType: data.propertyType || "",
            listingType: data.listingType || "",
            price: data.price || "",
            squareFeet: data.squareFeet || null,
            roomsAvailable: data.roomsAvailable || null,

            amenities: Array.isArray(data.amenities) ? data.amenities : [],

            seller: {
                sellerId: data.seller?.sellerId || "",
                sellerName: data.seller?.name || "",
                sellerEmail: data.seller?.email || "",
                sellerPhone: data.seller?.phone || "",
            },

            location: {
                address: data.location?.address || "",
                city: data.location?.city || "",
                pincode: data.location?.pincode || "",
                lat: data.location?.lat || null,
                lng: data.location?.lng || null,
            },

            images: data.images || [], // [{url, public_id}]
        });

        Setpreview(data.images.map(img => img.url));
    }, [data]);



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

    const Deleteproperty = useDeleteproperty(token)
    const hideproperty = useHideproperty(token)




    const FuncDeletefile = (urlToDelete) => {
        // remove preview
        Setpreview(prev => prev.filter(url => url !== urlToDelete));

        setProperty(prev => {
            const imgToRemove = prev.images.find(
                img => !(img instanceof File) && img.url === urlToDelete
            );

            // track cloudinary image to delete
            if (imgToRemove?.public_id) {
                setRemovedImages(ids => [...ids, imgToRemove.public_id]);
            }

            return {
                ...prev,
                images: prev.images.filter(img =>
                    img instanceof File ? true : img.url !== urlToDelete
                )
            };
        });
    };


    const handleAddImages = (e) => {
        const files = Array.from(e.target.files);
        console.log(files);


        setProperty(prev => ({
            ...prev,
            images: [...prev.images, ...files]
        }));

        // preview
        const previewUrls = files.map(file => URL.createObjectURL(file));
        Setpreview(prev => [...prev, ...previewUrls]);
    };

    const { onSuccess, mutate: Update } = useUpdateproperty(token)
    const handleUpdateProperty = async (id) => {
        const formData = new FormData();


        formData.append("title", property.title);
        formData.append("description", property.description);
        formData.append("price", property.price);
        formData.append("squareFeet", property.squareFeet);
        formData.append("roomsAvailable", property.roomsAvailable);
        formData.append("amenities", JSON.stringify(property.amenities));
        formData.append("location", JSON.stringify(property.location));

        // existing images (keep)
        const existingImages = property.images.filter(
            img => !(img instanceof File)
        );

        formData.append(
            "existingImages",
            JSON.stringify(existingImages)
        );


        property.images.forEach(img => {
            if (img instanceof File) {
                formData.append("images", img);
            }
        });


        formData.append(
            "removedImages",
            JSON.stringify(removedImages)
        );

        // 🔥 API call
        try {
            Update({ id, data: formData })

            if (onSuccess) {
                Navigate("/")

            }

        } catch (error) {
            console.log(error);

        }
    };





    return (
        <>
            {loading && <div className="fixed inset-0 bg-black/70 h-screen flex z-[9999]
 justify-center items-center">


                <LoaderFive text="updating property ..." />

            </div>}
            <div className='min-h-screen bg-white  p-5 md:p-10'>

                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold mb-8 text-blue-900">
                        Edit page
                    </h1>
                    <Link to={"/"} className="flex items-center gap-2 text-blue-900 font-semibold"><FaHome />Home</Link>
                </div>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className='h-auto'>

                        {
                            Previews.length < 6 ? (<>
                                <label
                                    htmlFor="imageUpload"
                                    className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-300 p-10 text-center transition hover:border-black hover:bg-gray-50"
                                >
                                    <input
                                        id="imageUpload"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleAddImages(e)}
                                    />

                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                                        <ImagePlus size={28} className="text-gray-700" />
                                    </div>

                                    <div>
                                        <p className="font-medium">Upload photos</p>
                                        <p className="text-sm text-gray-500">
                                            JPG or PNG · up to 10 images
                                        </p>
                                    </div>
                                </label></>) : (<>
                                    your limit has reached</>)
                        }

                        <div className="py-7 flex h-50 px-4  gap-4">
                            {/* input */}

                            {

                                Previews.map((img, key) => (
                                    <div className="relative" key={key}><button onClick={() => FuncDeletefile(img)} className="bg-red-600 absolute -top-1 right-0 rounded-md text-white"><RxCross2 /></button><img src={img} className='h-40 w-35 rounded-md' alt="" /></div>
                                ))

                            }
                        </div>

                    </div>
                    <div>
                        <LocationPicker property={property} setProperty={setProperty} />
                    </div>

                    <div className=" flex md:flex-row justify-evenly  gap-3  w-full pb-20 ">

                        {/* UPDATE */}
                        <button
                            onClick={() => handleUpdateProperty(data._id)}
                            className="flex items-center gap-3 px-4 py-2 rounded-lg
        bg-green-600 text-white hover:bg-green-700 transition"
                        >
                            <FaEdit />
                            <span>Update </span>
                        </button>

                        {/* HIDE */}
                        <button
                            onClick={() => hideproperty.mutate(data._id)}
                            className="flex items-center gap-3 px-4 py-2 rounded-lg
        bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                        >
                            <FaEyeSlash />
                            <span >{data?.isAvailable ? "hide property" : "show property"}</span>
                        </button>

                        {/* REMOVE */}
                        <button

                            className="flex items-center gap-3 px-4 py-2 rounded-lg
        bg-red-600 text-white hover:bg-red-700 transition"
                        >
                            <FaTrash />
                            <span >Remove </span>
                        </button>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Editpage
