import { keepPreviousData, useQuery } from "@tanstack/react-query";
import getCurrentUser from "../services/user/getCurrentUser";

function useCurrentUser() {
    const query = useQuery({
        queryKey: ["current-user"],
        queryFn: getCurrentUser,
        placeholderData: keepPreviousData,
        refetchInterval: 300000
    });
    return {...query, data: query?.data?.data};
}

export default useCurrentUser;