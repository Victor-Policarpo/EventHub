import api from "../../lib/axios";

export async function deletePartyById(partyId: number): Promise<void>{
    await api.delete(`auth/parties/${partyId}/delete`);
}