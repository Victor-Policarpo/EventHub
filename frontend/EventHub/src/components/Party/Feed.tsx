import { useState } from "react";
import { usePartyData } from "../../hooks/usePartyData";
import type { PartyData, PartyFilters } from "../../types/types";
import { ChevronLeft, ChevronRight, ChevronDown, SlidersHorizontal} from "lucide-react";
import ErrorState from "../Ui/ErrorState";
import Loading from "../Ui/Loading";
import PartyCard from "./PartyCard";

function FeedParty() {
    // 1. Estado que dispara a busca no React Query
    const [filters, setFilters] = useState<PartyFilters>({ 
        page: 0, 
        size: 10,
        partyStatus: 'SCHEDULED', 
        assemblyStatus: 'TO_ASSEMBLE'
    });

    // 2. Estado temporário para o Popover (não dispara request ao clicar)
    const [tempFilters, setTempFilters] = useState({
        partyStatus: filters.partyStatus,
        assemblyStatus: filters.assemblyStatus
    });
    
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    // Hook do React Query
    const { data, isLoading, isError, error, refetch, isPlaceholderData } = usePartyData(filters);

    // 3. Mapeamento seguro dos dados baseados no seu console.log
    const content = data?.content ?? [];
    const currentPage = data?.page?.number ?? 0;
    const totalPages = data?.page?.totalPages ?? 1;

    // Função para aplicar os filtros de uma vez
    const handleApplyFilters = () => {
        setFilters(prev => ({
            ...prev,
            partyStatus: tempFilters.partyStatus,
            assemblyStatus: tempFilters.assemblyStatus,
            page: 0 // Sempre volta para a primeira página ao filtrar
        }));
        setIsFilterOpen(false);
    };

    const handlePageChange = (newPage: number) => {
        setFilters(prev => ({ ...prev, page: newPage }));
    };

    if (isLoading) return <Loading />;

    if (isError) {
        return (
            <ErrorState
                message="Erro ao carregar as festas 😢"
                detail={error instanceof Error ? error.message : undefined}
                onRetry={refetch}
            />
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            
            {/* --- CABEÇALHO E FILTROS --- */}
            <div className="flex items-center flex-wrap gap-3">
                <div className="relative">
                    <button 
                        onClick={() => {
                            setTempFilters({
                                partyStatus: filters.partyStatus,
                                assemblyStatus: filters.assemblyStatus
                            });
                            setIsFilterOpen(!isFilterOpen);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                    >
                        <SlidersHorizontal size={18} /> 
                        Filtrar
                        <ChevronDown size={16} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Popover de Filtros */}
                    {isFilterOpen && (
                        <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4 animate-in fade-in zoom-in-95 duration-150">
                            <div className="mb-4">
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Status da Festa</label>
                                <div className="flex flex-wrap gap-2">
                                    {(['SCHEDULED', 'IN_PROGRESS', 'FINISHED', 'CANCELED'] as const).map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => setTempFilters(prev => ({ ...prev, partyStatus: status }))}
                                            className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                                                tempFilters.partyStatus === status 
                                                ? 'bg-blue-600 text-white border-blue-600' 
                                                : 'bg-gray-50 text-gray-600 border-transparent hover:border-blue-300'
                                            }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Status da Montagem</label>
                                <div className="flex flex-wrap gap-2">
                                    {(['TO_ASSEMBLE', 'ASSEMBLED', 'TO_DISASSEMBLE', 'DISASSEMBLED', 'NOT_APPLICABLE'] as const).map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => setTempFilters(prev => ({ ...prev, assemblyStatus: status }))}
                                            className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                                                tempFilters.assemblyStatus === status 
                                                ? 'bg-green-600 text-white border-green-600' 
                                                : 'bg-gray-50 text-gray-600 border-transparent hover:border-green-300'
                                            }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button 
                                onClick={handleApplyFilters}
                                className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md transition-colors"
                            >
                                Aplicar Filtros
                            </button>
                        </div>
                    )}
                </div>

                {/* Badges Ativos (Refletem o estado 'filters' real da API) */}
                <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-xs font-bold">
                        Festa: {filters.partyStatus}
                    </span>
                    <span className="bg-green-50 text-green-700 border border-green-100 px-3 py-1 rounded-full text-xs font-bold">
                        Montagem: {filters.assemblyStatus}
                    </span>
                </div>
            </div>

            {/* --- LISTAGEM DE CARDS --- */}
            <div className={`space-y-4 transition-opacity ${isPlaceholderData ? 'opacity-50' : 'opacity-100'}`}>
                {content.length > 0 ? (
                    content.map((party: PartyData) => (
                        <PartyCard key={party.partyId} party={party}/>
                    ))
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500 italic">Nenhuma festa encontrada para estes filtros.</p>
                    </div>
                )}
            </div>

            {/* --- PAGINAÇÃO (CONECTADA AO OBJETO 'PAGE') --- */}
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">
                        Página <strong>{currentPage + 1}</strong> de <strong>{totalPages}</strong> 
                    </span>
                    <span className="text-[10px] text-gray-400">Total de registros: {data?.page?.totalElements ?? 0}</span>
                </div>
                
                <div className="flex gap-2">
                    <button
                        disabled={currentPage === 0 || isPlaceholderData}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="p-2 border border-gray-300 rounded-lg disabled:opacity-30 hover:bg-gray-50 transition-colors shadow-sm bg-white"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        disabled={currentPage >= totalPages - 1 || isPlaceholderData}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="p-2 border border-gray-300 rounded-lg disabled:opacity-30 hover:bg-gray-50 transition-colors shadow-sm bg-white"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FeedParty;