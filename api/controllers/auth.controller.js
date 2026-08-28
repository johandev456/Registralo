import { registerNewUser } from "../services/auth.service"

export const register = async (req,res)=>{
    try{
        await registerNewUser(req);
        res.status(201).json({message:"Usuario creado!"})
    
    }catch(error){
        console.log("Error ",error);
        res.status(500).json({message:"Operacion fallida!"})
    }
    




}