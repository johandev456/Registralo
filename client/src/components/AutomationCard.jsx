import { useNavigate } from "react-router-dom"
import StatusBadge from "./StatusBadge"
import styles from "../styles/automationCard.module.css"
import { useEffect, useState } from "react"
import { getAssignees } from "../services/assignee.service"
import { getAllUsers } from "../services/user.service"

const AutomationCard = ({ automation }) => {
  const navigate = useNavigate()
  const [assignees,SetAssignees]=useState([])
  const [allUsers,SetallUsers]=useState([])

  useEffect(
    ()=>{
      const loadAssignees=async()=>{
        try{
          const assigneesFromDB= await getAssignees(automation.id)
          const allUsersFromDB= await getAllUsers();
          SetAssignees(assigneesFromDB?.data || [])
          SetallUsers(allUsersFromDB?.data || [])
          
        }
        catch (error) {
        console.error("Error cargando datos:", error);
      }
      }
      loadAssignees();
    }
  )
  return (
    <div className={styles.card} onClick={() => navigate(`/automations/${automation.id}`)}>
      <div className={styles.header}>
        <h3 className={styles.name}>{automation.name}</h3>
        <StatusBadge state={automation.state} />
      </div>
      <span className={styles.name}>
        Encargados: 
      </span>
      <p className={styles.description}>{assignees.map((user, index) => (
          <span key={index}>{allUsers.find(u => u.user_id === user.user_id)?.username || "Desconocido"}, </span>
        ))}</p>
      
      <p className={styles.description}>{automation.description || "Sin descripción"}</p>
      <p className={styles.date}>
        Implementado: {new Date(automation.start).toLocaleDateString()}
      </p>
    </div>
  )
}

export default AutomationCard