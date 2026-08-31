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
        const usersInSafeFormat = users.map(user => ({
            user_id: user.id,
            username: user.username,
            email: user.email
        }));
        res.status(200).json(usersInSafeFormat);
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Operacion fallida al obtener usuarios!"})
    }
}
