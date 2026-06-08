import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services";
import { queryKeys } from "../../constants/queryKeys";

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ 
                queryKey: queryKeys.auth.user() 
            });
            queryClient.invalidateQueries({ 
                queryKey: queryKeys.users.lists() 
            });
        }
    });
}