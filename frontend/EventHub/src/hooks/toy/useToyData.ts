import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ToyFilters } from "../../types";
import { getToys } from "../../services";

export function useToyData(filters: ToyFilters) {
  const query =  useQuery({
    queryKey: ["toys", filters], 
    queryFn: () => getToys(filters),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
  return {...query, data: query.data}
}