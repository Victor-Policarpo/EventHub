import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdatePartyData } from "../types";
import updatePartyData from "../services/party/updatePartyData";

export function useUpdateParty() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdatePartyData }) => 
            updatePartyData(id, data), 
        
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['party'] });
            queryClient.invalidateQueries({ queryKey: ['parties-data'] });
        }
    });
}