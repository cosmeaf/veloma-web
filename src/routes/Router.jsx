import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { routes } from "./routesConfig";

// Layouts
import AuthLayout from "../layouts/AuthLayout";
import PublicLayout from "../layouts/PublicLayout"; // <--- IMPORTANTE: Adicionei de volta

// Guards
import AuthGuard from "../guards/AuthGuard";
import RoleGuard from "../guards/RoleGuard";

// Páginas Públicas
import LandingPage from "../pages/public/LandingPage"; // <--- Adicionei
import Proposal from "../pages/public/Proposal";       // <--- Adicionei

// Páginas de Autenticação
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Recovery from "../pages/auth/Recovery";
import VerifyOtp from "../pages/auth/VerifyOtp";
import ResetPassword from "../pages/auth/ResetPassword";

export default function Router() {
  return (
    <Routes>
      {/* =========================================
          1. ROTAS PÚBLICAS (Landing Page, Proposal)
             Precisam vir primeiro para não serem pegas pelo redirect "/"
         ========================================= */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/proposal" element={<Proposal />} />
      </Route>

      {/* =========================================
          2. ROTAS DE AUTENTICAÇÃO (Login, Register, etc.)
         ========================================= */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* =========================================
          3. ROTAS INTERNAS (Dashboard e Sistema)
             Protegidas por AuthGuard + RoleGuard
         ========================================= */}
      {routes.map((group) => {
        const Layout = group.layout;
        
        return (
          <Route
            key={group.role}
            element={
              <AuthGuard>
                <RoleGuard allow={group.role}>
                  <Layout />
                </RoleGuard>
              </AuthGuard>
            }
          >
            {group.routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        );
      })}

      {/* =========================================
          4. ROTA DE FUGA (Catch-all)
             Redireciona qualquer rota desconhecida para a Home
         ========================================= */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}