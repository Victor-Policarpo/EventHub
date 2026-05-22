import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createParty } from "../../services";
import type { CreatePartyPayload } from "../../types";

export function useCreateParty(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreatePartyPayload) => createParty(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['parties-data'] });
            queryClient.invalidateQueries({ queryKey: ['party'] });
        }
    })
}