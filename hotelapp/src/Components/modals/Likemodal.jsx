import React from 'react'

const Likemodal = ({ property, setmodal }) => {
    return (
        <div className="h-50 absolute w-60 overflow-auto bg-neutral-900 rounded-xl border border-neutral-800 shadow-lg" onClick={() => setmodal(false)}>

            {/* Header */}
            <div className="px-4 py-3 border-b border-neutral-800">
                <h3 className="text-sm font-semibold text-white">
                    People who liked
                </h3>
            </div>

            {/* Scroll Area */}
            <div className="h-[calc(30rem-3rem)] overflow-y-auto px-3 py-2 space-y-2">

                {property.likes.map((user, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-800 transition"
                    >
                        {/* Dummy Image */}
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="user"
                            className="h-8 w-8 rounded-full object-cover"
                        />

                        {/* Name */}
                        <span className="text-sm text-white truncate">
                            {user.name}
                        </span>
                    </div>
                ))}

                {/* Empty */}
                {property.likes.length === 0 && (
                    <p className="text-center text-sm text-neutral-500 py-6">
                        No likes yet
                    </p>
                )}
            </div>
        </div>
    )
}

export default Likemodal
