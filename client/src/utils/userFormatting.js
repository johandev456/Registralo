export const userFormatting=(users)=>{
    const usersObject = users.reduce((acc, user, index) => {
        acc[`user${index + 1}`] = user.username;
        return acc;
    }, {});
    return usersObject
}

