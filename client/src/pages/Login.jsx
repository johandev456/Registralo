import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login, verifyActiveSession } from "../services/auth.service"
import { useAuthStore } from "../store/authStore"
import styles from "../styles/Login.css"

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const setUser = useAuthStore((state) => state.setUser)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await login(form.username, form.password)
      const username = await verifyActiveSession()
      setUser({ username })
      navigate("/")
    } catch {
      setError("Usuario o contraseña incorrectos")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Registralo</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="username"
            placeholder="Usuario"
            value={form.username}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className={styles.input}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? "Cargando..." : "Iniciar sesion"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login