import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ToyInput } from "../../types";
import { updateToyData } from "../../services";
import { queryKeys } from "../../constants/queryKeys";

export function useUpdateToy() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ToyInput }) => 
      updateToyData(id, data),
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.toys.all 
      });
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.parties.all 
      });
    }
    });
}