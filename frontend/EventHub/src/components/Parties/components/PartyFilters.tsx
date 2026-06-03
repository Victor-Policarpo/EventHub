import { useState } from "react";
import type { PartyFilters } from "../../../types";
import { FilterBar } from "../../Common";
import { partyStatusMap, assemblyStatusMap } from "../../../utils/statusTranslations";

interface Props {
    currentFilters: PartyFilters;
    onApply: (filters: Partial<PartyFilters>) => void;
}

export function PartyFiltersComponent({ currentFilters, onApply }: Props) {
    const [temp, setTemp] = useState({
        partyStatus: currentFilters.partyStatus,
        assemblyStatus: currentFilters.assemblyStatus
    });

    return (
        <FilterBar
            onApply={() => onApply(temp)}
            activeFiltersDisplay={
                <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
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
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
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
                                    onClick={() => setTemp(p => ({ ...p, partyStatus: key as PartyFilters['partyStatus'] }))}
                                    className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all border outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1 ${
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

                <hr className="border-slate-100" />
                <div className="flex flex-col gap-3">
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
                                    onClick={() => setTemp(p => ({ ...p, assemblyStatus: key as PartyFilters['assemblyStatus'] }))}
                                    className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all border outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1 ${
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