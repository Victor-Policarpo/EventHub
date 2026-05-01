import type { UserUpdateData } from "../../types";
import api from "../../lib/axios";

export async function updateUser(data: UserUpdateData){
    const response = await api.patch<UserUpdateData>("/auth/profile/update", data);
    return response;
}