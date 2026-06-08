import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { EmployeeFilters } from "../../types";
import { getEmployee } from "../../services";
import { queryKeys } from "../../constants/queryKeys";

export function useEmployeeData(filters: EmployeeFilters){
    return useQuery({
        queryKey: queryKeys.employees.list(filters),
        queryFn: () => getEmployee(filters),
        placeholderData: keepPreviousData
    });
}