import prisma from "../prisma/client.js";

export const addAutoToDB=async (formData)=>{
    console.log(formData)
    const newAuto= await prisma.automation.create({data:{ ...formData,start: new Date(formData.start)}})
    console.log(newAuto)
}