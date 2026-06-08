import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getParty } from "../../services";
import type { PartyFilters } from "../../types";
import { queryKeys } from "../../constants/queryKeys";

export function usePartyData(filters: PartyFilters){
    return useQuery({
        queryKey: queryKeys.parties.list(filters),
        queryFn: () => getParty(filters),
        placeholderData: keepPreviousData,
    });
}