import React from 'react';
import { useDashboardData } from '../../hooks';
import { DashboardCards } from './DashboardCards';
import { ErrorState, Input, Loading } from '../Ui';
import { lazy, Suspense } from "react";

const RevenueChart = lazy(() =>
    import("./RevenueChart").then((m) => ({
        default: m.RevenueChart,
    }))
);

const RevenueBreakdownChart = lazy(() =>
    import("./RevenueBreakdownChart").then((m) => ({
        default: m.RevenueBreakdownChart,
    }))
);

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

                <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex flex-col gap-1 flex-1">
                        <label
                            htmlFor="start"
                            className="text-xs font-semibold text-slate-500 uppercase tracking-wide"
                        >
                            Data Inicial
                        </label>

                        <Input
                            id="start"
                            type="date"
                            name="start"
                            value={filters.start ?? ''}
                            onChange={handleFilterChange}
                            className="w-full"
                        />
                    </div>

                    <div className="flex flex-col gap-1 flex-1">
                        <label
                            htmlFor="end"
                            className="text-xs font-semibold text-slate-500 uppercase tracking-wide"
                        >
                            Data Final
                        </label>

                        <Input
                            id="end"
                            type="date"
                            name="end"
                            value={filters.end ?? ''}
                            onChange={handleFilterChange}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            <DashboardCards data={summary} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Suspense fallback={<Loading />}>
                        <RevenueChart data={chartData} />
                    </Suspense>
                </div>

                <div className="lg:col-span-1">
                    <Suspense fallback={<Loading />}>
                        <RevenueBreakdownChart data={breakdown} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};