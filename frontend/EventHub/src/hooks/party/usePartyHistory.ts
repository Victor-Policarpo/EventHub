import { useQuery } from "@tanstack/react-query";
import { getPartyHistory } from "../../services/party/getPartyHistory";
import { queryKeys } from "../../constants/queryKeys";

export function usePartyHistory(partyId: number) {
    return useQuery({
        queryKey: queryKeys.parties.history(partyId),
        queryFn: () => getPartyHistory(partyId),
        enabled: !isNaN(partyId) && !!partyId
    });
}