import  "../styles/StatusBadge.css"

const StatusBadge = ({ state }) => {
  return <span className={`${styles.badge} ${styles[state]}`}>{state}</span>
}

export default StatusBadge;