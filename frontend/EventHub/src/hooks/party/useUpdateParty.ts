import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateParty } from "../../services";
import type { UpdatePartyPayload } from "../../types";

export function useUpdateParty() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdatePartyPayload }) => 
            updateParty(id, data), 
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['party'] });
            queryClient.invalidateQueries({ queryKey: ['parties-data'] });
            queryClient.invalidateQueries({ queryKey: ['partyHistory'] });
        }
    });
}