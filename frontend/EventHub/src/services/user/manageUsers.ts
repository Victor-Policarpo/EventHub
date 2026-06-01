import api from "../../lib/axios";
import type { UserDataResponse } from "../../types";

export async function getUsersData(): Promise<UserDataResponse[]>{
    const response = await api.get<UserDataResponse[]>("/auth/profile/users")
    return response.data;
}

export async function toggleUserDelete(userId: string): Promise<void> {
    await api.delete(`/auth/profile/user/${userId}`);
}

export async function toggleUserActive(userId: string): Promise<void> {
    await api.patch(`/auth/profile/enable/${userId}`);
}