import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ToyInput } from "../../types";
import { updateToyData } from "../../services";

export function useUpdateToy() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: ToyInput }) => 
            updateToyData(id, data),
        
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['toys-data'] });
            queryClient.invalidateQueries({ queryKey: ['toy'] });
        }
    });
}