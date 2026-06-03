import React from 'react';
import Chart from 'react-apexcharts';
import type { RevenueChartData } from '../../types';
import type { ApexOptions } from 'apexcharts';

interface ChartProps {
    data: RevenueChartData[] | undefined;
}

export const RevenueChart: React.FC<ChartProps> = ({ data = [] }) => {
    const categories = data.map((item) => item.label.replace('.', ''));
    const seriesData = data.map((item) => item.revenue);

    const options: ApexOptions = {
        chart: {
            id: 'revenue-monthly-chart',
            toolbar: { show: false },
            fontFamily: 'Inter, sans-serif',
            parentHeightOffset: 0,
        },
        colors: ['#10B981'],
        stroke: {
            curve: 'smooth',
            width: 3,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [0, 100], 
            },
        },
        dataLabels: { enabled: false },
        xaxis: {
            categories: categories,
            labels: { style: { colors: '#64748B' } },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            labels: {
                style: { colors: '#64748B' },
                formatter: (value) => `R$ ${value.toFixed(2)}`,
            },
        },
        grid: {
            borderColor: '#F1F5F9',
            strokeDashArray: 4,
        },
        tooltip: {
            y: {
                formatter: (value) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
            },
        },
    };

    const series = [
        {
            name: 'Faturamento Realizado',
            data: seriesData,
        },
    ];

    return (
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Evolução do Faturamento Mensal</h3>
            <div className="w-full">
                <Chart options={options} series={series} type="area" height={350} width="100%" />
            </div>
        </div>
    );
};