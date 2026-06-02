import { useQuery } from "@tanstack/react-query";
import { getPartyHistory } from "../../services/party/getPartyHistory";

export function usePartyHistory(partyId: number) {
    return useQuery({
        queryKey: ["partyHistory", partyId],
        queryFn: () => getPartyHistory(partyId),
        enabled: !isNaN(partyId)
    })

}