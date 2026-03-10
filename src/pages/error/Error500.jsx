import React from "react"
import { Link } from "react-router-dom"

export default function Error500() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center max-w-lg">

        <h1 className="text-6xl font-bold text-slate-900 mb-4">
          500
        </h1>

        <h2 className="text-2xl font-semibold text-slate-700 mb-4">
          Erro interno do servidor
        </h2>

        <p className="text-slate-500 mb-8">
          Ocorreu um erro inesperado. Tente novamente mais tarde.
        </p>

        <Link
          to="/"
          className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
        >
          Voltar para início
        </Link>

      </div>
    </div>
  )
}