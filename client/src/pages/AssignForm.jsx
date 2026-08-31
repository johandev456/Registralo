import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllUsers } from "../services/user.service";


const AssignForm =()=>{
      const [loading, setLoading] = useState(false)
      const { id } = useParams();
      const navigate = useNavigate()
      const [form, setForm] = useState({
    "automation":id,
    "users":{}
  })

    const[users,setUsers]=useState(getAllUsers)
    const[assignedUsers,setAssignedUsers]=useState({})
    useEffect(() => {
    
        //Aqui va el obtener assignees.
        //queda pendiente hay que crear 1 controller de assignees para ver por automation ID
    }
  , [id])
    return(
        <></>
    )
}

export default AssignForm;