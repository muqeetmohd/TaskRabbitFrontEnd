import React from "react";
import { useUserContext } from "../components/UserContext";
import { Navigate, useLocation } from "react-router-dom";

const CommonProtectRoute = ({ children }) => {
    const location = useLocation();
    const { userLoading, user } = useUserContext();

    if (userLoading) {
        return (<div>Loading</div>)
    }

    if (user?.email) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default CommonProtectRoute;
