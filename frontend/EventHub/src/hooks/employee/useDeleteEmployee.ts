import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEmployeeById } from "../../services";
import { queryKeys } from "../../constants/queryKeys";

export function useDeleteEmployee() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteEmployeeById,
        onSuccess: (_data, id) => {
            queryClient.invalidateQueries({ 
                queryKey: queryKeys.employees.lists() 
            });
            if (id) {
                queryClient.invalidateQueries({ 
                    queryKey: queryKeys.employees.detail(id) 
                });
            }
        }
    });
}