import api from "../utils/axios"
import { userFormatting } from "../utils/userFormatting";

export const getAssignees = async (automationId)=>{
    const assignees=await api.get(`/api/assignees/${automationId}`)
    return assignees;
}
export const assignUsers = async (automationId, users) => {
    const usersObject = userFormatting(users)

    await api.post(`/api/assignees/`, {
        automation: automationId,
        users: usersObject
    });
}
export const unassignUsers = async (automationId,users)=>{
    const usersObject = userFormatting(users)
    await api.delete(`/api/assignees/`, {
        data: {
            automation: automationId,
            users: usersObject
        }
    })
}