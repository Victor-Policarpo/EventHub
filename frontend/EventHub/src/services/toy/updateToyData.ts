import type { AxiosPromise } from "axios";
import api from "../../lib/axios";
import type { ToyInput } from "../../types";

export async function updateToyData(id: number, data: ToyInput): AxiosPromise<ToyInput> {
    const response = await api.patch<ToyInput>(`auth/toys/${id}`, data);
    return response;
}