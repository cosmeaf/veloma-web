import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useLoading } from "../../context/LoadingContext"

export default function Recovery() {

  const navigate = useNavigate()
  const { recovery, normalizeError } = useAuth()
  const { start, stop } = useLoading()

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setMessage("")

    try {
      start("Enviando código...")

      const res = await recovery({ email })
      setMessage(res.detail || "Código enviado para o seu email.")

      // CORREÇÃO: Caminho atualizado para /auth/verify-otp
      navigate("/verify-otp", { state: { email } })

    } catch (err) {
      setError(normalizeError(err))
    } finally {
      stop()
    }
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="section-title">Recuperar Acesso</h2>
        <p className="section-subtitle">
          Enviaremos um código para o seu email
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
            Email Registado
          </label>
          <input
            id="email"
            type="email"
            placeholder="nome@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-veloma"
            required
          />
        </div>

        {message ? (
          <div className="p-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{message}</span>
          </div>
        ) : null}

        {error ? (
          <div className="alert-error">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{error}</span>
          </div>
        ) : null}

        <button type="submit" className="btn-primary">
          Enviar Código
        </button>

      </form>

      <div className="mt-8 text-center">
        <Link to="/login" className="text-sm text-slate-500 hover:text-amber-600 font-medium transition-colors">
          ← Voltar para o Login
        </Link>
      </div>
    </div>
  )
}