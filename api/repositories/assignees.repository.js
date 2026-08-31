import prisma from "../prisma/client.js"
import { getIdsFromArray, getUsernamesFromJSON, verifyUsersData } from "../utils/assignees.util.js";

export const verifyAutomation=async(automationId)=>{
    const automation=await prisma.automation.findUnique({where:{id:automationId}})
    if(automation){
        return true;
    }
    return false;
}

export const findUsersByUsername=async(usersFromRequest)=>{
    const usernames = getUsernamesFromJSON(usersFromRequest);//Basicamente convierte en array solo los valores del JSON asi se tienen solo los usernames
    

    const users =await prisma.user.findMany({
    where: {
      username: {
        in: usernames
      }
    },
    select: {
      id: true,
      username: true
    }
  })
    

  const usersDataFromDB=await verifyUsersData(users,usernames);
  
    if(usersDataFromDB){
        return users;
    }
    throw new Error("Algo salio mal en findUserByUsername de assignees repository!")

}

export const verifyAssignment=async(automationId)=>{
    const assignmentExistance= await prisma.assignee.findMany({
    where: {
      automation_id:automationId
    },
    include: {
      user: true
    }
  })
  
  if(assignmentExistance.length > 0){
        return true;
    }else{
        return false;
    }
}

export const verifyUnassignment=async(users,automationId)=>{
    const userIds = getIdsFromArray(users);
  const assignmentNonExistance= await prisma.assignee.findMany({
    where: {
      automation_id:automationId,
      user_id:{
        in: userIds
      }
    }
  })
  
  if(assignmentNonExistance.length === 0){
        return true;
    }else{
        return false;
    }
}

export const assignUsersOnDB=async(users,automationId)=>{
    
    
    try{
      await prisma.assignee.createMany({
    data: users.map((user) => ({
      automation_id: automationId,
      user_id: user.id
    })),
    skipDuplicates: true
  })
    }catch(error){
      console.log("Error en assign: "+error)
    }
    
}

export const unassignUsersOnDB=async(users,automationId)=>{
    
 
    try{
      const userIds = getIdsFromArray(users);

      await prisma.assignee.deleteMany({
        where: {
          automation_id: automationId,
          user_id: {
            in: userIds
          }
        }
      });
  
    }catch(error){
      console.log("Error en unassign: "+error)
    }
    
}


export const getAssigneesFromDB=async(automationId)=>{
    
    
   const assignees= await prisma.assignee.findMany({where:{automation_id:automationId}})
   return assignees;
}