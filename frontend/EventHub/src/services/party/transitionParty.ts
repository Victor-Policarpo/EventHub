import api from "../../lib/axios";
import type { PartyTransitionAction } from "../../types";

export async function transitionParty(partyId: number, action: PartyTransitionAction): Promise<void> {
    await api.patch(`/auth/parties/${partyId}/transition`, { action });
}