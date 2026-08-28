import bcrypt from "bcrypt";

export const verifyCode = (code)=> {
    return code===9999
}

export const hashPassword= (password)=>{
    hashedPassword= bcrypt.hash(password,10);
    return hashPassword;
}