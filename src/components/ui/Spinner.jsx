export default function Spinner() {

  return (

    <div
      aria-label="loading"
      style={{
        width: 28,
        height: 28,
        border: "3px solid #ccc",
        borderTop: "3px solid #333",
        borderRadius: "50%",
        margin: "0 auto",
        animation: "spin 0.8s linear infinite"
      }}
    />

  )

}