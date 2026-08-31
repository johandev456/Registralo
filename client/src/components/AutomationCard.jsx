import { useNavigate } from "react-router-dom"
import StatusBadge from "./StatusBadge"
import styles from "../styles/automationCard.module.css"

const AutomationCard = ({ automation }) => {
  const navigate = useNavigate()

  return (
    <div className={styles.card} onClick={() => navigate(`/automations/${automation.id}`)}>
      <div className={styles.header}>
        <h3 className={styles.name}>{automation.name}</h3>
        <StatusBadge state={automation.state} />
      </div>
      <p className={styles.description}>{automation.description || "Sin descripción"}</p>
      <p className={styles.date}>
        Implementado: {new Date(automation.start).toLocaleDateString()}
      </p>
    </div>
  )
}

export default AutomationCard