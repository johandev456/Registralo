import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllUsers } from "../services/user.service";
import { getAssignees, assignUsers, unassignUsers } from "../services/assignee.service";
import { userFormatting } from "../utils/userFormatting";
import styles from "../styles/AssignForm.module.css";


const AssignForm = () => {
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [unassignedUsers, setUnassignedUsers] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  // Cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [assignees, users] = await Promise.all([
          getAssignees(id),
          getAllUsers()
        ]);
        
        setAssignedUsers(assignees?.data || []);
        setAllUsers(users?.data || []);
        
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
    
  }, [id]);

  // Agregar usuario a los asignados
  const handleAddUser = (user) => {
    setUnassignedUsers(unassignedUsers.filter(u => u.user_id !== user.user_id));
    if (!assignedUsers.find(u => u.user_id === user.user_id)) {
     
      setAssignedUsers([...assignedUsers, user]);
    }
  };

  // Remover usuario de los asignados
  const handleRemoveUser = (userId) => {
    setAssignedUsers(assignedUsers.filter(u => u.user_id !== userId));
    const unassigneedUser = getUsernameWithId(userId);
    setUnassignedUsers([...unassignedUsers, unassigneedUser]);
  };

  // Guardar cambios
  const handleSave = async () => {
    try {
      setLoading(true);
      await assignUsers(id, assignedUsers);
      await unassignUsers(id,unassignedUsers);
      navigate(`/automations/${id}`);
    } catch (error) {
      console.error("Error guardando cambios:", error);
    } finally {
      setLoading(false);
    }
  };

  // Obtener usuarios disponibles (no asignados)
  const availableUsers = allUsers.filter(
    user => !assignedUsers.find(assigned => assigned.user_id === user.user_id)
  );
  const getUsernameWithId= (userId)=>{
    return allUsers.find(user=>user.user_id===userId)
  }
  return (
    <div className={styles.container}>
      <h1>Asignar Usuarios</h1>
      
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className={styles.gridContainer}>
          {/* Usuarios Asignados */}
          <div className={styles.section}>
            <h2>Usuarios Asignados ({assignedUsers.length})</h2>
            <div className={styles.usersList}>
              {assignedUsers.length === 0 ? (
                <p className={styles.emptyMessage}>No hay usuarios asignados</p>
              ) : (
                assignedUsers.map(user => (
                  <div key={user.user_id} className={styles.userItem}>
                    <span>{allUsers.find(u => u.user_id === user.user_id)?.username || "Usuario desconocido"}</span> 
                    <button 
                      onClick={() => handleRemoveUser(user.user_id)}
                      className={`${styles.button} ${styles.removeButton}`}
                    >
                      Remover
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Usuarios Disponibles */}
          <div className={styles.section}>
            <h2>Usuarios Disponibles ({availableUsers.length})</h2>
            <div className={styles.usersList}>
              {availableUsers.length === 0 ? (
                <p className={styles.emptyMessage}>Todos los usuarios están asignados</p>
              ) : (
                availableUsers.map(user => (
                  <div key={user.user_id} className={styles.userItem}>
                    <span>{user.username}</span>
                    <button 
                      onClick={() => handleAddUser(user)}
                      className={`${styles.button} ${styles.addButton}`}
                    >
                      Agregar
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Botones de Accion */}
      <div className={styles.actionButtons}>
        <button 
          onClick={handleSave}
          disabled={loading}
          className={styles.saveButton}
        >
          Guardar Cambios
        </button>
        <button 
          onClick={() => navigate(-1)}
          className={styles.cancelButton}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default AssignForm;