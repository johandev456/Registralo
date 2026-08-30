import { getAllUsersService, getUserService } from "../services/user.service.js";

export const getUser=async(req,res)=>{
    
    try{
        const user= await getUserService(req.params.id);

        res.status(200).json(user);
    }catch (error){
        console.log(error)
        res.status(500).json({message:"Operacion fallida al obtener usuario!"})

    }
    
}
export const getAllUsers= async(req,res)=>{
    try{
        const users= await getAllUsersService();

        res.status(200).json(users);
    }catch(error){
        console.log(error)
        es.status(500).json({message:"Operacion fallida al obtener usuarios!"})
    }
}
