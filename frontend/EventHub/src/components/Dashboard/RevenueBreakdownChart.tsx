import React from 'react';
import Chart from 'react-apexcharts';
import type { RevenueBreakdown } from '../../types';
import type { ApexOptions } from 'apexcharts';

interface BreakdownProps {
    data: RevenueBreakdown | undefined;
}

export const RevenueBreakdownChart: React.FC<BreakdownProps> = ({ data }) => {
    const received = data?.received ?? 0;
    const pending = data?.pending ?? 0;
    const series = received === 0 && pending === 0 ? [0, 0] : [received, pending];

    const options: ApexOptions = { 
        chart: {
            id: 'revenue-breakdown-chart',
            fontFamily: 'Inter, sans-serif',
            parentHeightOffset: 0,
        },
        labels: ['Recebido', 'Pendente'],
        colors: ['#10B981', '#F59E0B'],
        legend: {
            position: 'bottom',
            labels: { colors: '#475569' },
            itemMargin: { horizontal: 10, vertical: 5 },
        },
        dataLabels: {
            enabled: true,
            formatter: (val: number) => `${val.toFixed(1)}%`,
            dropShadow: { enabled: false },
        },
        stroke: {
            width: 2,
            colors: ['#ffffff'],
        },
        tooltip: {
            y: {
                formatter: (value) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '75%',
                },
            },
        },
    };

    return (
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full min-h-87.5">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Divisão de Receitas</h3>
            <div className="flex-1 flex items-center justify-center w-full">
                <Chart options={options} series={series} type="donut" width="100%" height={320} />
            </div>
        </div>
    );
};