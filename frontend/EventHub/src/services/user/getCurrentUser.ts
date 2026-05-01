import api from "../../lib/axios";
import type { UserDataResponse } from "../../types";

export async function getCurrentUser(): Promise<UserDataResponse>{
    const response = await api.get<UserDataResponse>("auth/profile")
    return response.data;
} 