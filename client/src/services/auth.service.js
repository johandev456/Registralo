import api from "../utils/axios"

export const login = async (username,password)=>{
    await api.post("/api/auth/login",{user:username,password})
}

export const verifyActiveSession = async() =>{
    const res = await api.get("/api/auth/verify")
    return res.data
}

export const logout = async()=>{
    await api.post("/api/auth/logout")
}