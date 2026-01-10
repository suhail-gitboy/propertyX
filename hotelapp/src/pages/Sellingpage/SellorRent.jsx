import React from "react";
import { Home, Key } from "lucide-react";

const OPTIONS = [
    {
        id: "rent",
        title: "Rent your property",
        description: "Earn by renting your place to guests",
        icon: Key,
    },
    {
        id: "sell",
        title: "Sell your property",
        description: "List your property for direct sale",
        icon: Home,
    },
];

const PropertyPurposeSelector = ({ property, setProperty }) => {
    const handleType = (selectedId) => {
        setProperty((prev) => ({ ...prev, listingType: selectedId }));
    };

    return (
        <div className="space-y-6 h-120">
            <h1 className="text-3xl font-semibold">What would you like to do?</h1>
            <p className="text-gray-500">
                Choose whether you want to sell or rent your property
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {OPTIONS.map((option) => {
                    const Icon = option.icon;
                    const isActive = property.listingType === option.id;

                    return (
                        <button
                            key={option.id}
                            onClick={() => handleType(option.id)}
                            className={`flex items-center gap-4 rounded-xl border p-5 text-left transition
                ${isActive
                                    ? "border-black bg-gray-50 shadow-sm"
                                    : "border-gray-200 hover:border-black"
                                }`}
                        >
                            <div
                                className={`flex h-12 w-12 items-center justify-center rounded-lg
                  ${isActive ? "bg-black text-white" : "bg-gray-100 text-black"}`}
                            >
                                <Icon size={22} />
                            </div>

                            <div>
                                <h3 className="text-lg font-medium">{option.title}</h3>
                                <p className="text-sm text-gray-500">{option.description}</p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default PropertyPurposeSelector;
