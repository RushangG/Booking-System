import { Navigate, createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/Layout/Layout";

import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";

import { ProtectedRoute } from "../pages/Layout/ProtectedRoute";

import { Customer } from "../pages/customer/Customer";
import { Company } from "../pages/company/Company";
import { Booking } from "../pages/booking/Booking";
import { Accommodation } from "../pages//accommodations/Accommodations";
import { Users } from "../pages/users/Users";
import { CompanyAddEdit } from "../pages/company/CompanyAddEdit";
import { CustomerAddEdit } from "../pages/customer/CustomerAddEdit";
import { UsersAddEdit } from "../pages/users/UsersAddEdit";
import { AccommodationAddEdit } from "../pages/accommodations/AccommodationAddEdit";
import { BookingAddEdit } from "../pages/booking/BookingAddEdit";
import { CompanySelectList } from "../pages/company/CompanySelectList";
import { CompanyUsers } from "../pages/company/CompanyUsers";
import { Setting } from "../pages/setting/Setting";
import { AssignRoleToUser } from "../pages/roles/AssignRoleToUser";
import { AssignCustomerToCompany } from "../pages/company/AssignCustomerToCompany";
import { Roles } from "../pages/roles/Roles";
import { PermissionAssignToRole } from "../pages/roles/PermissionAssignToRole";
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
    element: <ProtectedRoute />,
    children: [
      {
        path: "/company-select-list",
        element: <CompanySelectList />,
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
            path: "/customer-add-edit",
            element: <CustomerAddEdit />,
          },
          {
            path: "/booking",
            element: <Booking />,
          },
          {
            path: "/booking-add-edit",
            element: <BookingAddEdit />,
          },
          {
            path: "/accommodation",
            element: <Accommodation />,
          },
          {
            path: "/accommodation-add-edit",
            element: <AccommodationAddEdit />,
          },
          {
            path: "/company-add-edit",
            element: <CompanyAddEdit />,
          },
          {
            path: "/company-users",
            element: <CompanyUsers />,
          },
          {
            path: "/assign-customer-to-company",
            element: <AssignCustomerToCompany />,
          },
          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/user-add-edit",
            element: <UsersAddEdit />,
          },
          {
            path: "/assign-role-to-user",
            element: <AssignRoleToUser />,
          },
          {
            path: "/roles",
            element: <Roles />,
          },
          {
            path: "/permission-assign-to-role",
            element: <PermissionAssignToRole />,
          },
          {
            path: "/setting",
            element: <Setting />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
