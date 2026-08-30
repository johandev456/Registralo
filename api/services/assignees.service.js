import { assignUsersOnDB, findUsersByUsername, verifyAssignment, verifyAutomation } from "../repositories/assignees.repository.js";

export const assignUsersServices=async(users,automationId)=>{
    const automationExistance=await verifyAutomation(automationId);
    
    const usersData= await findUsersByUsername(users);

    const operation= await assignUsersOnDB(usersData,automationId);
    
    const verificationOfAssignment= await verifyAssignment(automationId);
    
    if(!verificationOfAssignment || !automationExistance){
        throw new Error("No se pudo asignar usuario!")
    }
}

