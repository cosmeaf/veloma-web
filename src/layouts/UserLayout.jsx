import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import Sidebar from "../components/layout/Sidebar"

export default function UserLayout() {

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div style={{ padding: 16 }}>
          <Outlet />
        </div>
      </div>
    </div>
  )

}