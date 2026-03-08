import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useLoading } from "../../context/LoadingContext"

export default function Login() {

  const navigate = useNavigate()
  const { login, normalizeError } = useAuth()
  const { start, stop } = useLoading()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      start("Autenticando...")

      const user = await login({ email, password })

      // Redirecionamento por Role (Mantive sua lógica original)
      if (user.role === "admin") navigate("/admin")
      else if (user.role === "staff") navigate("/staff")
      else navigate("/dashboard")

    } catch (err) {
      setError(normalizeError(err))
    } finally {
      stop()
    }
  }

  return (
    <div className="w-full">
      
      {/* Títulos (Usando classes do index.css) */}
      <div className="mb-10">
        <h2 className="section-title">Bem-vindo de volta</h2>
        <p className="section-subtitle">
          Aceda ao seu painel Veloma
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        
        {/* Input Email (Classe .input-veloma do index.css) */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
            Email Corporativo
          </label>
          <input
            id="email"
            type="email"
            placeholder="nome@velomacontabilidade.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-veloma" 
            required
          />
        </div>

        {/* Input Senha (Classe .input-veloma do index.css) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
              Palavra-passe
            </label>
            <Link to="/recovery" className="text-sm font-medium text-slate-500 hover:text-amber-600 transition-colors">
              Esqueceu-se?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-veloma"
            required
          />
        </div>

        {/* Erro (Classe .alert-error do index.css) */}
        {error ? (
          <div className="alert-error">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{error}</span>
          </div>
        ) : null}

        {/* Botão (Classe .btn-primary do index.css) */}
        <button type="submit" className="btn-primary">
          Entrar no Portal
        </button>

      </form>

      {/* Links Auxiliares */}
      <div className="mt-8 text-center">
        <p className="text-sm text-slate-600">
          Ainda não tem conta?{' '}
          <Link to="/register" className="font-bold text-slate-900 hover:text-amber-600 transition-colors">
            Solicitar Acesso
          </Link>
        </p>
      </div>

    </div>
  )
}