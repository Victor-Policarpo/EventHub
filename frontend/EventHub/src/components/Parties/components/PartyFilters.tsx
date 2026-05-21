import { useState } from "react";
import type { PartyFilters } from "../../../types";
import { FilterBar } from "../../Common";
import { Button } from "../../Ui";

interface Props {
    currentFilters: PartyFilters;
    onApply: (filters: Partial<PartyFilters>) => void;
}

export function PartyFiltersComponent({ currentFilters, onApply }: Props) {
    const [temp, setTemp] = useState({
        partyStatus: currentFilters.partyStatus,
        assemblyStatus: currentFilters.assemblyStatus
    });

    const getStatusClass = (active: boolean, activeColor: string) => 
        `w-fit px-3 py-1.5 text-[10px] rounded-full border transition-all ${
            active ? `${activeColor} text-white border-transparent shadow-sm` : 'bg-gray-50 text-gray-500 border-gray-200'
        }`;

    return (
        <FilterBar
            onApply={() => onApply(temp)}
            activeFiltersDisplay={
                <>
                    <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded-md text-[10px] font-bold">
                        {currentFilters.partyStatus}
                    </span>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-md text-[10px] font-bold">
                        {currentFilters.assemblyStatus}
                    </span>
                </>
            }
        >
            <div className="mb-6">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-3 tracking-wider">Status da Festa</label>
                <div className="flex flex-wrap gap-2">
                    {['SCHEDULED', 'IN_PROGRESS', 'FINISHED', 'CANCELED'].map((s) => (
                        <Button
                            key={s}
                            variant="secondary"
                            onClick={() => setTemp(p => ({ ...p, partyStatus: s as PartyFilters['partyStatus'] }))}
                            className={getStatusClass(temp.partyStatus === s, 'bg-indigo-600')}
                        >
                            {s.replace('_', ' ')}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="mb-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-3 tracking-wider">Status da Montagem</label>
                <div className="flex flex-wrap gap-2">
                    {['TO_ASSEMBLE', 'ASSEMBLED', 'TO_DISASSEMBLE', 'DISASSEMBLED', 'NOT_APPLICABLE'].map((s) => (
                        <Button 
                            key={s}
                            variant="secondary"
                            onClick={() => setTemp(p => ({ ...p, assemblyStatus: s as PartyFilters['assemblyStatus'] }))}
                            className={getStatusClass(temp.assemblyStatus === s, 'bg-emerald-600')}
                        >
                            {s.replace('_', ' ')}
                        </Button>
                    ))}
                </div>
            </div>
        </FilterBar>
    );
}