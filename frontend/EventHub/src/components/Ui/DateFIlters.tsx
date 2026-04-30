import { Clock, ArrowRight } from "lucide-react";
import { useState } from "react";
import type { ToyFilters } from "../../types";
import { FilterBar } from "../Common";
import { Input } from "./Input";

interface Props {
    currentFilters: ToyFilters;
    onApply: (filters: Partial<ToyFilters>) => void;
}

export function DateFiltersComponent({ currentFilters, onApply }: Props) {
    const [temp, setTemp] = useState({
        start: currentFilters.start || "",
        end: currentFilters.end || ""
    });

    const formatDateTime = (dateStr: string) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return "Data inválida";
        
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
                    {temp.start && (
                        <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Clock size={12} />
                            Início: {formatDateTime(temp.start)}
                        </span>
                    )}
                    
                    {temp.start && temp.end && (
                        <ArrowRight size={14} className="text-gray-400" />
                    )}

                    {temp.end && (
                        <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Clock size={12} />
                            Fim: {formatDateTime(temp.end)}
                        </span>
                    )}
                </div>
            }
        >
            <div className="space-y-4">
                <Input
                    label="Data de Início"
                    type="datetime-local"
                    value={temp.start}
                    onChange={(e) => setTemp(p => ({ ...p, start: e.target.value }))}
                />

                <Input
                    label="Fim do Aluguel"
                    type="datetime-local"
                    value={temp.end}
                    onChange={(e) => setTemp(p => ({ ...p, end: e.target.value }))}
                />
            </div>
        </FilterBar>
    );
}