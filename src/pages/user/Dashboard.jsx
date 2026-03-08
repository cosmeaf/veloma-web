import React from "react"
import { useAuth } from "../../context/AuthContext"

export default function Dashboard() {

  const { user } = useAuth()

  return (
    <div>
      <h2>Profile Dashboard</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )

}