import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { EmployeeFilters } from "../../types";
import { getEmployee } from "../../services";

export function useEmployeeData(filters: EmployeeFilters){
    const query = useQuery({
        queryFn: () => getEmployee(filters),
        queryKey: ['employees-data', filters],
        placeholderData: keepPreviousData,
        refetchInterval: 300000
    });
    return {...query, data: query.data?.data};
}