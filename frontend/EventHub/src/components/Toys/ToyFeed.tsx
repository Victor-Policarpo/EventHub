import { useState } from "react";
import { Link } from "react-router-dom";
import { useToyData } from "../../hooks/toy/useToyData";
import type { ToyFilters } from "../../types";
import { Feed } from "../Common";
import { Loading, ErrorState, DateFiltersComponent } from "../Ui";
import { ToyCard } from "./ToyCard";

export function Toys(){
    const [filters, setFilters] = useState<ToyFilters>({
        page: 0,
        size: 10,
        start: undefined,
        end: undefined
    }); 
    const { data, isLoading, isError, refetch, isPlaceholderData } = useToyData(filters);
    if (isLoading) return <Loading />;
    if (isError) return <ErrorState onRetry={refetch} message="Erro ao carregar os Brinquedos" />;
    const content = data?.content ?? [];
    return (
        <Feed
            title="Gestão de Brinquedos"
            isEmpty={content.length === 0}
            emptyMessage="Nenhum brinquedo encontrado para estes filtros."
            filterBar={
                <DateFiltersComponent
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
        {content.map((toy) => (
            <Link to={`/toys/${toy.toyId}`} key={toy.toyId}>
                <ToyCard toy={toy}/>
            </Link>
        ))}
    </Feed>
    );
}