import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleUserActive } from "../../services";

export function useToggleUserActive(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId: string) => toggleUserActive(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users-data'] });
        }
    })
}