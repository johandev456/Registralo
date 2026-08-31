import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createAutomation, getAutomation, updateAutomation } from "../services/automation.service"
import styles from "../styles/automationForm.module.css"

const AutomationForm = () => {
  const { id } = useParams()
  const isEditing = !!id
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    description: "",
    state: "Activo",
    start: "",
    comments: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isEditing) {
      getAutomation(id)
        .then((data) => {
          setForm({
            name: data.name,
            description: data.description || "",
            state: data.state,
            start: data.start.slice(0, 10), // formato yyyy-mm-dd para el input
            comments: data.comments || ""
          })
        })
        .catch(() => setError("No se pudo cargar la automatización"))
    }
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      if (isEditing) {
        await updateAutomation(id, form)
      } else {
        await createAutomation(form)
      }
      navigate("/")
    } catch {
      setError("Ocurrió un error al guardar")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          {isEditing ? "Editar automatización" : "Nueva automatización"}
        </h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Nombre</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <label className={styles.label}>Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className={styles.textarea}
            rows={3}
          />

          <label className={styles.label}>Estado</label>
          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            className={styles.input}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
            <option value="Mantenimiento">Mantenimiento</option>
          </select>

          <label className={styles.label}>Fecha de implementación</label>
          <input
            type="date"
            name="start"
            value={form.start}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <label className={styles.label}>Comentarios</label>
          <textarea
            name="comments"
            value={form.comments}
            onChange={handleChange}
            className={styles.textarea}
            rows={3}
          />

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={styles.cancel}
            >
              Cancelar
            </button>
            <button type="submit" disabled={loading} className={styles.submit}>
              {loading ? "Guardando..." : isEditing ? "Guardar cambios" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AutomationForm