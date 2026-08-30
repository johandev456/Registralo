import { assignUsersServices } from "../services/assignees.service.js";

export const assignUsers= async (req,res)=>{
    
    try{
        const {users,automation} =req.body;
        await assignUsersServices(users,automation);

        res.status(200).json({message: "Usuarios asignados exitosamente"})
    }catch(error){
        res.status(500).json({message:"Error al asignar usuarios"})
    }


}

export const unassignUsers = async (req,res)=>{

}