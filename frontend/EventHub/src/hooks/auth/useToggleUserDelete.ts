import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleUserDelete } from "../../services";
import { queryKeys } from "../../constants/queryKeys";

export function useToggleUserDelete() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleUserDelete,
        onSuccess: () => {
            queryClient.invalidateQueries({ 
                queryKey: queryKeys.users.lists() 
            });
        }
    });
}