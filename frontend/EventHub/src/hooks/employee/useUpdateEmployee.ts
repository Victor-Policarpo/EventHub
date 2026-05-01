import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateEmployeeData } from "../../types";
import { updateEmployeeData } from "../../services";

export function useUpdateEmployee() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, data}: { id: number; data: UpdateEmployeeData }) => 
            updateEmployeeData(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees-data'] });
            queryClient.invalidateQueries({ queryKey: ['employee'] });
        }
    });
}