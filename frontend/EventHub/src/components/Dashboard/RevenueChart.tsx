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
      labels: { style: { colors: '#6B7280' } },
    },
    yaxis: {
      labels: {
        style: { colors: '#6B7280' },
        formatter: (value) => `R$ ${value.toFixed(2)}`,
      },
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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Evolução do Faturamento Mensal</h3>
      <Chart options={options} series={series} type="area" height={350} />
    </div>
  );
};