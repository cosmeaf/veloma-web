import React from "react"
import Router from "./routes/Router"
import FullScreenLoader from "./components/ui/FullScreenLoader"

export default function App() {

  return (
    <>
      <FullScreenLoader />
      <Router />
    </>
  )

}