import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getSummary, getRevenueChart, getRevenueBreakdown } from '../../services';
import type { DashboardFilters } from '../../types';
import { queryKeys } from '../../constants/queryKeys';

export function useDashboardData() {
  const [filters, setFilters] = useState<DashboardFilters>({
    start: undefined,
    end: undefined,
  });

  const summaryQuery = useQuery({
    queryKey: queryKeys.dashboard.summary(filters),
    queryFn: () => getSummary(filters),
    placeholderData: keepPreviousData,
  });

  const chartQuery = useQuery({
    queryKey: queryKeys.dashboard.chart(filters),
    queryFn: () => getRevenueChart(filters),
    placeholderData: keepPreviousData,
  });

  const breakdownQuery = useQuery({
    queryKey: queryKeys.dashboard.breakdown(filters),
    queryFn: () => getRevenueBreakdown(filters),
    placeholderData: keepPreviousData,
  });

  const updateFilters = (newFilters: DashboardFilters) => {
    setFilters(newFilters);
  };

  const isLoading = summaryQuery.isLoading || chartQuery.isLoading || breakdownQuery.isLoading;
  const isError = summaryQuery.isError || chartQuery.isError || breakdownQuery.isError;

  return {
    filters,
    updateFilters,
    summary: summaryQuery.data,
    chartData: chartQuery.data,
    breakdown: breakdownQuery.data,
    isLoading,
    isError,
    refetchAll: () => {
      summaryQuery.refetch();
      chartQuery.refetch();
      breakdownQuery.refetch();
    }
  };
}