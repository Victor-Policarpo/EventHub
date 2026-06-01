import api from "../../lib/axios";

export async function DeleteCurrentUser(): Promise<void> {
    await api.delete("/auth/profile/delete/me");
}