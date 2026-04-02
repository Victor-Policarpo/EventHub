import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getParty } from "../services/party/partyService";
import type { PartyFilters } from "../types/types";

export function usePartyData(filters: PartyFilters){
    const query = useQuery({
        queryFn: () => getParty(filters),
        queryKey: ['parties-data', filters],
        placeholderData: keepPreviousData,
        refetchInterval: 300000
    });
    return {...query, data: query.data?.data};
}