import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PartyTransitionAction } from "../../types";
import { transitionParty } from "../../services";

export function usePartyTransition(partyId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (action: PartyTransitionAction) => transitionParty(partyId, action),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['parties-data'] });
            queryClient.invalidateQueries({ queryKey: ['party'] });
            queryClient.invalidateQueries({ queryKey: ['partyHistory'] });

        },
    });
}