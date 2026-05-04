import api from "../../lib/axios";
import type { ToyData, ToyInput } from "../../types";

export async function createToy(toyData: ToyInput): Promise<ToyData> {
    const response = await api.post<ToyData>('/auth/toys', 
        toyData);
    return response.data;
}