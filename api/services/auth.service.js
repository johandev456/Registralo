
import { createUser, findUserByUsername } from "../repositories/auth.repository.js";
import { comparePassword, verifyCode,hashPassword, generateToken } from "../utils/auth.util.js";


export const registerNewUser = async (user,email,password,code)=>{
    

    if(verifyCode(code)){
        const hashedPassword= await hashPassword(password);
        return createUser(user,email,hashedPassword);
    }else{
        throw new Error("El código de verificación no es válido");
    }

}
export const loginUser = async (user,password)=>{
    
    //Si el user existe devuelve el user sino es false.
    const userExists= await verifyCredentials(user,password);

    if(userExists){
        
        const token =generateToken(userExists)
        //Se separa el password para luego enviarle el user a controller y guardar el token y user en las cookies
        const {password,...userData}=userExists
    
        return {userData,token};
    }else{
        throw new Error("Credenciales invalidas ");
    }
    
}
export const verifyCredentials = async (username,password)=>{
    //Verificar existencia de user
    const user= await findUserByUsername(username);
    if(!user) return false;
    //Verificar password
    const passwordValidation = await comparePassword(user.password,password);
    
    if(passwordValidation) {
        return user;
    }else{
        return false;
    }
}