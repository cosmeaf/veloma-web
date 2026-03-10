import React, { useEffect } from "react"

export default function Modal({
  open,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "default",
  closeOnOverlay = true,
  showFooter = true,
  loading = false,
}) {
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  const confirmButtonClass =
    variant === "danger" ? "btn-secondary" : "btn-primary"

  const handleOverlayClick = () => {
    if (closeOnOverlay) {
      onClose?.()
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={handleOverlayClick}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative z-10 w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl animate-fade-in"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div>
            <h2
              id="modal-title"
              className="text-xl font-bold text-slate-900"
            >
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"
            aria-label="Fechar modal"
          >
            ×
          </button>
        </div>

        <div className="px-6 py-5 text-sm text-slate-600 leading-relaxed">
          {children}
        </div>

        {showFooter && (
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-6 py-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="btn-tertiary"
              disabled={loading}
            >
              {cancelText}
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className={confirmButtonClass}
              disabled={loading}
            >
              {loading ? "Processando..." : confirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}