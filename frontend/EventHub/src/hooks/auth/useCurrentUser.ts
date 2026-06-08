import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services";
import { queryKeys } from "../../constants/queryKeys";

export function useCurrentUser() {
    return useQuery({
        queryKey: queryKeys.auth.user(),
        queryFn: getCurrentUser,
        placeholderData: keepPreviousData,
    });
}