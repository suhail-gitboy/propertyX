import React from "react";

import { ContextDatas } from "./ContextWrapped";

const ProtectedRouteBasedRole = ({ admin, host, children }) => {

    const { User, loading, Setloginmodal } = ContextDatas();


    if (!User) {
        Setloginmodal(true)
        return <p className="min-h-screen bg-white text-black">Please login</p>;
    }

    if (admin && User.role !== "admin") {
        Setloginmodal(true)
        return <p className="min-h-screen bg-white text-black">Only admin can access</p>;
    }

    if (host && User.role !== "host") {
        return <p className="min-h-screen bg-white text-black">Only host can access</p>;
    }

    return children;
};

export default ProtectedRouteBasedRole;
