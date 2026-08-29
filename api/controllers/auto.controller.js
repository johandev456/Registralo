import { addAutoService } from "../services/auto.service.js";


export const addAuto = async (req, res)=>{
    const formData= req.body;
    try{
        addAutoService(formData);
        res.status(200).json({message:"Operacion exitosa, automatizacion creada!"})
    }catch (error){
        console.log(error)
        res.status(500).json({message:"Operacion fallida al crear automatizacion!"})
    }
    

}

export const getAuto = async (req, res)=>{
    
}
export const getAllAutos= async(req,res)=>{

}

export const modifyAuto = async (req, res)=>{
    
}
export const deleteAuto = async(req,res)=>{

}