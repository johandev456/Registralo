import { useNavigate } from "react-router-dom"
import { logout } from "../services/auth.service"
import { useAuthStore } from "../store/authStore"
import styles from "../styles/navbar.module.css"

const Navbar = () => {
  const user = useAuthStore((state) => state.user)
  const clearUser = useAuthStore((state) => state.clearUser)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    clearUser()
    navigate("/login")
  }

  return (
    <nav className={styles.navbar}>
      <span className={styles.brand} onClick={() => navigate("/")}>
        Registralo
      </span>
      <div className={styles.right}>
        <span className={styles.username}>{user?.username}</span>
        <button onClick={handleLogout} className={styles.button}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  )
}

export default Navbar