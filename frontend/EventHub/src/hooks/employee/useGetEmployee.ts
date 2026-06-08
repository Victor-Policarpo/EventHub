import { useQuery } from "@tanstack/react-query";
import { getEmployeeById } from "../../services";
import { queryKeys } from "../../constants/queryKeys";

export function useGetEmployee(employeeId: number) {
    return useQuery({
        queryKey: queryKeys.employees.detail(employeeId),
        queryFn: () => getEmployeeById(employeeId),
        enabled: !!employeeId
    });
}