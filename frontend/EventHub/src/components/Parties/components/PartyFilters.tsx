import { useState, useEffect } from "react";
import type { PartyFilters } from "../../../types";
import { FilterBar } from "../../Common";
import { Input } from "../../Ui";
import { partyStatusMap, assemblyStatusMap } from "../../../utils/statusTranslations";
import { Calendar } from "lucide-react";

interface Props {
    currentFilters: PartyFilters;
    onApply: (filters: Partial<PartyFilters>) => void;
}

export function PartyFiltersComponent({ currentFilters, onApply }: Props) {
    const [temp, setTemp] = useState({
        partyStatus: currentFilters.partyStatus,
        assemblyStatus: currentFilters.assemblyStatus,
        date: currentFilters.date
    });

    useEffect(() => {
        setTemp({
            partyStatus: currentFilters.partyStatus,
            assemblyStatus: currentFilters.assemblyStatus,
            date: currentFilters.date
        });
    }, [currentFilters.partyStatus, currentFilters.assemblyStatus, currentFilters.date]);

    const handleClearAll = () => {
        setTemp({
            date: undefined,
            partyStatus: undefined,
            assemblyStatus: undefined
        });
    };

    return (
        <FilterBar
            onApply={() => onApply(temp)}
            activeFiltersDisplay={
                <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
                    {currentFilters.date && (
                        <span className="bg-white border border-slate-200 text-slate-700 shadow-sm px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5">
                            <Calendar size={14} className="text-slate-400" />
                            Data: {currentFilters.date.split('-').reverse().join('/')}
                        </span>
                    )}
                    {currentFilters.partyStatus && (
                        <span className="bg-white border border-slate-200 text-slate-700 shadow-sm px-3 py-1.5 rounded-lg text-xs font-medium">
                            Festa: {partyStatusMap[currentFilters.partyStatus]}
                        </span>
                    )}
                    {currentFilters.assemblyStatus && (
                        <span className="bg-white border border-slate-200 text-slate-700 shadow-sm px-3 py-1.5 rounded-lg text-xs font-medium">
                            Montagem: {assemblyStatusMap[currentFilters.assemblyStatus]}
                        </span>
                    )}
                </div>
            }
        >
            <div className="flex flex-col gap-3.5 md:gap-5">
                
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Filtrar por Dia
                    </span>
                    {(temp.date || temp.partyStatus || temp.assemblyStatus) && (
                        <button
                            type="button"
                            onClick={handleClearAll}
                            className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors outline-none"
                        >
                            Limpar Filtros
                        </button>
                    )}
                </div>

                <div className="w-full sm:max-w-xs">
                    <Input
                        type="date"
                        value={temp.date ?? ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTemp(p => ({ ...p, date: e.target.value || undefined }))}
                    />
                </div>

                <hr className="border-slate-100 my-0.5 md:my-0" />

                <div className="flex flex-col gap-2 md:gap-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Status da Festa
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(partyStatusMap).map(([key, label]) => {
                            const isActive = temp.partyStatus === key;
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setTemp(p => ({ 
                                        ...p, 
                                        partyStatus: p.partyStatus === key ? undefined : key as PartyFilters['partyStatus'] 
                                    }))}
                                    className={`px-4 py-2 md:py-2.5 rounded-lg text-xs font-semibold transition-all border outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1 ${
                                        isActive 
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                    }`}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <hr className="border-slate-100 my-0.5 md:my-0" />

                <div className="flex flex-col gap-2 md:gap-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Status da Montagem
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(assemblyStatusMap).map(([key, label]) => {
                            const isActive = temp.assemblyStatus === key;
                            return (
                                <button 
                                    key={key}
                                    type="button"
                                    onClick={() => setTemp(p => ({ 
                                        ...p, 
                                        assemblyStatus: p.assemblyStatus === key ? undefined : key as PartyFilters['assemblyStatus'] 
                                    }))}
                                    className={`px-4 py-2 md:py-2.5 rounded-lg text-xs font-semibold transition-all border outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1 ${
                                        isActive 
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                    }`}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </FilterBar>
    );
}