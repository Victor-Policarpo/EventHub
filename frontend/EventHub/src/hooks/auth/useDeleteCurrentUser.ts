import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteCurrentUser } from "../../services";
import { queryKeys } from "../../constants/queryKeys";

export function useDeleteCurrentUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => DeleteCurrentUser(),
        onSuccess: () => {
            queryClient.invalidateQueries({ 
                queryKey: queryKeys.auth.user() 
            });
            queryClient.clear();
        }
    });
}