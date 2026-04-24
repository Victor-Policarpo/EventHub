import api from "../../lib/axios";

export default async function deleteToyById(toyId: number): Promise<void>{
    await api.delete(`auth/toys/${toyId}`);
}