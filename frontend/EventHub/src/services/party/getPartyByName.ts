import api from "../../lib/axios";
import type { PageResponse, PartyData } from "../../types";

export async function getPartyByName(search: string): Promise<PageResponse<PartyData>> {
    const response = await api.get<PageResponse<PartyData>>("auth/parties/filter", { params: { search } });
    return response.data;
}