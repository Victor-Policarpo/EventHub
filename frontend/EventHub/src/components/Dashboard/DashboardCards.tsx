import type React from "react";
import type { DashboardSummary } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";

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
            color: 'border-emerald-500',
            bgColor: 'bg-emerald-50',
            textColor: 'text-emerald-600',
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {cards.map((card, index) => (
                <div key={index} className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 ${card.color}`}>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{card.title}</p>
                    <p className={`text-2xl font-black mt-2 tracking-tight ${card.textColor}`}>{card.value}</p>
                </div>
            ))}
        </div>
    );
};