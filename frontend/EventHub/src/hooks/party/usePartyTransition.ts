import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PartyTransitionAction } from "../../types";
import { transitionParty } from "../../services";
import { queryKeys } from "../../constants/queryKeys";

export function usePartyTransition(partyId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (action: PartyTransitionAction) => transitionParty(partyId, action),
        onSuccess: () => {
            queryClient.invalidateQueries({ 
                queryKey: queryKeys.parties.lists() 
            });
            queryClient.invalidateQueries({ 
                queryKey: queryKeys.parties.detail(partyId) 
            });
            queryClient.invalidateQueries({ 
                queryKey: queryKeys.parties.history(partyId) 
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.dashboard.all 
            });
        },
    });
}