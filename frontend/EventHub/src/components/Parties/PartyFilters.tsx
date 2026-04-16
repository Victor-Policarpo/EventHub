import { useState } from "react";
import { FilterBar } from "../Common/FilterBar";
import { type PartyFilters } from "../../types/types";

interface Props {
    currentFilters: PartyFilters;
    onApply: (filters: Partial<PartyFilters>) => void;
}

function PartyFiltersComponent({ currentFilters, onApply }: Props) {
    const [temp, setTemp] = useState({
        partyStatus: currentFilters.partyStatus,
        assemblyStatus: currentFilters.assemblyStatus
    });

    return (
        <FilterBar 
            onApply={() => onApply(temp)}
            activeFiltersDisplay={
                <>
                    <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-xs font-bold">
                        {currentFilters.partyStatus}
                    </span>
                    <span className="bg-green-50 text-green-700 border border-green-100 px-3 py-1 rounded-full text-xs font-bold">
                        {currentFilters.assemblyStatus}
                    </span>
                </>
            }
        >
            <div className="mb-4">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Status da Festa</label>
                <div className="flex flex-wrap gap-2">
                    {['SCHEDULED', 'IN_PROGRESS', 'FINISHED', 'CANCELED'].map((s) => (
                        <button 
                            key={s}
                            onClick={() => setTemp(p => ({ ...p, partyStatus: s as PartyFilters['partyStatus'] }))}
                            className={`px-3 py-1.5 text-xs rounded-full border ${temp.partyStatus === s ? 'bg-blue-600 text-white' : 'bg-gray-50'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Status da Montagem</label>
                <div className="flex flex-wrap gap-2">
                    {['TO_ASSEMBLE', 'ASSEMBLED', 'TO_DISASSEMBLE', 'DISASSEMBLED', 'NOT_APPLICABLE'].map((s) => (
                        <button 
                            key={s}
                            onClick={() => setTemp(p => ({ ...p, assemblyStatus: s as PartyFilters['assemblyStatus'] }))}
                            className={`px-3 py-1.5 text-xs rounded-full border ${temp.assemblyStatus === s ? 'bg-green-600 text-white' : 'bg-gray-50'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>
        </FilterBar>
    );
}
export default PartyFiltersComponent;