import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getSummary, getRevenueChart, getRevenueBreakdown } from '../../services';
import type { DashboardFilters } from '../../types';
export function useDashboardData() {
  const [filters, setFilters] = useState<DashboardFilters>({
    start: undefined,
    end: undefined,
  });

  const summaryQuery = useQuery({
    queryKey: ['dashboardSummary', filters],
    queryFn: () => getSummary(filters),
  });

  const chartQuery = useQuery({
    queryKey: ['dashboardChart', filters],
    queryFn: () => getRevenueChart(filters),
  });

  const breakdownQuery = useQuery({
    queryKey: ['dashboardBreakdown', filters],
    queryFn: () => getRevenueBreakdown(filters),
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