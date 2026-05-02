import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { EmployeeInput } from "../../types";
import { createEmployee } from "../../services";

export function useCreateEmployee(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: EmployeeInput) => createEmployee(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees-data'] });
            queryClient.invalidateQueries({ queryKey: ['employee'] });
        },
    });
}