import prisma from "../prisma/client.js";

export const addAutoToDB=async (formData)=>{
    
    await prisma.automation.create({data:{ ...formData,start: new Date(formData.start)}})
    
}
export const modifyAutoToDB=async (formData,automationId)=>{
    
    await prisma.automation.update({
    where: { id:automationId },
    data: {
      ...formData,
      start: new Date(formData.start)
    }
  });
    
}
export const deleteAutoFromDB=async(automationId)=>{
    await prisma.automation.delete({where:{ id:automationId}})
}
export const getAutoFromDB= async (autoId)=>{
    const automation= prisma.automation.findUnique({where:{id:autoId}})
    return automation
}
export const getAllAutoFromDB= async ()=>{
    const automations= prisma.automation.findMany();
    return automations
}