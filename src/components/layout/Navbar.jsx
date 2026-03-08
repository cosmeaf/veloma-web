import React, { useState, useMemo } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { routes } from "../../routes/routesConfig"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
  faRightFromBracket, 
  faChevronDown,
  faChartLine,
  faIdCard,
  faShieldHalved
} from "@fortawesome/free-solid-svg-icons"

export default function Navbar() {

  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // 1. Busca segura da rota atual
  const currentPage = useMemo(() => {
    if (!routes || routes.length === 0) return null
    try {
      const allRoutes = routes.flatMap(group => group.routes || [])
      return allRoutes.find(route => route.path === location.pathname)
    } catch (error) {
      return null
    }
  }, [location.pathname])

  const pageTitle = currentPage?.label || "Painel de Controle"

  // 2. Iniciais do Avatar (Estilo Premium Veloma)
  const getInitials = (firstName, lastName) => {
    const first = firstName ? firstName[0].toUpperCase() : ""
    const last = lastName ? lastName[0].toUpperCase() : ""
    return `${first}${last}`
  }

  // 3. Cores da Badge baseadas na identidade (Amber para destaque principal)
  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case "admin": 
        // Admin: Slate escuro para autoridade
        return "bg-slate-800 text-white border-slate-700 shadow-sm"
      case "staff": 
        // Staff: Amber dourado
        return "bg-amber-100 text-amber-800 border-amber-200 shadow-sm"
      default: 
        // User: Slate médio
        return "bg-slate-100 text-slate-600 border-slate-200 shadow-sm"
    }
  }

  // 4. Logout Blindado
  const handleLogout = () => {
    try {
      logout()
    } catch (error) {
      console.warn("Erro ao desconectar do servidor, saindo localmente.", error)
    } finally {
      navigate("/login")
      setIsDropdownOpen(false)
    }
  }

  return (
    // Utilizando o padrão exato do seu CSS: .topbar-internal
    <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-40">
      
      {/* Lado Esquerdo: Título com Indicador Amber (Dourado) */}
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.4)]"></div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          {pageTitle}
        </h1>
      </div>

      {/* Lado Direito: Profile & Cascade Menu */}
      <div className="relative">
        
        {/* Botão Trigger */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200 focus:outline-none group"
        >
          {/* Avatar: Fundo Slate Escuro com Texto Amber */}
          <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-amber-400 font-bold text-sm shadow-md group-hover:scale-105 transition-transform border border-slate-800">
            {getInitials(user?.first_name, user?.last_name)}
          </div>

          {/* Textos */}
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-bold text-slate-900 leading-none">
              {user?.first_name} {user?.last_name}
            </span>
            <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border mt-1 tracking-wider ${getRoleBadgeStyle(user?.role)}`}>
              {user?.role}
            </span>
          </div>

          {/* Seta */}
          <FontAwesomeIcon 
            icon={faChevronDown} 
            className={`text-slate-400 text-xs transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-amber-500' : ''}`} 
          />
        </button>

        {/* Menu Dropdown (Cascade - Estilo Clean/Paper) */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 animate-fade-in-down">
            
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Conta</p>
              <p className="text-sm text-slate-900 font-medium truncate">{user?.email}</p>
            </div>

            <div className="py-1">
              <button
                onClick={() => { navigate("/profile"); setIsDropdownOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-amber-50 hover:text-amber-700 hover:pl-5 transition-all duration-200 flex items-center gap-3"
              >
                <FontAwesomeIcon icon={faIdCard} className="text-slate-400 w-4" />
                Meu Perfil
              </button>

              <button
                onClick={() => { navigate("/dashboard"); setIsDropdownOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-amber-50 hover:text-amber-700 hover:pl-5 transition-all duration-200 flex items-center gap-3"
              >
                <FontAwesomeIcon icon={faChartLine} className="text-slate-400 w-4" />
                Dashboard
              </button>

              <div className="h-px bg-slate-100 my-1 mx-2"></div>

              {/* Logout: Estilo Aviso/Perigo, mas sutil */}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 flex items-center gap-3 font-medium"
              >
                <FontAwesomeIcon icon={faRightFromBracket} className="w-4" />
                Sair do Sistema
              </button>

            </div>
          </div>
        )}
      </div>

      {/* Overlay para fechar ao clicar fora */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40 bg-transparent" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}

    </nav>
  )
}