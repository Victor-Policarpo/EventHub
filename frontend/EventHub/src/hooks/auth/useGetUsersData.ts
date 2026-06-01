import { useQuery } from "@tanstack/react-query";
import { getUsersData } from "../../services";

export function useGetUsersData() {
    const query = useQuery({
        queryFn: () => getUsersData(),
        queryKey: ['users-data'],
    });
    return {...query, data: query.data};
}