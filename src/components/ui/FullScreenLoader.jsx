import Spinner from "./Spinner"
import { useLoading } from "../../context/LoadingContext"

export default function FullScreenLoader() {

  const { isLoading, message } = useLoading()

  if (!isLoading) return null

  return (

    <div style={{
      position: "fixed",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0,0,0,0.4)",
      zIndex: 9999
    }}>

      <div style={{
        background: "#fff",
        padding: 20,
        borderRadius: 8,
        minWidth: 240,
        textAlign: "center"
      }}>

        <Spinner />
        {message ? <div style={{ marginTop: 10 }}>{message}</div> : null}

      </div>

    </div>

  )

}