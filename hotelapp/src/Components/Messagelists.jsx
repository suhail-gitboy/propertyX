import React from 'react'

const Messagelist = ({ user, key, startConversation }) => {
    const DUMMY_MESSAGES = true
    return (
        <div
            onClick={() => startConversation(user._id)}
            key={key}
            className="flex relative  space-y-2 items-center gap-3 bg-gray-300 hover:bg-gray-100 rounded-md border-b w-full p-4 cursor-pointer"
        >
            <img
                src={typeof user.picture == "string" ? user.picture : user?.picture?.url}
                className="h-10 w-10 rounded-full object-cover"
            />
            <span className="font-medium">{user.name}</span>
            <p className={`w-2 h-2 absolute top-4 left-12  rounded-full ${DUMMY_MESSAGES ? "bg-green-600" : "bg-gray-700"}`}></p>
        </div>
    )
}

export default Messagelist
