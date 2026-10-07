import { Navigate, createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/Layout/Layout";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { Customer } from "../pages/customer/Customer";
import { Company } from "../pages/company/Company";
import { Booking } from "../pages/booking/Booking";
import { Accommodation } from "../pages//accommodations/Accommodations";
import { Users } from "../pages/users/Users";
import { CompanyAddEdit } from "../pages/company/CompanyAddEdit";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/customer",
        element: <Customer />,
      },
      {
        path: "/company",
        element: <Company />,
      },
      {
        path: "/booking",
        element: <Booking />,
      },
      {
        path: "/accommodation",
        element: <Accommodation />,
      },
      {
        path: "/company-add-edit",
        element: <CompanyAddEdit />,
      },
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
