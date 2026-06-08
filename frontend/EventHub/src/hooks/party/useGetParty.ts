import { useQuery } from "@tanstack/react-query";
import { getPartyById } from "../../services";
import { queryKeys } from "../../constants/queryKeys";

export function useGetParty(partyId: number) {
    return useQuery({
        queryKey: queryKeys.parties.detail(partyId),
        queryFn: () => getPartyById(partyId),
        enabled: !!partyId
    });
}