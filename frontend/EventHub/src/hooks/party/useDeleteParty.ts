import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePartyById } from "../../services";
import { queryKeys } from "../../constants/queryKeys";
export function useDeleteParty() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePartyById,
        onSuccess: (_data, id) => {
            queryClient.invalidateQueries({ 
                queryKey: queryKeys.parties.lists() 
            });
            if (id) {
                queryClient.invalidateQueries({ 
                    queryKey: queryKeys.parties.detail(id) 
                });
            }
        }
    });
}