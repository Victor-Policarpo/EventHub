import { useQuery } from "@tanstack/react-query";
import { getEmployeeById } from "../services/employee/getEmployeeById";

export function useGetEmployee(employeeId: number) {
    const query = useQuery({
       queryFn: () => getEmployeeById(employeeId),
       queryKey: ['employee', employeeId],
       enabled: !!employeeId
    });
    return {...query, data: query.data };
}