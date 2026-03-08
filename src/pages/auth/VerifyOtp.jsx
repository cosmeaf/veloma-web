import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLoading } from "../../context/LoadingContext";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOtp } = useAuth();
  const { start, stop } = useLoading();

  // Recupera o email (mas não mostra ao usuário)
  const email = location.state?.email;

  // Estado do OTP (array de 6 strings vazias)
  const [otp, setOtp] = useState(new Array(6).fill(""));
  
  // Estados de controle
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos
  const [isExpired, setIsExpired] = useState(false);

  // Refs para controlar o foco de cada input
  const inputRefs = useRef([]);

  // Inicializa os refs
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Lógica do Timer
  useEffect(() => {
    if (!email) {
      navigate("/recovery");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  // Formatação do Tempo (MM:SS)
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Manipulação da mudança nos inputs
  const handleChange = (e, index) => {
    const value = e.target.value;
    
    // Permite apenas números
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    // Pega apenas o último caractere digitado (caso cole algo com mais de 1 dígito)
    newOtp[index] = value.slice(-1); 
    setOtp(newOtp);

    // Move foco para o próximo input
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Manipulação de teclas (Backspace)
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Manipulação de Colar (Paste)
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    
    if (pastedData.every((char) => /^\d$/.test(char))) {
      const newOtp = [...otp];
      pastedData.forEach((char, index) => {
        newOtp[index] = char;
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = char; // Atualiza visualmente
        }
      });
      setOtp(newOtp);
      
      // Foca no último preenchido ou no próximo vazio
      const nextIndex = pastedData.length;
      if (nextIndex < 6 && inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
    }
  };

    const onSubmit = async (e) => {
    e.preventDefault();
    if (isExpired) return;

    // Remove espaços extras e junta o código
    const cleanEmail = email?.trim();
    const codeValue = otp.join("").trim(); 

    if (!cleanEmail) {
      setError("E-mail perdido. Por favor, recomece a recuperação.");
      setTimeout(() => navigate("/recovery"), 2000);
      return;
    }

    if (codeValue.length < 6) {
      setError("Por favor, preencha todos os dígitos.");
      return;
    }

    setError("");
    
    try {
      start("Validando código...");
      
      console.log("Enviando para API:", { email: cleanEmail, code: codeValue });

      // IMPORTANTE: Capture a resposta da API
      const res = await verifyOtp({ email: cleanEmail, code: codeValue });
      
      console.log("Resposta da API:", res);

      // SUCESSO: Pega o token real da resposta e manda para a próxima tela
      if (res?.reset_token) {
        navigate("/reset-password", { 
          state: { 
            token: res.reset_token, // Usa o token real do backend
            email: cleanEmail 
          } 
        });
      } else {
        throw new Error("Token não retornado pela API.");
      }
      
    } catch (err) {
      console.error("Erro no VerifyOtp:", err);
      console.error("Response Data:", err.response?.data);
      
      // Tenta pegar a mensagem específica do erro
      const errorMsg = err.response?.data?.detail || 
                      err.response?.data?.code?.[0] || 
                      err.response?.data?.email?.[0] ||
                      "Código inválido ou expirado.";
                      
      setError(errorMsg);
      
      // Limpa os inputs em caso de erro
      setOtp(new Array(6).fill(""));
      if(inputRefs.current[0]) inputRefs.current[0].focus();
    } finally {
      stop();
    }
  };

  const handleResend = () => {
    navigate("/recovery", { state: { email } });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Verificar Código</h2>
        <p className="text-slate-500">
          Enviamos um código de 6 dígitos para o seu e-mail.
        </p>
      </div>

      {/* Relógio Regressivo */}
      <div className={`mb-8 text-center font-mono text-3xl font-bold tracking-widest ${isExpired ? 'text-red-500' : 'text-slate-700'}`}>
        {isExpired ? "00:00" : formatTime(timeLeft)}
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="flex justify-between gap-2">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              disabled={isExpired}
              className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold border rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
                transition-all 
                ${isExpired ? 'bg-slate-100 border-slate-200 text-slate-400' : 'bg-white border-slate-300 text-slate-800'}`}
            />
          ))}
        </div>

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg text-center">
            {error}
          </div>
        )}

        <button 
          type="submit" 
          className="btn-primary w-full py-3" 
          disabled={isExpired || otp.join("").length < 6}
        >
          Verificar
        </button>
      </form>

      <div className="mt-8 text-center space-y-3">
        {isExpired ? (
          <button 
            onClick={handleResend}
            className="text-amber-600 font-semibold hover:underline"
          >
            Código expirado. Clique para solicitar novo.
          </button>
        ) : (
          <button 
            onClick={handleResend}
            className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            Não recebeu? Reenviar código
          </button>
        )}

        <div>
          <Link to="/login" className="text-xs text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1">
            <span>←</span> Voltar para o Login
          </Link>
        </div>
      </div>
    </div>
  );
}