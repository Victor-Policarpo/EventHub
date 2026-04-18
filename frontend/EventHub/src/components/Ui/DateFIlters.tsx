import { useState } from "react";
import { FilterBar } from "../Common/FilterBar";
import { type ToyFilters } from "../../types";
import { Clock, ArrowRight } from "lucide-react";
interface Props {
    currentFilters: ToyFilters;
    onApply: (filters: Partial<ToyFilters>) => void;
}

export default function DateFiltersComponent({ currentFilters, onApply }: Props) {
    const [temp, setTemp] = useState({
        startDateHours: currentFilters.startDateHours,
        endDateHours: currentFilters.endDateHours
    });

    const formatDateTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <FilterBar 
            onApply={() => onApply(temp)}
            activeFiltersDisplay={
                <div className="flex flex-wrap items-center gap-2">
                    {temp.startDateHours && (
                        <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Clock size={12} />
                            Início: {formatDateTime(temp.startDateHours)}
                        </span>
                    )}
                    
                    {temp.startDateHours && temp.endDateHours && (
                        <ArrowRight size={14} className="text-gray-400" />
                    )}

                    {temp.endDateHours && (
                        <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Clock size={12} />
                            Fim: {formatDateTime(temp.endDateHours)}
                        </span>
                    )}
                </div>
            }
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Início do Aluguel</label>
                    <input
                        type="datetime-local"
                        value={temp.startDateHours || ""}
                        onChange={(e) => setTemp(p => ({ ...p, startDateHours: e.target.value }))}
                        className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Fim do Aluguel</label>
                    <input
                        type="datetime-local"
                        value={temp.endDateHours || ""}
                        onChange={(e) => setTemp(p => ({ ...p, endDateHours: e.target.value }))}
                        className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        </FilterBar>
    );
}