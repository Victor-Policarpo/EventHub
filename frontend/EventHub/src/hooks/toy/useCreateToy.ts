import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ToyInput } from "../../types";
import { createToy } from "../../services";

export function useCreateToy() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: ToyInput) => createToy(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['toys-data'] });
            queryClient.invalidateQueries({ queryKey: ['toy'] });
        }
    });
}