import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAutomation, deleteAutomation } from "../services/automation.service"
import StatusBadge from "../components/StatusBadge"
import styles from "../styles/automationDetail.module.css"

const AutomationDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [automation, setAutomation] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAutomation(id)
      .then(setAutomation)
      .catch(() => navigate("/"))
      .finally(() => setLoading(false))
  }, [id])

  const handleDelete = async () => {
    if (!confirm("¿Seguro que deseas eliminar esta automatización?")) return
    await deleteAutomation(id)
    navigate("/")
  }

  if (loading) return <p className={styles.loading}>Cargando...</p>
  if (!automation) return null

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>{automation.name}</h1>
          <StatusBadge state={automation.state} />
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Descripción</span>
          <p>{automation.description || "Sin descripción"}</p>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Fecha de implementación</span>
          <p>{new Date(automation.start).toLocaleDateString()}</p>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Comentarios</span>
          <p>{automation.comments || "Sin comentarios"}</p>
        </div>

        <div className={styles.actions}>
          <button onClick={() => navigate(-1)} className={styles.back}>
            Volver
          </button>
          <button onClick={() => navigate(`/automations/${id}/edit`)} className={styles.edit}>
            Editar
          </button>
          <button onClick={() => navigate(`/automations/${id}/assign`)} className={styles.assign}>
            Asignar
          </button>
          <button onClick={handleDelete} className={styles.delete}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default AutomationDetail