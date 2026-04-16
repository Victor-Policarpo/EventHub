import api from "../../lib/axios";

export async function deletePartyById(partyId: string): Promise<void>{
    await api.delete(`auth/parties/${partyId}/delete`);
}