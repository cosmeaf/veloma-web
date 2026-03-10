import React from "react"
import { Routes, Route } from "react-router-dom"

import { routes } from "./routesConfig"

import AuthLayout from "../layouts/AuthLayout"
import PublicLayout from "../layouts/PublicLayout"

import PublicRoute from "../guards/PublicRoute"
import AuthGuard from "../guards/AuthGuard"
import RoleGuard from "../guards/RoleGuard"
import ConsentGuard from "../guards/ConsentGuard"

import LandingPage from "../pages/public/LandingPage"
import Proposal from "../pages/public/Proposal"

import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import Recovery from "../pages/auth/Recovery"
import VerifyOtp from "../pages/auth/VerifyOtp"
import ResetPassword from "../pages/auth/ResetPassword"

import ConsentRequired from "../pages/consents/ConsentRequired"

import Error404 from "../pages/error/Error404"

export default function Router() {

  return (

    <Routes>

      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/proposal" element={<Proposal />} />
      </Route>

      <Route element={
        <PublicRoute>
          <AuthLayout />
        </PublicRoute>
      }>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      <Route
        path="/consents"
        element={
          <AuthGuard>
            <ConsentRequired />
          </AuthGuard>
        }
      />

      {routes.map(group => {

        const Layout = group.layout

        return (

          <Route
            key={group.role}
            element={
              <AuthGuard>
                <ConsentGuard>
                  <RoleGuard allow={group.role}>
                    <Layout />
                  </RoleGuard>
                </ConsentGuard>
              </AuthGuard>
            }
          >

            {group.routes.map(route => (

              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />

            ))}

          </Route>

        )

      })}

      <Route path="*" element={<Error404 />} />

    </Routes>

  )

}