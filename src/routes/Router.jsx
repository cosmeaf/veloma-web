import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"

import { routes } from "./routesConfig"

import AuthLayout from "../layouts/AuthLayout"

import AuthGuard from "../guards/AuthGuard"
import RoleGuard from "../guards/RoleGuard"

import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import Recovery from "../pages/auth/Recovery"
import VerifyOtp from "../pages/auth/VerifyOtp"
import ResetPassword from "../pages/auth/ResetPassword"

export default function Router(){

  return(

    <Routes>

      {/* AUTH */}
      <Route element={<AuthLayout/>}>

        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/recovery" element={<Recovery/>}/>
        <Route path="/verify-otp" element={<VerifyOtp/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>

      </Route>


      {/* APP ROLES */}
      {routes.map(group => {

        const Layout = group.layout

        return (

          <Route
            key={group.role}
            element={
              <AuthGuard>
                <RoleGuard allow={group.role}>
                  <Layout/>
                </RoleGuard>
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


      <Route path="/" element={<Navigate to="/dashboard"/>}/>
      <Route path="*" element={<Navigate to="/dashboard"/>}/>

    </Routes>

  )

}