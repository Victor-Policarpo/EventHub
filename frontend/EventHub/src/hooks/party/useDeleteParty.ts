import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePartyById } from "../../services";
import { useNavigate } from "react-router-dom";

export function useDeleteParty() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: deletePartyById,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['parties-data'] });
            navigate('/feed');
        },
        onError: (error) => {
            alert(`Erro ao excluir festa: ${error.message}`);
        }
    })
}