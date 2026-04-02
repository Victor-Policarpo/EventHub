import type { AxiosPromise } from "axios";
import api from "../../lib/axios";
import type { PartyDataResponse, PartyFilters } from "../../types/types";

export async function  getParty(filters: PartyFilters): AxiosPromise<PartyDataResponse>{
    const response = await api.get<PartyDataResponse>("/auth/parties", { params: filters });
    return response;
}