import { getUserFromDB,getUsersFromDB } from "../repositories/user.repository.js";

export const getUserService =async (userId)=>{
    const user = getUserFromDB(userId);
    if(user){
        return user;
    }else{
        throw new Error("Id no valido!")
    }
    
}
export const getAllUsersService = async ()=>{
    const users = getUsersFromDB();
    if(users){
        return users;
    }else{
        throw new Error("No se pudo obtener usuarios!")
    }
}