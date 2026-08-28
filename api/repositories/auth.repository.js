import { hashPassword } from "../utils/auth.util.js";
import prisma from "../prisma/client.js";

export const createUser = async (username,email,password)=>{
    
    const newUser = await prisma.user.create({
        data:{
            username,
            email,
            password
        }
    });

    return newUser;
}
export const findUserByUsername = async (username) => {
  return prisma.user.findUnique({ where: { username } })
}

