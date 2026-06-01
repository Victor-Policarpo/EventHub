import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleUserDelete } from "../../services";

export function useToggleUserDelete() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId: string) => toggleUserDelete(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users-data"] });
        }
    })
}