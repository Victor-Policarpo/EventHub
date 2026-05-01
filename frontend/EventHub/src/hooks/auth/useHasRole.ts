import { useQueryClient } from "@tanstack/react-query"
import type { UserDataResponse } from "../../types";

type AllowedRoles = "ADMIN" | "BASIC";
export const useHasRole = (roleRequired: AllowedRoles) => {
    const queryClient = useQueryClient();
    const currentUser = queryClient.getQueryData<UserDataResponse>(["current-user"]);
    return currentUser?.roles?.includes(roleRequired);
}