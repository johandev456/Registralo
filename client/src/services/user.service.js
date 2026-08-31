import api from "../utils/axios"

export const getAllUsers = async ()=>{
   
   const users= await api.get("/api/user/");
   
   return users;
}