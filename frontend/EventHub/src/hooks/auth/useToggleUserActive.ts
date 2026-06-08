import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleUserActive } from "../../services";
import { queryKeys } from "../../constants/queryKeys";

export function useToggleUserActive(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: toggleUserActive,
        onSuccess: () => {
            queryClient.invalidateQueries({ 
                queryKey: queryKeys.users.lists() 
            });
        }
    });
}