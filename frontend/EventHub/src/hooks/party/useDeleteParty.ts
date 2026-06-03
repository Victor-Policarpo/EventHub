import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePartyById } from "../../services";

export function useDeleteParty() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deletePartyById,
        onSuccess: () => { 
            queryClient.invalidateQueries({ queryKey: ['parties-data'] });
            queryClient.invalidateQueries({ queryKey: ['party'] });
        }
    })
}