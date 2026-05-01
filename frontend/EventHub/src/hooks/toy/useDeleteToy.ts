import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteToyById } from "../../services";

export function useDeleteToy() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: deleteToyById,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['toys-data'] });
            navigate('/feed/toys');
        }
    })
}