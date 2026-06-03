import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteToyById } from "../../services";

export function useDeleteToy() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteToyById,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['toys-data'] });
            queryClient.invalidateQueries({ queryKey: ['toy'] });
        }
    })
}