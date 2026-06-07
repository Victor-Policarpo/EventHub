import api from "../../lib/axios";
import type { PageResponse, PartyData, PartyFilters } from "../../types";

export async function  getParty(filters: PartyFilters): Promise<PageResponse<PartyData>>{
    const response = await api.get<PageResponse<PartyData>>("/auth/parties", { params: filters });
    return response.data;
}