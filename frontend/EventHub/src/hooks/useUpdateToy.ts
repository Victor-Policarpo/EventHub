import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateToyData } from "../types";
import updateToyData from "../services/toy/updateToyData";

export function useUpdateToy() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateToyData }) => 
            updateToyData(id, data),
        
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['toys-data'] });
            queryClient.invalidateQueries({ queryKey: ['toy'] });
        }
    });
}