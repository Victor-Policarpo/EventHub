import type { AxiosPromise } from "axios";
import api from "../../lib/axios";
import type { UpdateToyData } from "../../types";

export async function updateToyData(id: number, data: UpdateToyData): AxiosPromise<UpdateToyData> {
    const response = await api.patch<UpdateToyData>(`auth/toys/${id}`, data);
    return response;
}