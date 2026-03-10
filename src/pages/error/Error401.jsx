import React from "react"
import { Link } from "react-router-dom"

export default function Error401() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center max-w-lg">

        <h1 className="text-6xl font-bold text-slate-900 mb-4">
          401
        </h1>

        <h2 className="text-2xl font-semibold text-slate-700 mb-4">
          Não autorizado
        </h2>

        <p className="text-slate-500 mb-8">
          Você precisa autenticar-se para acessar esta página.
        </p>

        <Link
          to="/login"
          className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
        >
          Ir para login
        </Link>

      </div>
    </div>
  )
}