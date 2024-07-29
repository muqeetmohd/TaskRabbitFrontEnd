import React, { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";

import Swal from "sweetalert2";
import { useUserContext } from "../components/UserContext";
import axios from "axios";

const DashboardContext = createContext();

const DashboardLayout = () => {
    const { handleFetchMe, user } = useUserContext();

    const handleLogout = async () => {
        try {
            const response = await axios.post(
                "https://altiusbackendtaskrabbit.vercel.app/api/v1/auth/logout",
                { withCredentials: true }
            );
            Swal.fire({
                icon: "success",
                title: "Logout...",
                text: response?.data?.message,
            });
            handleFetchMe();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error?.response?.data,
            });
        }
    };

    const values = { handleLogout };
    return (
        <DashboardContext.Provider value={values}>
            <main>
                <Outlet />
            </main>
        </DashboardContext.Provider>
    );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
