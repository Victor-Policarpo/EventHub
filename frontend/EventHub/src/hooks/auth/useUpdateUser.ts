import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserUpdateData } from "../../types";
import { updateUser } from "../../services";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserUpdateData) => updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-data'] });
    }
  });
}