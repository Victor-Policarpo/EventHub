import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getToys, getEmployee } from '../../services';
import type { ToyFilters, EmployeeFilters } from '../../types';
import { queryKeys } from '../../constants/queryKeys';

export function useAvailableResources(start?: string, end?: string, partyId?: number) {

  const toysQuery = useQuery({
    queryKey: queryKeys.toys.available(start, end, partyId),
    queryFn: async () => {
      const params: ToyFilters = {
        page: 0,
        size: 100,
        start,
        end,
        excludePartyId: partyId,
      };
      const response = await getToys(params);
      return response.content;
    },
    enabled: !!start, 
    placeholderData: keepPreviousData,
  });

  const employeesQuery = useQuery({
    queryKey: queryKeys.employees.available(start, end, partyId),
    queryFn: async () => {
      const params: EmployeeFilters = {
        page: 0,
        size: 100,
        start,
        end,
        excludePartyId: partyId,
      };
      const response = await getEmployee(params); 
      return response.content;
    },
    enabled: !!start,
    placeholderData: keepPreviousData,
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