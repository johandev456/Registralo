import { assignUsersOnDB, findUsersByUsername, getAssigneesFromDB, unassignUsersOnDB, verifyAssignment, verifyAutomation, verifyUnassignment } from "../repositories/assignees.repository.js";

export const assignUsersServices=async(users,automationId)=>{
    const automationExistance=await verifyAutomation(automationId);
    
    const usersData= await findUsersByUsername(users);

    const operation= await assignUsersOnDB(usersData,automationId);
    
    const verificationOfAssignment= await verifyAssignment(automationId);
    
    if(!verificationOfAssignment || !automationExistance){
        throw new Error("No se pudo asignar usuario!")
    }
}

export const unassignUsersServices=async(users,automationId)=>{
    const automationExistance=await verifyAutomation(automationId);

    if(!automationExistance) throw new Error("Automatizacion no encontrada!")

    const usersData= await findUsersByUsername(users);
    
    const operation= await unassignUsersOnDB(usersData,automationId);
    
    const verificationOfUnassignment= await verifyUnassignment(usersData,automationId);
    
    if(!verificationOfUnassignment){
        throw new Error("No se pudo desasignar usuario!")
    }
}

export const getAssigneesServices = async(automationId)=>{
    const automationExistance=await verifyAutomation(automationId);

    if(!automationExistance) throw new Error("Automatizacion no encontrada!")
    const operation= await getAssigneesFromDB(automationId);
    if(operation.length===0) {
        return false
    }else{
        return operation;
    }
}