import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteEmployeeById } from "../../services";

export function useDeleteEmployee() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: deleteEmployeeById,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees-data'] });
            navigate('/feed/employees');
        }
    })
}