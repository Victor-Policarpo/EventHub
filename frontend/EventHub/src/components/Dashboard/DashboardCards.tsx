import type React from "react";
import type { DashboardSummary } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";

interface CardsProps {
  data: DashboardSummary | undefined;
}
interface CardsProps {
  data: DashboardSummary | undefined;
}

export const DashboardCards: React.FC<CardsProps> = ({ data }) => {

  const cards = [
    {
      title: 'Total de Festas',
      value: data?.totalParties ?? 0,
      color: 'border-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Faturamento Recebido',
      value: formatCurrency(data?.revenueReceived ?? 0),
      color: 'border-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Faturamento a Receber',
      value: formatCurrency(data?.revenueToReceive ?? 0),
      color: 'border-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      title: 'Faturamento Total',
      value: formatCurrency(data?.totalRevenue ?? 0),
      color: 'border-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <div key={index} className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${card.color}`}>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{card.title}</p>
          <p className={`text-2xl font-bold mt-2 ${card.textColor}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
};