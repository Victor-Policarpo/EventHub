import { useQuery } from '@tanstack/react-query';
import { getToys, getEmployee } from '../../services';
import type { ToyFilters, EmployeeFilters } from '../../types';

export function useAvailableResources(startDateHours: string, endDateHours?: string) {
  const toysQuery = useQuery({
    queryKey: ['toys', 'available', startDateHours, endDateHours],
    queryFn: async () => {
      const params: ToyFilters = {
        page: 0,
        size: 100,
        start: startDateHours,
        end: endDateHours,
      };
      const response = await getToys(params);
      return response.data.content;
    },
    enabled: !!startDateHours, 
  });

  const employeesQuery = useQuery({
    queryKey: ['employees', 'available', startDateHours, endDateHours],
    queryFn: async () => {
      const params: EmployeeFilters = {
        page: 0,
        size: 100,
        start: startDateHours,
        end: endDateHours,
      };
      const response = await getEmployee(params); 
      return response.data.content;
    },
    enabled: !!startDateHours,
  });

  return {
    toys: toysQuery.data ?? [],
    employees: employeesQuery.data ?? [],
    isPending: toysQuery.isPending || employeesQuery.isPending,
    isFetching: toysQuery.isFetching || employeesQuery.isFetching,
    isError: toysQuery.isError || employeesQuery.isError,
    toysQuery,
    employeesQuery
  };
}