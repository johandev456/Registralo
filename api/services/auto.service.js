import { addAutoToDB } from "../repositories/auto.repository.js";


export const addAutoService = async (formData)=>{
    
        await addAutoToDB(formData);
    
}

