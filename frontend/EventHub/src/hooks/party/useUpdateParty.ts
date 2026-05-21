import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateParty } from "../../services";
import type { UpdatePartyPayload } from "../../types";

export function useUpdateParty() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdatePartyPayload }) => 
            updateParty(id, data), 
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['party', variables.id] });
            queryClient.invalidateQueries({ queryKey: ['parties-data'] });
        }
    });
}