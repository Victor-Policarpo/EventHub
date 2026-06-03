import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEmployeeById } from "../../services";

export function useDeleteEmployee() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteEmployeeById,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees-data'] });
            queryClient.invalidateQueries({ queryKey: ['employee'] });
        }
    })
}