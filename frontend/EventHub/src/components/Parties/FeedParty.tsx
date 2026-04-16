import { useState } from "react";
import { usePartyData } from "../../hooks/usePartyData";
import PartyCard from "./PartyCard";
import Loading from "../Ui/Loading";
import ErrorState from "../Ui/ErrorState";
import { Link } from "react-router-dom";
import type { PartyFilters } from "../../types/types";
import Feed from "../Common/Feed";
import PartyFiltersComponent from "./PartyFilters";

function FeedParty() {
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
            {content.map((party) => (
                <Link to={`/parties/${party.partyId}`} key={party.partyId}>
                    <PartyCard party={party} />
                </Link>
            ))}
        </Feed>
    );
}
export default FeedParty;