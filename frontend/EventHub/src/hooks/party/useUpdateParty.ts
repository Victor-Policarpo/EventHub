import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateParty } from "../../services";
import type { UpdatePartyPayload } from "../../types";
import { queryKeys } from "../../constants/queryKeys";

export function useUpdateParty() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdatePartyPayload }) => 
            updateParty(id, data), 
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ 
                queryKey: queryKeys.parties.lists() 
            });
            
            if (variables?.id) {
                queryClient.invalidateQueries({ 
                    queryKey: queryKeys.parties.detail(variables.id) 
                });
            }
            
            queryClient.invalidateQueries({ 
            queryKey: queryKeys.parties.history(variables.id) 
            });
        }
    });
}