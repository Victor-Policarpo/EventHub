import { useQuery } from "@tanstack/react-query";
import { getUsersData } from "../../services";
import { queryKeys } from "../../constants/queryKeys";

export function useGetUsersData() {
    return useQuery({
        queryKey: queryKeys.users.lists(),
        queryFn: getUsersData,
    });
}