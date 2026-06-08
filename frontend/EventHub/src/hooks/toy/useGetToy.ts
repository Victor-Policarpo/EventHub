import { useQuery } from "@tanstack/react-query";
import { getToyById } from "../../services";
import { queryKeys } from "../../constants/queryKeys";

export function useGetToy(toyId: number) {
    return useQuery({
        queryKey: queryKeys.toys.detail(toyId),
        queryFn: () => getToyById(toyId),
        enabled: !!toyId
    });
}