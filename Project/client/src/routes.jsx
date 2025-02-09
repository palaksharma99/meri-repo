import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Error from "./pages/Error";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Setup2FA from "./pages/Setup2FA";
import Verify2FA from "./pages/Verify2FA";

const router = createBrowserRouter([
    {
        path:"/login",
        element:<LoginPage />,
        errorElement:<Error />,
    },
    {
        element:<ProtectedRoute />,
        children:[
            {
                path:"/",
                element:<HomePage />,
                errorElement:<Error />,
            },
            
            {
                path:"/setup-2fa",
                element:<Setup2FA />,
                errorElement:<Error />,
            },
        
            {
                path:"/verify-2fa",
                element:<Verify2FA />,
                errorElement:<Error />,
            },
        ]
    }
])

export default router;