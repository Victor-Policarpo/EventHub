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
    },
    labels: ['Recebido (Finalizado)', 'Pendente (Agendado)'],
    colors: ['#10B981', '#F59E0B'],
    legend: {
      position: 'bottom',
      labels: { colors: '#374151' },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(1)}%`,
    },
    tooltip: {
      y: {
        formatter: (value) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Divisão de Receitas</h3>
      <div className="flex-1 flex items-center justify-center">
        <Chart options={options} series={series} type="donut" width={380} />
      </div>
    </div>
  );
};