import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faLaptopCode,
  faPassport,
  faComments,
  faHandshake,
  faBuilding,
  faCheckDouble,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

// Dados baseados no seu texto
const servicesList = [
  "Contabilidade organizada",
  "Apoio fiscal e obrigações",
  "Processamento salarial",
  "Entrega de IRS e IRC",
  "Apoio na abertura de empresas",
  "Acompanhamento mensal",
  "Apoio administrativo e fiscal",
];

const digitalBenefits = [
  { icon: faLaptopCode, title: "Envio Simples", text: "Envie documentos digitalmente" },
  { icon: faPassport, title: "Acompanhamento", text: "Veja o estado dos pedidos" },
  { icon: faComments, title: "Alertas", text: "Avisos sobre obrigações fiscais" },
  { icon: faHandshake, title: "Comunicação", text: "Contacte a equipa facilmente" },
];

const supportPhases = [
  "Criação de empresa",
  "Crescimento do negócio",
  "Organização financeira",
  "Planeamento fiscal",
];

const workSteps = [
  { num: "01", title: "Conhecemos o negócio", desc: "Análise detalhada da sua atividade." },
  { num: "02", title: "Organizamos a documentação", desc: "Estruturação contabilística completa." },
  { num: "03", title: "Acompanhamos obrigações", desc: "Monitorização fiscal rigorosa." },
  { num: "04", title: "Comunicação próxima", desc: "Transparência total com o cliente." },
];

export default function Proposal() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Institucional */}
      <header className="bg-white border-b border-slate-200 pt-24 pb-16 lg:pt-28 lg:pb-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Os Nossos Serviços
          </h1>
          <p className="text-xl text-slate-500 font-light mb-8 max-w-2xl mx-auto">
            Contabilidade moderna para empresas e profissionais. Deixe a gestão connosco e foque no crescimento do seu negócio.
          </p>
        </div>
      </header>

      {/* O Que Fazemos */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">O que fazemos</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Prestamos serviços de contabilidade e apoio à gestão para empresas de diferentes setores, garantindo que todas as obrigações legais são cumpridas com rigor.
              </p>
              <ul className="space-y-3">
                {servicesList.map((service, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <FontAwesomeIcon icon={faCheckDouble} className="text-amber-500" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Imagem/Ilustração placeholder visual */}
            <div className="bg-slate-100 rounded-2xl p-8 flex items-center justify-center h-full min-h-[300px] border border-slate-200">
              <div className="text-center">
                <FontAwesomeIcon icon={faCalculator} className="text-6xl text-slate-300 mb-4" />
                <p className="text-slate-400 font-medium">Gestão Completa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Digital (Dark) */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <span className="text-amber-400 font-bold tracking-wider uppercase text-sm mb-2 block">
                Abordagem Moderna
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Contabilidade moderna e digital
              </h2>
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                A Veloma aposta na modernização para facilitar a sua vida. Com a nossa abordagem digital, o processo é mais rápido, organizado e transparente.
              </p>
            </div>
            
            <div className="lg:w-1/2 w-full grid grid-cols-2 gap-4">
              {digitalBenefits.map((item, i) => (
                <div key={i} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-5 rounded-xl hover:bg-slate-800 transition-colors">
                  <FontAwesomeIcon icon={item.icon} className="text-amber-400 text-xl mb-3" />
                  <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                  <p className="text-slate-400 text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Apoio e Processo */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            
            {/* Apoio ao Empresário */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <FontAwesomeIcon icon={faHandshake} className="text-amber-500" />
                Apoio ao Empresário
              </h2>
              <p className="text-slate-600 mb-6">
                Mais do que cumprir obrigações, ajudamos a compreender a situação financeira do negócio em cada fase.
              </p>
              <ul className="space-y-4">
                {supportPhases.map((phase, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </div>
                    <span className="text-slate-700 font-medium">{phase}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Como Trabalhamos */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Como Trabalhamos</h2>
              <div className="space-y-6 relative">
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-200 -z-10"></div>
                {workSteps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {step.num}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{step.title}</h4>
                      <p className="text-sm text-slate-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Abrir Empresa em Portugal (Card Destaque) */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">
            <div className="p-10 md:w-2/3">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
                  <FontAwesomeIcon icon={faBuilding} className="text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Abrir Empresa em Portugal</h2>
              </div>
              <p className="text-slate-600 mb-6">
                Se pretende abrir uma empresa, a equipa da Veloma apoia em todo o processo, desde a escolha da forma jurídica até ao enquadramento fiscal.
              </p>
              <ul className="space-y-2 mb-8 text-slate-700">
                <li className="flex items-center gap-2"><span className="text-amber-500">•</span> Escolha da forma jurídica</li>
                <li className="flex items-center gap-2"><span className="text-amber-500">•</span> Registo da empresa</li>
                <li className="flex items-center gap-2"><span className="text-amber-500">•</span> Organização contabilística inicial</li>
              </ul>
              <Link
                to="/contact"
                className="inline-flex items-center text-amber-600 font-bold hover:text-amber-700 transition-colors"
              >
                Agendar reunião <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Link>
            </div>
            <div className="bg-slate-900 p-10 md:w-1/3 flex flex-col justify-center items-center text-white text-center">
              <h3 className="text-xl font-bold mb-4">Fale Connosco</h3>
              <p className="text-slate-400 mb-6 text-sm">
                Teremos todo o gosto em analisar a sua situação.
              </p>
              <Link
                to="/register"
                className="w-full py-3 rounded-lg bg-amber-500 text-slate-900 font-bold hover:bg-amber-400 transition-colors"
              >
                Começar Agora
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}