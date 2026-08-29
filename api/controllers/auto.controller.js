import { addAutoService, getAllAutoService, getAutoService } from "../services/auto.service.js";


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
    const autoId=req.params.id;
    try{
       const automation=  await getAutoService(autoId);
       res.status(200).json(automation)
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Operacion fallida al obtener automatizacion!"})
    }
    
}
export const getAllAutos= async(req,res)=>{

    try{
       const automations=  await getAllAutoService();
       res.status(200).json(automations)
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Operacion fallida al obtener automatizaciones!"})
    }
}

export const modifyAuto = async (req, res)=>{
    
}
export const deleteAuto = async(req,res)=>{

}