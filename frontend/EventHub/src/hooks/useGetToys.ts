import { useQuery } from "@tanstack/react-query";
import type { GetParams } from "../types/types";
import { getToys } from "../services/toy/getToy";

export function useGetToys({ startDate, endDate }: GetParams) {
  return useQuery({
    queryKey: ["toys", startDate, endDate], 
    queryFn: () => getToys({startDate, endDate}).then((response) => response.data),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });
}