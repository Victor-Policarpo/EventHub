import React from 'react';
import { useDashboardData } from '../../hooks';
import { DashboardCards } from './DashboardCards';
import { RevenueChart } from './RevenueChart';
import { RevenueBreakdownChart } from './RevenueBreakdownChart';
import { ErrorState, Loading } from '../Ui';

export const FinanceDashboard: React.FC = () => {
  const { summary, chartData, breakdown, isLoading, isError, filters, updateFilters, refetchAll } = useDashboardData();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFilters({
      ...filters,
      [name]: value || undefined,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100 w-full">
        <Loading/>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-100 w-full">
        <ErrorState onRetry={refetchAll} message='Erro ao carregar os dados do dashboard. Tente novamente.'/>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Painel Financeiro</h1>
          <p className="text-sm text-gray-500">Acompanhe o faturamento e agendamentos da locadora</p>
        </div>

        <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-gray-500 uppercase">De</label>
            <input
              type="date"
              name="start"
              value={filters.start ?? ''}
              onChange={handleFilterChange}
              className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-gray-500 uppercase">Até</label>
            <input
              type="date"
              name="end"
              value={filters.end ?? ''}
              onChange={handleFilterChange}
              className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      <DashboardCards data={summary} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={chartData} />
        </div>
        <div className="lg:col-span-1">
          <RevenueBreakdownChart data={breakdown} />
        </div>
      </div>
    </div>
  );
};