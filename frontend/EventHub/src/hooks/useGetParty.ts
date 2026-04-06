import { useQuery } from "@tanstack/react-query";
import { getPartyById } from "../services/party/getPartyById";

export function useGetParty(partyId: number) {
    const query = useQuery({
        queryFn: () => getPartyById(partyId),
        queryKey: ['party', partyId],
        enabled: !!partyId
    });
    return {...query, data: query.data};
}