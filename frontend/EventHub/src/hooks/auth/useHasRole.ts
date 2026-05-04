import { useQuery } from "@tanstack/react-query";
import type { UserDataResponse } from "../../types";

type AllowedRoles = "ADMIN" | "BASIC";

export const useHasRole = (roleRequired: AllowedRoles) => {
    const { data: currentUser } = useQuery<UserDataResponse>({
        queryKey: ["current-user"],
        queryFn: () => null as unknown as UserDataResponse,
        enabled: false, 
        retry: false,
    });

    return currentUser?.roles?.includes(roleRequired);
}