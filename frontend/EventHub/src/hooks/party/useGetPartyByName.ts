import { useQuery } from "@tanstack/react-query";
import { getPartyByName } from "../../services/party/getPartyByName";

export function useGetPartyByName(search: string) {
    const query = useQuery({
        queryFn: () => getPartyByName(search),
        queryKey: ['party', search],
        enabled: search.trim() !== '',
        refetchOnWindowFocus: false,
    });
    return {...query, data: query.data};
}