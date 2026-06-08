import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { EmployeeInput } from "../../types";
import { updateEmployeeData } from "../../services";
import { queryKeys } from "../../constants/queryKeys";

export function useUpdateEmployee() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: EmployeeInput }) => 
            updateEmployeeData(id, data),
        onSuccess: (_data) => {
            queryClient.invalidateQueries({ 
                queryKey: queryKeys.employees.all 
                });
            queryClient.invalidateQueries({ 
                queryKey: queryKeys.parties.all 
                });
            }
        });
}