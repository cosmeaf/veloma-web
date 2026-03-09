import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptopHouse,
  faChartLine,
  faShieldAlt,
  faArrowRight,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const highlights = [
  { 
    icon: faLaptopHouse, 
    title: "100% Digital", 
    desc: "Envie documentos e acompanhe tudo online, sem papelada desnecessária." 
  },
  { 
    icon: faShieldAlt, 
    title: "Segurança Fiscal", 
    desc: "Cumprimento rigoroso de obrigações para evitar multas e dores de cabeça." 
  },
  { 
    icon: faChartLine, 
    title: "Foco no Seu Negócio", 
    desc: "Nós cuidamos da contabilidade para você se concentrar em crescer." 
  },
];

export default function LandingPage() {
  return (
    <div className="relative bg-slate-50">
      {/* Hero Section */}
      <header className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-[120px] opacity-70" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-[100px] opacity-70" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider mb-6">
    Contabilidade & Gestão
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-amber-600 bg-clip-text text-transparent mb-6 leading-tight">
            Veloma Contabilidade
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-10 font-light leading-relaxed">
            Apoio contabilístico, fiscal e financeiro para empresas e profissionais independentes.
            Aliamos experiência com processos digitais para um serviço simples e transparente.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/proposal"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-lg font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-xl hover:shadow-slate-900/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              Ver Serviços <FontAwesomeIcon icon={faArrowRight} className="ml-3" />
            </Link>
            <Link
              to="/register"
              className="px-8 py-4 rounded-full text-lg font-semibold text-slate-700 bg-white border border-slate-200 hover:border-amber-400 hover:text-amber-600 transition-all duration-300 shadow-sm"
            >
              Criar Conta
            </Link>
          </div>
        </div>
      </header>

      {/* Highlights / Diferenciais */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Por que escolher a Veloma?</h2>
            <p className="text-slate-500 text-lg">Simplificamos a sua vida fiscal.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl hover:bg-slate-50 transition-colors duration-300"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-3xl mb-6 shadow-sm">
                  <FontAwesomeIcon icon={h.icon} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{h.title}</h3>
                <p className="text-slate-600 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Breve resumo do que fazemos */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Tudo o que a sua empresa precisa
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            {[
              "Contabilidade organizada", 
              "Apoio Fiscal", 
              "Processamento Salarial", 
              "Entrega de IRS/IRC", 
              "Abertura de Empresas", 
              "Acompanhamento Mensal", 
              "Planeamento Fiscal", 
              "Apoio Administrativo"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-700">
                <FontAwesomeIcon icon={faCheck} className="text-amber-500 text-xs" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-slate-900">
            Pronto para crescer sem preocupações fiscais?
          </h2>
          <Link
            to="/register"
            className="inline-flex items-center px-10 py-4 rounded-full text-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-xl shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1"
          >
            Falar com um Contabilista
          </Link>
        </div>
      </section>
    </div>
  );
}