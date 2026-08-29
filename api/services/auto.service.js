import { addAutoToDB, getAllAutoFromDB, getAutoFromDB } from "../repositories/auto.repository.js";


export const addAutoService = async (formData)=>{
    
        await addAutoToDB(formData);
    
}

export const getAutoService = async(autoId)=>{
    const automation= getAutoFromDB(autoId);
    if(automation){
        return automation;
    }else{
        throw new Error("No se puedo encontrar automatizacion!")
    }
    
    
}
export const getAllAutoService = async(autoId)=>{
    const automations= getAllAutoFromDB();
    if(automations){
        return automations;
    }else{
        throw new Error("No se puedo encontrar las automatizaciones!")
    }
    
    
}