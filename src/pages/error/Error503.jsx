import React from "react"

export default function Error503() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center max-w-lg">

        <h1 className="text-6xl font-bold text-slate-900 mb-4">
          503
        </h1>

        <h2 className="text-2xl font-semibold text-slate-700 mb-4">
          Serviço indisponível
        </h2>

        <p className="text-slate-500">
          O sistema está temporariamente indisponível. Tente novamente mais tarde.
        </p>

      </div>
    </div>
  )
}