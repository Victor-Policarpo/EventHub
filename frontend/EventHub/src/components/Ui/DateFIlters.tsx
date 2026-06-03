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
                <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
                    {displayStart && (
                        <span className="bg-white border border-slate-200 text-slate-700 shadow-sm px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5">
                            <Clock size={14} className="text-slate-400" />
                            Início: {formatDateHours(displayStart).date} {formatDateHours(displayStart).time && `- ${formatDateHours(displayStart).time}`}
                        </span>
                    )}
                    
                    {displayStart && displayEnd && (
                        <ArrowRight size={14} className="text-slate-300" />
                    )}

                    {displayEnd && (
                        <span className="bg-white border border-slate-200 text-slate-700 shadow-sm px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5">
                            <Clock size={14} className="text-slate-400" />
                            Fim: {formatDateHours(displayEnd).date} {formatDateHours(displayEnd).time && `- ${formatDateHours(displayEnd).time}`}
                        </span>
                    )}
                </div>
            }
        >
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Período de Início
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                <hr className="border-slate-100" />
                <div className="flex flex-col gap-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Período de Fim <span className="font-normal normal-case text-slate-400 ml-1">(Opcional)</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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