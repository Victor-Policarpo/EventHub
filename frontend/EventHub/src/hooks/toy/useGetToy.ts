import { useQuery } from "@tanstack/react-query";
import { getToyById } from "../../services";

export function useGetToy(toyId: number){
    const query = useQuery({
        queryKey: ['toy', toyId],
        queryFn: () => getToyById(toyId),
        enabled: !!toyId
    });
    return {...query, data: query.data};
}