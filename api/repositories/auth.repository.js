

export const createUser = (username,email,password)=>{
    const hashedPassword= hashPassword(password);
    const newUser = prisma.user.create({
        data:{
            username,
            email,
            password: hashedPassword
        }
    });
    console.log(newUser);
}