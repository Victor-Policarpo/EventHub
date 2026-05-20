import api from "../../lib/axios";
import type { CreatePartyPayload, PartyDetails } from "../../types";

export async function createParty(data: CreatePartyPayload): Promise<PartyDetails> {
    const response = await api.post<PartyDetails>('/auth/parties', data);
    return response.data;
}