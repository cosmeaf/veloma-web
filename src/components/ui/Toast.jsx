import { createContext, useContext, useState } from "react"

const ToastContext = createContext()

export function ToastProvider({ children }) {

  const [toasts, setToasts] = useState([])

  const show = (message, type = "success") => {

    const id = Date.now()

    setToasts(prev => [
      ...prev,
      { id, message, type }
    ])

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)

  }

  return (

    <ToastContext.Provider value={{ show }}>

      {children}

      <div className="fixed top-6 right-6 z-50 space-y-3">

        {toasts.map(t => (

          <div
            key={t.id}
            className={`
              px-4 py-3 rounded-xl shadow-lg text-sm font-semibold
              ${t.type === "error" ? "bg-red-500 text-white" : ""}
              ${t.type === "success" ? "bg-slate-900 text-white" : ""}
            `}
          >
            {t.message}
          </div>

        ))}

      </div>

    </ToastContext.Provider>

  )

}

export function useToast() {
  return useContext(ToastContext)
}