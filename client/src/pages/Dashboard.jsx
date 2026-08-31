import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllAutomations } from "../services/automation.service"
import AutomationCard from "../components/AutomationCard"
import styles from "../styles/Dashboard.module.css"

const Dashboard = () => {
  const [automations, setAutomations] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getAllAutomations()
      .then(setAutomations)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Automatizaciones</h1>
        <button className={styles.button} onClick={() => navigate("/automations/new")}>
          + Nueva
        </button>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : automations.length === 0 ? (
        <p className={styles.empty}>No hay automatizaciones registradas.</p>
      ) : (
        <div className={styles.grid}>
          {automations.map((auto) => (
            <AutomationCard key={auto.id} automation={auto} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard