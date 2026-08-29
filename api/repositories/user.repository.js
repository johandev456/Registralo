import prisma from "../prisma/client.js"


export const getUserFromDB=async (userId)=>{

    const user = prisma.user.findUnique({where:{id:userId}})
    return user;
}

export const getUsersFromDB=async ()=>{

    const users = prisma.user.findMany()
    return users;
}