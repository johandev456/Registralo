import { assignUsersServices,getAssigneesServices,unassignUsersServices } from "../services/assignees.service.js";

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
    try{
        console.log("llego? +"+req.body)
        const {users,automation} =req.body;
        await unassignUsersServices(users,automation);

        res.status(204).json()
    }catch(error){
        res.status(500).json({message:"Error al desasignar usuarios "+error})
    }

}

export const getAssignees= async (req,res)=>{
    try{
        const automationId=req.params.id;
        const assignees=await getAssigneesServices(automationId);

        res.status(200).json(assignees)
    }catch(error){
        res.status(500).json({message:"Error al desasignar usuarios"})
    }
}