import type { AxiosPromise } from "axios";
import api from "../../lib/axios";
import type { UpdatePartyData } from "../../types";

export function updatePartyData(id: number, data: UpdatePartyData): AxiosPromise<UpdatePartyData> {
    const response = api.patch<UpdatePartyData>(`auth/parties/${id}`, data);
    return response;
}