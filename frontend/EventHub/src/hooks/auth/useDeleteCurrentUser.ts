import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteCurrentUser } from "../../services";

export function useDeleteCurrentUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => DeleteCurrentUser(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        }
    })
}