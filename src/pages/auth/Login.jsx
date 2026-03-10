import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLoading } from "../../context/LoadingContext";

export default function Login() {

  const navigate = useNavigate();
  const { login, normalizeError } = useAuth();
  const { start, stop } = useLoading();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {

    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setError("");

    try {

      start("Autenticando...");

      const result = await login({ email, password });

      const user = result.user;
      const consentAccepted = result.consentAccepted;

      /*
      ------------------------------------------------
      CONSENTIMENTO OBRIGATÓRIO
      ------------------------------------------------
      */

      if (!consentAccepted) {

        navigate("/consents");
        return;

      }

      /*
      ------------------------------------------------
      REDIRECIONAMENTO POR PAPEL
      ------------------------------------------------
      */

      if (user?.role === "admin") {
        navigate("/admin");
      }
      else if (user?.role === "staff") {
        navigate("/staff");
      }
      else {
        navigate("/dashboard");
      }

    }

    catch (err) {

      const errorMsg =
        normalizeError?.(err) ??
        err?.message ??
        "Erro ao fazer login. Tente novamente.";

      setError(errorMsg);

      console.error("Erro de login:", err);

    }

    finally {

      stop();
      setSubmitting(false);

    }

  };

  const handleChange = (setter) => (e) => {

    if (error) setError("");
    setter(e.target.value);

  };

  return (
    <div className="w-full">

      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
          Bem-vindo de volta
        </h2>
        <p className="text-slate-500 text-lg">
          Aceda ao seu painel Veloma
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6" noValidate>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-slate-700"
          >
            Email Corporativo
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="nome@velomacontabilidade.com"
            value={email}
            onChange={handleChange(setEmail)}
            className="input-veloma"
            required
            disabled={submitting}
          />
        </div>

        <div className="space-y-2">

          <div className="flex items-center justify-between">

            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-700"
            >
              Palavra-passe
            </label>

            <Link
              to="/recovery"
              className="text-sm font-medium text-slate-500 hover:text-amber-600 transition-colors"
            >
              Esqueceu-se?
            </Link>

          </div>

          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={handleChange(setPassword)}
            className="input-veloma"
            required
            disabled={submitting}
          />

        </div>

        {error && (
          <div className="alert-error animate-fade-in flex items-center gap-2">

            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>{error}</span>

          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary flex items-center justify-center gap-2 group w-full"
        >

          {submitting && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}

          {submitting ? "Autenticando..." : "Entrar no Portal"}

        </button>

      </form>

      <div className="mt-8 text-center border-t border-slate-100 pt-6">

        <p className="text-sm text-slate-600">

          Ainda não tem conta?{" "}

          <Link
            to="/register"
            className="font-bold text-slate-900 hover:text-amber-600 transition-colors"
          >
            Solicitar Acesso
          </Link>

        </p>

      </div>

    </div>
  );
}