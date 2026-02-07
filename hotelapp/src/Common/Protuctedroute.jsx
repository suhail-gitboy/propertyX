import React from "react";

import { ContextDatas } from "./ContextWrapped";

const ProtectedRouteBasedRole = ({ admin, host, children }) => {
    const { User, loading } = ContextDatas();



    if (!User) {
        return <p>Please login</p>;
    }

    if (admin && User.role !== "admin") {
        return <p>Only admin can access</p>;
    }

    if (host && User.role !== "host") {
        return <p>Only host can access</p>;
    }

    return children;
};

export default ProtectedRouteBasedRole;
