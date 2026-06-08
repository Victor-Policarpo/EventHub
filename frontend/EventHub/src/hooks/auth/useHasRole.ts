import { useQuery } from "@tanstack/react-query";
import type { UserDataResponse } from "../../types";
import { queryKeys } from "../../constants/queryKeys";

type AllowedRoles = "ADMIN" | "BASIC";

export const useHasRole = (roleRequired: AllowedRoles) => {
    const { data: currentUser } = useQuery<UserDataResponse>({
        queryKey: queryKeys.auth.user(),
        queryFn: () => null as any,
        enabled: false, 
        retry: false,
    });
    return !!currentUser?.roles?.includes(roleRequired);
};