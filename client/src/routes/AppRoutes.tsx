import { Navigate, createBrowserRouter } from "react-router-dom";

import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { Customer } from "../pages/customer/customer";

export const router = createBrowserRouter( [
    {
        path: '/',
        element: <Navigate to="/login" replace />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/customer',
        element: <Customer />,
    },
    {
        path: '*',
        element: <Navigate to="/login" replace />,
    } 
] );
