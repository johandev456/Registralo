import api from "../utils/axios"

export const getAllUsers = async ()=>{
   const users= await api.post("/api/user/");
   return users;
}