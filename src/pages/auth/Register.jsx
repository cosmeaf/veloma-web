import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useLoading } from "../../context/LoadingContext"

export default function Register() {

  const navigate = useNavigate()
  const { register, normalizeError } = useAuth()
  const { start, stop } = useLoading()

  const [first_name, setFirst] = useState("")
  const [last_name, setLast] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPass] = useState("")
  const [password2, setPass2] = useState("")
  const [error, setError] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      start("Criando conta...")

      const user = await register({ first_name, last_name, email, password, password2 })

      // Redirecionamento baseado na role retornada pelo backend
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
      
      {/* Cabeçalho */}
      <div className="mb-8">
        <h2 className="section-title">Criar Conta</h2>
        <p className="section-subtitle">
          Junte-se à Veloma e modernize a sua gestão
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        
        {/* Grid para Nome e Sobrenome (Lado a lado em telas médias+) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="space-y-2">
            <label htmlFor="first_name" className="block text-sm font-semibold text-slate-700">
              Nome
            </label>
            <input
              id="first_name"
              type="text"
              placeholder="O seu nome"
              value={first_name}
              onChange={(e) => setFirst(e.target.value)}
              className="input-veloma"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="last_name" className="block text-sm font-semibold text-slate-700">
              Sobrenome
            </label>
            <input
              id="last_name"
              type="text"
              placeholder="O seu apelido"
              value={last_name}
              onChange={(e) => setLast(e.target.value)}
              className="input-veloma"
              required
            />
          </div>

        </div>

        {/* Campo Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
            Email Corporativo
          </label>
          <input
            id="email"
            type="email"
            placeholder="nome@empresa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-veloma"
            required
          />
        </div>

        {/* Campo Senha */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
            Palavra-passe
          </label>
          <input
            id="password"
            type="password"
            placeholder="Crie uma palavra-passe forte"
            value={password}
            onChange={(e) => setPass(e.target.value)}
            className="input-veloma"
            required
          />
        </div>

        {/* Campo Confirmar Senha */}
        <div className="space-y-2">
          <label htmlFor="password2" className="block text-sm font-semibold text-slate-700">
            Confirmar Palavra-passe
          </label>
          <input
            id="password2"
            type="password"
            placeholder="Repita a palavra-passe"
            value={password2}
            onChange={(e) => setPass2(e.target.value)}
            className="input-veloma"
            required
          />
        </div>

        {/* Mensagem de Erro */}
        {error ? (
          <div className="alert-error">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{error}</span>
          </div>
        ) : null}

        {/* Botão de Ação */}
        <button type="submit" className="btn-primary">
          Criar Conta
        </button>

      </form>

      {/* Link de Volta */}
      <div className="mt-8 text-center">
        <p className="text-sm text-slate-600">
          Já tem conta?{' '}
          <Link to="/auth/login" className="font-bold text-slate-900 hover:text-amber-600 transition-colors">
            Iniciar Sessão
          </Link>
        </p>
      </div>

    </div>
  )
}