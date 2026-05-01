import api from "../../lib/axios";
import type { ToyData } from "../../types";

export async function getToyById(toyId: number): Promise<ToyData> {
    const response = await api.get<ToyData>(`auth/toys/${toyId}`);
    return response.data;
}