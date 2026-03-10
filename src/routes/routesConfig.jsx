import {
  faGauge,
  faUsers,
  faUserShield,
  faUserTie
} from "@fortawesome/free-solid-svg-icons";

import AdminLayout from "../layouts/AdminLayout";
import StaffLayout from "../layouts/StaffLayout";
import UserLayout from "../layouts/UserLayout";

import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";

import StaffDashboard from "../pages/staff/Dashboard";
import Staffs from "../pages/staff/Staffs";

import UserDashboard from "../pages/user/Dashboard";
import Profile from "../pages/user/Profile";

export const routes = [
  {
    role: "user",
    layout: UserLayout,
    routes: [
      {
        path: "/dashboard",
        element: <UserDashboard />,
        label: "Dashboard",
        icon: faGauge,
        sidebar: true
      },
      {
        path: "/profile",
        element: <Profile />,
        label: "Profile",
        icon: faUsers,
        sidebar: true
      }
    ]
  },
  {
    role: "staff",
    layout: StaffLayout,
    routes: [
      {
        path: "/staff",
        element: <StaffDashboard />,
        label: "Staff Dashboard",
        icon: faUserTie,
        sidebar: true
      },
      {
        path: "/staff/list",
        element: <Staffs />,
        label: "Staff List",
        icon: faUsers,
        sidebar: true
      }
    ]
  },
  {
    role: "admin",
    layout: AdminLayout,
    routes: [
      {
        path: "/admin",
        element: <AdminDashboard />,
        label: "Admin Dashboard",
        icon: faUserShield,
        sidebar: true
      },
      {
        path: "/admin/users",
        element: <Users />,
        label: "Users",
        icon: faUsers,
        sidebar: true
      }
    ]
  }
];