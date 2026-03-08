import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { useAuth } from "../../hooks/useAuth"
import { routes } from "../../routes/routesConfig"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons"

import pkg from "../../../package.json"

export default function Sidebar(){

  const navigate = useNavigate()

  const { user, logout } = useAuth()

  const [collapsed, setCollapsed] = useState(false)

  const role = user?.role || "user"

  const group = routes.find(r => r.role === role)

  const menu = group?.routes?.filter(r => r.sidebar) || []

  const handleLogout = async () => {

    try {

      await logout()

    } catch (err) {

      console.warn("Logout API error ignored:", err)

    }

    navigate("/login")

  }

  return(

    <aside
      className={`bg-gray-900 text-white h-screen transition-all duration-300 flex flex-col ${
        collapsed ? "w-16" : "w-64"
      }`}
    >

      {/* HEADER */}

      <div className="flex items-center justify-between p-4 border-b border-gray-700 h-16 shrink-0">

        {!collapsed && (
          <span className="font-semibold text-lg tracking-wide">
            Veloma Contabilidade
          </span>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-300 hover:text-white transition-colors p-1"
        >
          <FontAwesomeIcon icon={faBars}/>
        </button>

      </div>


      {/* MENU */}

      <nav className="flex-1 overflow-y-auto p-2 space-y-2">

        {menu.map(route => (

          <Link
            key={route.path}
            to={route.path}
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-800 transition-colors group"
          >

            <div className="w-6 text-center">

              {route.icon && (
                <FontAwesomeIcon
                  icon={route.icon}
                  className="text-gray-400 group-hover:text-cyan-400 transition-colors"
                />
              )}

            </div>

            {!collapsed && (
              <span className="font-medium text-gray-300 group-hover:text-white">
                {route.label}
              </span>
            )}

          </Link>

        ))}

      </nav>


      {/* FOOTER */}

      <div className="mt-auto p-4 border-t border-gray-800 bg-gray-900/50">

        {/* SYSTEM STATUS */}

        {!collapsed && (

          <div className="flex items-center justify-center gap-2 mb-4 px-2 py-2 bg-gray-800/50 rounded border border-gray-700/50">

            <span className="relative flex h-2 w-2">

              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>

              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>

            </span>

            <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase">

              VERSION: <span className="text-white">{pkg.version}</span>

            </span>

          </div>

        )}

        {/* LOGOUT */}

        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center gap-3 p-2 rounded transition-all duration-200
            ${collapsed ? "justify-center" : "justify-start"}
            hover:bg-red-900/30 hover:text-red-400 text-gray-400 group
          `}
          title="Sair do sistema"
        >

          <FontAwesomeIcon
            icon={faRightFromBracket}
            className="group-hover:scale-110 transition-transform"
          />

          {!collapsed && (
            <span className="text-sm font-medium">
              Sair
            </span>
          )}

        </button>

      </div>

    </aside>

  )

}