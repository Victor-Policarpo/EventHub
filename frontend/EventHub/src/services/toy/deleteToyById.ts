import api from "../../lib/axios";

export async function deleteToyById(toyId: number): Promise<void>{
    await api.delete(`auth/toys/${toyId}`);
}