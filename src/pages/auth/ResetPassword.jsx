import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLoading } from "../../context/LoadingContext";

export default function ResetPassword() {

  const navigate = useNavigate();
  const location = useLocation();

  // Pega o token diretamente do estado de navegação (não precisa de useState para isso)
  const token = location.state?.token;

  const { resetPassword, normalizeError } = useAuth();
  const { start, stop } = useLoading();

  const [password, setPass] = useState("");
  const [password2, setPass2] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  // SEGURANÇA: Se o token não existir (ex: usuário refreshou a página),
  // redireciona para o início do fluxo.
  useEffect(() => {
    if (!token) {
      navigate("/recovery");
    }
  }, [token, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    try {
      start("Redefinindo senha...");

      // Envia o token silenciosamente junto com as senhas
      const res = await resetPassword({ token, password, password2 });
      
      setMsg(res.message || res.detail || "Senha alterada com sucesso.");

      // Redireciona para o login após sucesso
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setError(normalizeError(err));
    } finally {
      stop();
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="section-title">Nova Senha</h2>
        <p className="section-subtitle">
          Defina sua nova palavra-passe de acesso
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        
        {/* CAMPO DE TOKEN REMOVIDO - Ele é enviado automaticamente */}

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
            Nova Palavra-passe
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPass(e.target.value)}
            className="input-veloma"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password2" className="block text-sm font-semibold text-slate-700">
            Confirmar Nova Palavra-passe
          </label>
          <input
            id="password2"
            type="password"
            placeholder="••••••••"
            value={password2}
            onChange={(e) => setPass2(e.target.value)}
            className="input-veloma"
            required
          />
        </div>

        {msg ? (
          <div className="p-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            <span>{msg}</span>
          </div>
        ) : null}

        {error ? (
          <div className="alert-error">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{error}</span>
          </div>
        ) : null}

        <button type="submit" className="btn-primary w-full">
          Salvar Nova Senha
        </button>

      </form>

      <div className="mt-8 text-center">
        <Link to="/login" className="text-sm text-slate-500 hover:text-amber-600 font-medium transition-colors">
          ← Voltar para o Login
        </Link>
      </div>
    </div>
  );
}