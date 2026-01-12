import React from "react";
import { ContextDatas } from "../Common/ContextWrapped";

const Messagelist = ({ user, startConversation, onlineuser, Setmessagebar }) => {
    const { Setbaropen } = ContextDatas();

    const isOnline = onlineuser?.some(
        (online) => online?.userId === user._id
    );

    return (
        <div
            onClick={() => {
                startConversation(user._id);
                Setmessagebar(false);
                Setbaropen(false);
            }}
            className="
        flex items-center gap-4
        px-4 py-3
        cursor-pointer
        transition-all duration-200
        hover:bg-gray-50
        rounded-xl
        group
      "
        >

            <div className="relative">
                <img
                    src={typeof user.picture === "string" ? user.picture : user?.picture?.url}
                    alt={user.name}
                    className="h-11 w-11 rounded-full object-cover"
                />

                <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white
            ${isOnline ? "bg-green-500" : "bg-gray-400"}
          `}
                />
            </div>


            <div className="flex flex-col flex-1 min-w-0">
                <span className="font-medium text-gray-800 truncate">
                    {user.name}
                </span>

                <span
                    className={`text-xs ${isOnline ? "text-green-600" : "text-gray-500"
                        }`}
                >
                    {isOnline ? "Active now" : "Offline"}
                </span>
            </div>
        </div>
    );
};

export default Messagelist;
