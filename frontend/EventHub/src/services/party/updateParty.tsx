import api from "../../lib/axios";
import type { UpdatePartyPayload } from "../../types";

export async function updateParty(id: number, data: UpdatePartyPayload): Promise<UpdatePartyPayload> {
    const response = await api.patch(`/auth/parties/${id}`, data);
    return response.data;
}