import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ToyFilters } from "../types";
import { getToys } from "../services/toy/getToy";

export function useToyData(filters: ToyFilters) {
  const query =  useQuery({
    queryKey: ["toys-data", filters], 
    queryFn: () => getToys(filters).then((response) => response.data),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
  return {...query, data: query.data}
}