import { useState } from "react";
import { Link } from "react-router-dom";
import { useEmployeeData, useHasRole } from "../../hooks";
import type { EmployeeFilters } from "../../types";
import { Feed } from "../Common";
import { Loading, ErrorState, DateFiltersComponent } from "../Ui";
import { EmployeeCard } from "./EmployeeCard";

export function FeedEmployee() {
    const [filters, setFilters] = useState<EmployeeFilters>({
        page: 0,
        size: 10,
        start: undefined,
        end: undefined
    }); 

    const { data, isLoading, isError, refetch, isPlaceholderData } = useEmployeeData(filters);
    const isAdmin = useHasRole('ADMIN');
    
    if (isLoading) return <Loading />;
    if (isError) return <ErrorState onRetry={refetch} message="Erro ao carregar os funcionários" />;
    
    const content = data?.content ?? [];
    
    return (
        <Feed
            title="Funcionários"
            isEmpty={content.length === 0}
            emptyMessage="Nenhum funcionário encontrado para estes filtros."
            filterBar={
                <DateFiltersComponent
                    currentFilters={filters}
                    onApply={(newFilters) => setFilters({
                        ...filters,
                        ...newFilters,
                        page: 0
                    })}
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
                {content.map((employee) => {
                    if (isAdmin) {
                        return (
                            <Link 
                                to={`/employees/${employee.employeeId}/edit`} 
                                key={employee.employeeId}
                                className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600 transition-all"
                            >
                                <EmployeeCard employee={employee}/>
                            </Link>
                        );
                    }
                    
                    return (
                        <div key={employee.employeeId} className="w-full">
                            <EmployeeCard employee={employee} />
                        </div>
                    );
                })}
            </div>
        </Feed>
    );
}