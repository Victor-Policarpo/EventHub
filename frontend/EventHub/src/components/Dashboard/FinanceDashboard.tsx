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
            <div className="flex items-center justify-center min-h-[60vh] w-full">
                <Loading/>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] w-full">
                <ErrorState onRetry={refetchAll} message='Erro ao carregar os dados do dashboard. Tente novamente.'/>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Painel Financeiro</h1>
                    <p className="text-sm text-slate-500 mt-1">Acompanhe o faturamento e agendamentos da locadora</p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-2 flex-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider w-8 sm:w-auto">De</label>
                        <input
                            type="date"
                            name="start"
                            value={filters.start ?? ''}
                            onChange={handleFilterChange}
                            className="w-full sm:w-auto text-sm text-slate-700 border border-slate-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
                        />
                    </div>
                    
                    <div className="hidden sm:block w-px h-6 bg-slate-200"></div>

                    <div className="flex items-center gap-2 flex-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider w-8 sm:w-auto">Até</label>
                        <input
                            type="date"
                            name="end"
                            value={filters.end ?? ''}
                            onChange={handleFilterChange}
                            className="w-full sm:w-auto text-sm text-slate-700 border border-slate-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
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