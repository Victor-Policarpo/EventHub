import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ToyFilters } from "../../types";
import { getToys } from "../../services";
import { queryKeys } from "../../constants/queryKeys";

export function useToyData(filters: ToyFilters) {
  return useQuery({
    queryKey: queryKeys.toys.list(filters), 
    queryFn: () => getToys(filters),
    placeholderData: keepPreviousData,
  });
}