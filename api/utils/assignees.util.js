

export const verifyUsersData=(usersDBResult,usersFromRequest)=>{
    const usersFound = usersDBResult.map((user)=>user.username)
    const missingUsers=usersFromRequest.filter(
        (user)=>!usersFound.includes(user)
    )
    if(missingUsers.length>0){
        throw new Error(`Usuarios no encontrados: ${missingUsers.join(", ")}`)
    }
    return true;
}

export const getUsernamesFromJSON=(usersFromRequest)=>{
    const usernames = Array.isArray(usersFromRequest)//Basicamente convierte en array solo los valores del JSON asi se tienen solo los usernames
    ? usersFromRequest
    : Object.values(usersFromRequest);
    return usernames;
}

export const getIdsFromArray=(usersArray)=>{
    return usersArray.map((user) => user.id);
}