import api from "../../lib/axios";
import type { PasswordUpdateData } from "../../types";

export async function updatePassword(data: PasswordUpdateData){
    const response = await api.patch("auth/profile/change-password", data);
    return response;
}