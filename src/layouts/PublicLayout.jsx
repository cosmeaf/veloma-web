import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function PublicLayout() { 
  
  const [lang, setLang] = useState("pt");

  const t = {
    pt: {
      entrar: "Entrar",
      criarConta: "Criar Conta",
      copyright: "© 2026 Veloma Contabilidade. Todos os direitos reservados.",
    },
    en: {
      entrar: "Login",
      criarConta: "Sign Up",
      copyright: "© 2026 Veloma Accounting. All rights reserved.",
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-amber-200 selection:text-amber-900">
      {/* Navbar Clean & Glassmorphism */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-2xl shadow-md shadow-amber-500/20 group-hover:shadow-lg group-hover:shadow-amber-500/30 transition-all duration-300">
              V
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              Veloma<span className="text-amber-600">.app</span>
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setLang(lang === "pt" ? "en" : "pt")}
              className="text-slate-500 hover:text-amber-600 transition flex items-center gap-2 text-sm font-medium"
            >
              <FontAwesomeIcon icon={faGlobe} /> {lang.toUpperCase()}
            </button>

            <Link to="/login" className="text-slate-600 hover:text-slate-900 font-medium transition">
              {t[lang].entrar}
            </Link>

            <Link
              to="/register"
              className="px-6 py-2.5 rounded-full font-semibold bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/30 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {t[lang].criarConta}
            </Link>
          </div>
        </div>
      </nav>

      {/* Conteúdo */}
      <main className="pt-24 min-h-[calc(100vh-64px)]">
        <Outlet /> 
      </main>

      {/* Footer Clean */}
      <footer className="bg-white border-t border-slate-200 py-10 text-center text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-6">
          <p>{t[lang].copyright}</p>
        </div>
      </footer>
    </div>
  );
}