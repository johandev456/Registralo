import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const verifyCode = (code)=> {
    return code===9999
}

export const hashPassword= (password)=>{
    const hashedPassword= bcrypt.hash(password,10);
    return hashedPassword;
}

export const generateToken= (user)=>{
    const expiresTime=1000 * 60 * 60 * 24 * 7 ;// 7 dias

    const token = jwt.sign({
        id: user.id,
    }, process.env.JWT_SECRET_KEY,{expiresIn: expiresTime}) 
    return token;
}
export const comparePassword=async(userPassword,digitedPassword)=>{
    const passwordValidation = bcrypt.compare(digitedPassword,userPassword);
    return passwordValidation;
}

