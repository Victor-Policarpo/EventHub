import api from "../../lib/axios";
import type { PartyHistoryItem } from "../../types";

export async function getPartyHistory(partyId: number): Promise<PartyHistoryItem[]> {
    const response = await api.get(`/auth/parties/${partyId}/history`);
    return response.data;
}