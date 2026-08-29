import prisma from "../prisma/client.js";

export const addAutoToDB=async (formData)=>{
    
    const newAuto= await prisma.automation.create({data:{ ...formData,start: new Date(formData.start)}})
    
}

export const getAutoFromDB= async (autoId)=>{
    const automation= prisma.automation.findUnique({where:{id:autoId}})
    return automation
}
export const getAllAutoFromDB= async ()=>{
    const automations= prisma.automation.findMany();
    return automations
}