import { createUser } from "../repositories/auth.repository";
import { verifyCode } from "../utils/auth.util";


export const registerNewUser = (req)=>{
    const {user,email,password,code}=req.body;

    if(verifyCode(code)){
        createUsers(user,email,password);
        
    }else{
        throw new Error("El código de verificación no es válido");
    }

}