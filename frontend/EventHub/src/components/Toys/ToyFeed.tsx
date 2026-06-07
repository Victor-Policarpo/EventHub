import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToyData, useHasRole } from "../../hooks";
import type { ToyData, ToyFilters } from "../../types";
import { Feed } from "../Common";
import { Loading, ErrorState, DateFiltersComponent, SearchInput } from "../Ui";
import { ToyCard } from "./ToyCard";
import { useDebounce } from "use-debounce";

export function Toys() {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedValue] = useDebounce(searchTerm, 500);
    const [filters, setFilters] = useState<ToyFilters>({
        page: 0,
        size: 10,
        start: undefined,
        end: undefined,
        search: ""
    }); 

    const { data, isLoading, isError, refetch, isPlaceholderData } = useToyData(filters);

    useEffect(() => {
        setFilters(prev => {
            if (prev.search === debouncedValue) return prev;
            
            return {
                ...prev,
                search: debouncedValue,
                page: 0
            };
        });
        }, [debouncedValue]);
    const isAdmin = useHasRole('ADMIN');

    if (isLoading) return <Loading />;
    if (isError) return <ErrorState onRetry={refetch} message="Erro ao carregar os Brinquedos" />;

    const content = data?.content ?? [];

    return (
        <Feed
            title="Brinquedos"
            isEmpty={content.length === 0}
            emptyMessage="Nenhum brinquedo encontrado para estes filtros."
            filterBar={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 w-full">
                    <DateFiltersComponent
                        currentFilters={filters}
                        onApply={(newFilters) => setFilters(prev => ({
                            ...prev,
                            ...newFilters,
                            page: 0
                        }))}
                    />
                    <div className="w-full md:max-w-md">
                        <SearchInput 
                            placeholder="Procurar brinquedo por nome..."
                            value={searchTerm}
                            onSearch={setSearchTerm}
                        />
                    </div>
                </div>
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
                {content.map((toy: ToyData) => {
                    if (isAdmin) {
                        return (
                            <Link 
                                to={`/toys/${toy.toyId}/edit`} 
                                key={toy.toyId}
                                className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600 transition-all"
                            >
                                <ToyCard toy={toy} />
                            </Link>
                        );
                    }
                    
                    return (
                        <div key={toy.toyId} className="w-full">
                            <ToyCard toy={toy} />
                        </div>
                    );
                })}
            </div>
        </Feed>
    );
}