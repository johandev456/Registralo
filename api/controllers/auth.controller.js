import { registerNewUser,loginUser } from "../services/auth.service.js"

//Comprobar si tiene sesion activa
export const me =async (req,res)=>{
    res.json(req.username)
}


export const register = async (req,res)=>{
    const {user,email,password,code}=req.body;
    try{
        await registerNewUser(user,email,password,code);
        res.status(201).json({message:"Usuario creado!"})
    
    }catch(error){
        console.log("Error ",error);
        res.status(500).json({message:"Operacion fallida!"})
    }
}

export const login = async (req,res)=>{
    const {user,password}=req.body;
    
    try{
        const userDataAndToken= await loginUser(user,password);
        const expires=1000 * 60 * 60 * 24 * 7;

        res.cookie("token", userDataAndToken.token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: expires
    }).status(200).json({message:"Sesion iniciada!"})

    }catch(error){
        console.log("Error durante login:", error);
        res.status(500).json({ message: "Operacion fallida!" });
    }
}

export const logout = async (req,res)=>{
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    }).status(200).json({ message: "Logout exitoso!" });
}



