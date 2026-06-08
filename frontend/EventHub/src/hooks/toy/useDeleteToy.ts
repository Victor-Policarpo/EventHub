import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteToyById } from "../../services";
import { queryKeys } from "../../constants/queryKeys";

export function useDeleteToy() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteToyById,
        onSuccess: (_data, id) => {
            queryClient.invalidateQueries({ 
                queryKey: queryKeys.toys.lists() 
            });
            if (id) {
                queryClient.invalidateQueries({ 
                    queryKey: queryKeys.toys.detail(id) 
                });
            }
        }
    });
}