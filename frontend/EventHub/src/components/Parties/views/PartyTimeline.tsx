import React from 'react';
import { Wrench, Play, CheckCircle, XCircle, Truck, User } from 'lucide-react';
import type { PartyHistoryItem } from '../../../types';
import { usePartyHistory } from '../../../hooks';
import { Loading } from '../../Ui';
import { formatDateHours } from '../../../utils/formatDateHours';

interface PartyTimelineProps {
    partyId: number;
}

const actionConfig = {
    ASSEMBLE: { label: 'Brinquedos Montados', color: 'bg-blue-500 text-white', icon: Wrench },
    START: { label: 'Festa Iniciada', color: 'bg-emerald-500 text-white', icon: Play },
    FINISH: { label: 'Festa Finalizada', color: 'bg-purple-500 text-white', icon: CheckCircle },
    CANCEL: { label: 'Festa Cancelada', color: 'bg-red-500 text-white', icon: XCircle },
    COLLECT: { label: 'Brinquedos Recolhidos', color: 'bg-orange-500 text-white', icon: Truck },
};

export const PartyTimeline: React.FC<PartyTimelineProps> = ({ partyId }) => {
    const { data: history, isLoading, error } = usePartyHistory(partyId);

    if (isLoading) return <div className="flex justify-center p-4"><Loading /></div>;
    if (error) return <p className="text-sm text-red-500 text-center py-4">Erro ao carregar histórico.</p>;
    
    if (!history || history.length === 0) {
        return <p className="text-sm text-slate-400 italic text-center py-8">Nenhum histórico registrado.</p>;
    }

    return (
        <div className="relative border-l border-slate-200 ml-4 space-y-6 pb-2">
            {history.map((item: PartyHistoryItem) => {
                const config = actionConfig[item.action] || { label: item.action, color: 'bg-slate-500 text-white', icon: User };
                const Icon = config.icon;

                return (
                    <div key={item.id} className="relative pl-8 animate-fade-in">
                        <span className={`absolute -left-4 top-0.5 flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white shadow-sm ${config.color}`}>
                            <Icon size={14} />
                        </span>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50 border border-slate-100 p-3.5 rounded-xl">
                            <div>
                                <h3 className="text-sm font-semibold text-slate-800">{config.label}</h3>
                                <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-500">
                                    <User size={12} />
                                    <span>Por: <strong className="text-slate-700">{item.performedBy.username}</strong></span>
                                </div>
                            </div>
                            <span className="text-xs font-medium text-slate-400 whitespace-nowrap self-start sm:self-center">
                                {formatDateHours(item.performedAt).date} {formatDateHours(item.performedAt).time}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};