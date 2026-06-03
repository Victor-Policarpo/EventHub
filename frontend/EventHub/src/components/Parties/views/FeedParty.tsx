import { useState } from "react";
import { Link } from "react-router-dom";
import { usePartyData } from "../../../hooks";
import type { PartyFilters } from "../../../types";
import { Feed } from "../../Common";
import { Loading, ErrorState } from "../../Ui";
import { PartyCard } from "../components/PartyCard";
import { PartyFiltersComponent } from "../components/PartyFilters";

export function FeedParty() {
    const [filters, setFilters] = useState<PartyFilters>({ 
        page: 0, 
        size: 10,
        partyStatus: 'SCHEDULED', 
        assemblyStatus: 'TO_ASSEMBLE'
    });

    const { data, isLoading, isError, refetch, isPlaceholderData } = usePartyData(filters);

    if (isLoading) return <Loading />;
    if (isError) return <ErrorState onRetry={refetch} message="Erro ao carregar festas" />;

    const content = data?.content ?? [];

    return (
        <Feed
            title="Gestão de Festas"
            isEmpty={content.length === 0}
            emptyMessage="Nenhuma festa encontrada para estes filtros."
            filterBar={
                <PartyFiltersComponent
                    currentFilters={filters} 
                    onApply={(newFilters) => setFilters({...filters, ...newFilters, page: 0})} 
                />
            }
            pagination={{
                currentPage: data?.page?.number ?? 0,
                totalPages: data?.page?.totalPages ?? 1,
                totalElements: data?.page?.totalElements ?? 0,
                isPlaceholderData,
                onPageChange: (page) => setFilters(prev => ({ ...prev, page }))
            }}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 w-full">
                {content.map((party) => (
                    <Link 
                        to={`/parties/${party.partyId}`} 
                        key={party.partyId}
                        className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600 transition-all"
                    >
                        <PartyCard party={party} />
                    </Link>
                ))}
            </div>
        </Feed>
    );
}