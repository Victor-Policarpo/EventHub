import { Clock, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import type { ToyFilters } from "../../types";
import { FilterBar } from "../Common";
import { Input } from "./Input";
import { formatDateHours, splitIsoToFields } from "../../utils/formatDateHours";

interface Props {
    currentFilters: ToyFilters;
    onApply: (filters: Partial<ToyFilters>) => void;
}

export function DateFiltersComponent({ currentFilters, onApply }: Props) {
    const startFields = splitIsoToFields(currentFilters.start);
    const endFields = splitIsoToFields(currentFilters.end);

    const [form, setForm] = useState({
        startDate: startFields.date,
        startTime: startFields.time,
        endDate: endFields.date,
        endTime: endFields.time,
    });

    useEffect(() => {
        const start = splitIsoToFields(currentFilters.start);
        const end = splitIsoToFields(currentFilters.end);
        setForm({
            startDate: start.date,
            startTime: start.time,
            endDate: end.date,
            endTime: end.time,
        });
    }, [currentFilters.start, currentFilters.end]);

    const handleApply = () => {
        const startRaw = form.startDate ? `${form.startDate}T${form.startTime || "00:00"}` : "";
        let endRaw = form.endDate ? `${form.endDate}T${form.endTime || "00:00"}` : "";
        
        if (startRaw && !endRaw) {
            const startDateObj = new Date(startRaw);
            startDateObj.setHours(startDateObj.getHours() + 4);
            
            const y = startDateObj.getFullYear();
            const m = String(startDateObj.getMonth() + 1).padStart(2, '0');
            const d = String(startDateObj.getDate()).padStart(2, '0');
            const hr = String(startDateObj.getHours()).padStart(2, '0');
            const min = String(startDateObj.getMinutes()).padStart(2, '0');
            endRaw = `${y}-${m}-${d}T${hr}:${min}`;
        }

        const fixSeconds = (dateStr: string) => {
            if (!dateStr) return undefined;
            const baseDateTime = dateStr.substring(0, 16); 
            return `${baseDateTime}:00`;
        };

        onApply({
            start: fixSeconds(startRaw),
            end: fixSeconds(endRaw),
        });
    };

    const displayStart = form.startDate ? `${form.startDate}T${form.startTime || "00:00"}` : "";
    const displayEnd = form.endDate ? `${form.endDate}T${form.endTime || "00:00"}` : "";

    return (
        <FilterBar 
            onApply={handleApply}
            activeFiltersDisplay={
                <div className="flex flex-wrap items-center gap-2">
                    {displayStart && (
                        <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Clock size={12} />
                            Início: {formatDateHours(displayStart)}
                        </span>
                    )}
                    
                    {displayStart && displayEnd && (
                        <ArrowRight size={14} className="text-gray-400" />
                    )}

                    {displayEnd && (
                        <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Clock size={12} />
                            Fim: {formatDateHours(displayEnd)}
                        </span>
                    )}
                </div>
            }
        >
            <div className="space-y-4">
                <div className="space-y-2">
                    <span className="text-xs font-semibold text-gray-500 block">Período de Início</span>
                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            label="Data"
                            type="date"
                            value={form.startDate}
                            onChange={(e) => setForm(p => ({ ...p, startDate: e.target.value }))}
                        />
                        <Input
                            label="Hora"
                            type="time"
                            value={form.startTime}
                            onChange={(e) => setForm(p => ({ ...p, startTime: e.target.value }))}
                        />
                    </div>
                </div>

                <hr className="border-gray-100" />
                <div className="space-y-2">
                    <span className="text-xs font-semibold text-gray-500 block">Período de Fim (Opcional)</span>
                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            label="Data"
                            type="date"
                            value={form.endDate}
                            onChange={(e) => setForm(p => ({ ...p, endDate: e.target.value }))}
                        />
                        <Input
                            label="Hora"
                            type="time"
                            value={form.endTime}
                            onChange={(e) => setForm(p => ({ ...p, endTime: e.target.value }))}
                        />
                    </div>
                </div>
            </div>
        </FilterBar>
    );
}