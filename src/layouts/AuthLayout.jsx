import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AuthLayout = () => {

  return (
    <div className="layout-auth-container font-sans">
      
      {/* Lado Esquerdo: Showcase */}
      <div className="layout-auth-showcase">
        
        <div className="layout-auth-bg-pattern"></div>
        <div className="layout-auth-blob top-[-10%] left-[-10%] w-96 h-96 bg-amber-500"></div>
        <div className="layout-auth-blob bottom-[-10%] right-[-10%] w-80 h-80 bg-blue-600 opacity-30 blur-[100px]"></div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
            <span className="font-bold text-xl text-white">V</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Veloma<span className="text-amber-400">.app</span></h1>
            <p className="text-xs text-slate-400 uppercase tracking-widest">Contabilidade Inteligente</p>
          </div>
        </div>

        <div className="relative z-10 max-w-lg space-y-8">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white">
              O Futuro da <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                Gestão Fiscal
              </span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Sistema ERP/CRM completo. Automatize o TOConline, converta extratos e gerencie clientes com a tecnologia que Portugal precisa.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
              <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">Gestão Integrada</h3>
                <p className="text-sm text-slate-400">ERP e CRM em um único lugar.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
              <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 17h.01m0 0h.01M4 15.999V7a2 2 0 012-2h12a2 2 0 012 2v8.999a2 2 0 01-2 2H6a2 2 0 01-2-1.999z"></path></svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">Automação Fiscal</h3>
                <p className="text-sm text-slate-400">Leitura QRCode e conversão bancária.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Veloma Contabilidade.
        </div>
      </div>
      <div className="layout-auth-form-area">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>

        <div className="w-full max-w-md relative z-10">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;