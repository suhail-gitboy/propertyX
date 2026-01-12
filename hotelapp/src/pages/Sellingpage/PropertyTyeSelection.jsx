import React from "react";
import {
    Home,
    Building2,
    Hotel,
    DoorOpen,
} from "lucide-react";

const PROPERTY_TYPES = [
    {
        id: "home",
        title: "Entire Home",
        description: "A full place all to yourself",
        icon: Home,
    },
    {
        id: "room",
        title: "Private Room",
        description: "Your own room in a shared home",
        icon: DoorOpen,
    },
    {
        id: "apartment",
        title: "Apartment",
        description: "A self-contained apartment unit",
        icon: Building2,
    },
    {
        id: "villa",
        title: "Villa",
        description: "A luxury standalone property",
        icon: Hotel,
    },
];

const PropertyTypeSelector = ({ value, onChange, property, setProperty }) => {



    const HandleType = (e) => {


        setProperty((prev) => ({ ...prev, propertyType: e }))


    }
    console.log(property);

    return (
        <div className="space-y-6  h-fit md:h-120">
            <h1 className="text-3xl font-semibold">
                What type of place will guests have?
            </h1>
            <p className="text-gray-500">
                Choose the property type you want to list
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                {PROPERTY_TYPES.map((type) => {
                    const Icon = type.icon;
                    const isActive = value === type.id;

                    return (
                        <button
                            key={type.id}
                            onClick={() => { onChange(type.id), HandleType(type.id) }}
                            className={`flex items-center gap-4 rounded-xl border p-5 text-left transition
                ${isActive
                                    ? "border-black bg-gray-50 shadow-sm"
                                    : "border-gray-200 hover:border-black"
                                }`}
                        >
                            <div
                                className={`flex h-12 w-12 items-center justify-center rounded-lg
                  ${isActive
                                        ? "bg-black text-white"
                                        : "bg-gray-100 text-black"
                                    }`}
                            >
                                <Icon size={22} />
                            </div>

                            <div>
                                <h3 className="text-lg font-medium">{type.title}</h3>
                                <p className="text-sm text-gray-500">
                                    {type.description}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default PropertyTypeSelector;
