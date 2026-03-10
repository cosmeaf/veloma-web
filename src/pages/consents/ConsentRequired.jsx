import React, { useEffect, useMemo, useState } from "react"
import { consentApi } from "../../api/consentApi"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useToast } from "../../components/ui/Toast"
import Modal from "../../components/ui/Modal"

export default function ConsentRequired() {

  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { show } = useToast()

  const [docs, setDocs] = useState([])
  const [accepted, setAccepted] = useState({})
  const [scrolled, setScrolled] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [showExitModal, setShowExitModal] = useState(false)
  const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false)

  /*
  --------------------------------------------------
  Carrega documentos
  --------------------------------------------------
  */
  useEffect(() => {

    consentApi
      .versions()
      .then((res) => {

        const list = res.data.results || res.data || []

        setDocs(list)

      })
      .catch(() => {
        show("Erro ao carregar termos legais.", "error")
      })
      .finally(() => {
        setLoading(false)
      })

  }, [])

  /*
  --------------------------------------------------
  Timeout de sessão nesta página
  --------------------------------------------------
  */
  useEffect(() => {

    const timer = setTimeout(() => {

      setShowSessionExpiredModal(true)

    }, 300000)

    return () => clearTimeout(timer)

  }, [])

  /*
  --------------------------------------------------
  Detecta se documento precisa de scroll
  --------------------------------------------------
  */
  useEffect(() => {

    docs.forEach((doc) => {

      const el = document.getElementById(`doc-${doc.id}`)

      if (!el) return

      if (el.scrollHeight <= el.clientHeight) {

        setScrolled(prev => ({
          ...prev,
          [doc.id]: true
        }))

      }

    })

  }, [docs])

  /*
  --------------------------------------------------
  Scroll do documento
  --------------------------------------------------
  */
  const onScroll = (id, event) => {

    const el = event.target

    const bottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight - 5

    if (bottom) {

      setScrolled(prev => ({
        ...prev,
        [id]: true
      }))

    }

  }

  /*
  --------------------------------------------------
  Toggle checkbox
  --------------------------------------------------
  */
  const toggle = (id, checked) => {

    setAccepted(prev => ({
      ...prev,
      [id]: checked
    }))

  }

  /*
  --------------------------------------------------
  Verifica se todos aceitaram
  --------------------------------------------------
  */
  const allAccepted = useMemo(() => {

    return (
      docs.length > 0 &&
      docs.every(doc =>
        accepted[doc.id] && scrolled[doc.id]
      )
    )

  }, [docs, accepted, scrolled])

  /*
  --------------------------------------------------
  Submit
  --------------------------------------------------
  */
  const handleSubmit = async () => {

    if (!allAccepted) {

      show("Você precisa ler e aceitar todos os documentos.", "error")

      return

    }

    try {

      setSaving(true)

      await Promise.all(
        docs.map(doc => consentApi.accept(doc.id))
      )

      show("Termos aceitos com sucesso.", "success")

      if (user?.role === "admin") {
        navigate("/admin")
      }
      else if (user?.role === "staff") {
        navigate("/staff")
      }
      else {
        navigate("/dashboard")
      }

    }

    catch {

      show("Erro ao registrar o aceite.", "error")

    }

    finally {

      setSaving(false)

    }

  }

  /*
  --------------------------------------------------
  Logout
  --------------------------------------------------
  */
  const handleLogout = () => {

    logout()

    navigate("/login")

  }

  /*
  --------------------------------------------------
  Loading
  --------------------------------------------------
  */
  if (loading) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-slate-50">

        <div className="flex flex-col items-center gap-4">

          <div className="animate-spin w-10 h-10 rounded-full border-4 border-slate-200 border-t-slate-900" />

          <p className="text-sm text-slate-500">
            Carregando documentos...
          </p>

        </div>

      </div>

    )

  }

  /*
  --------------------------------------------------
  UI
  --------------------------------------------------
  */
  return (

    <>

      <div className="min-h-screen bg-slate-50 py-10 px-4">

        <div className="mx-auto max-w-4xl animate-fade-in">

          <div className="mb-8 flex items-start justify-between gap-4">

            <div>

              <h1 className="section-title mb-3">
                Aceite os Termos Legais
              </h1>

              <p className="section-subtitle">
                Para continuar utilizando a plataforma,
                é obrigatório ler e aceitar os documentos abaixo.
              </p>

            </div>

            <button
              type="button"
              onClick={() => setShowExitModal(true)}
              className="btn-tertiary"
            >
              Encerrar sessão
            </button>

          </div>

          {docs.map((doc) => (

            <div
              key={doc.id}
              className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >

              <h2 className="mb-2 text-xl font-semibold text-slate-900">
                {doc.term?.title || doc.title}
              </h2>

              <p className="mb-4 text-sm text-slate-400">
                Versão {doc.version}
              </p>

              <div
                id={`doc-${doc.id}`}
                className="mb-4 max-h-[350px] overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700"
                onScroll={(event) => onScroll(doc.id, event)}
              >

                <div
                  dangerouslySetInnerHTML={{
                    __html: doc.content
                  }}
                />

              </div>

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  disabled={!scrolled[doc.id]}
                  checked={accepted[doc.id] || false}
                  onChange={(e) =>
                    toggle(doc.id, e.target.checked)
                  }
                />

                <span className="text-sm text-slate-700">
                  Li e aceito este documento
                </span>

              </label>

              {!scrolled[doc.id] && (

                <p className="mt-2 text-xs text-slate-400">
                  Role até o final para habilitar o aceite.
                </p>

              )}

            </div>

          ))}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allAccepted || saving}
            className="btn-primary"
          >

            {saving
              ? "Processando..."
              : "Aceitar e continuar"
            }

          </button>

        </div>

      </div>

      <Modal
        open={showExitModal}
        title="Encerrar sessão"
        onClose={() => setShowExitModal(false)}
        onConfirm={handleLogout}
        confirmText="Sair agora"
        cancelText="Continuar aqui"
        variant="danger"
      >

        <p>
          Você ainda não concluiu o aceite dos documentos obrigatórios.
        </p>

        <p className="mt-3">
          Se sair agora, sua sessão será encerrada
          e será necessário fazer login novamente.
        </p>

      </Modal>

      <Modal
        open={showSessionExpiredModal}
        title="Sessão expirada"
        onClose={handleLogout}
        onConfirm={handleLogout}
        confirmText="Fazer login novamente"
        cancelText="Fechar"
        closeOnOverlay={false}
        variant="danger"
      >

        <p>
          O tempo máximo nesta página foi atingido.
        </p>

        <p className="mt-3">
          Por segurança, sua sessão precisa ser reiniciada.
        </p>

      </Modal>

    </>

  )

}