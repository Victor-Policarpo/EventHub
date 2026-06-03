import { useState } from "react";
import { Link } from "react-router-dom";
import { useEmployeeData, useHasRole } from "../../hooks";
import type { EmployeeFilters } from "../../types";
import { formatForApi } from "../../utils/formatDateHours";
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
        <div>
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
            start: formatForApi(newFilters.start),
            end: formatForApi(newFilters.end),
            page: 0
        })}/>    
            }
            pagination={{
            currentPage: data?.page?.number ?? 0,
            totalPages: data?.page?.totalPages ?? 1,
            totalElements: data?.page?.totalElements ?? 0,
            isPlaceholderData,
            onPageChange: (page) => setFilters(prev => ({ ...prev, page }))
        }}
            >
            {content.map((employee) => {
                if (isAdmin) {
                    return (
                        <Link to={`/employees/${employee.employeeId}/edit`} key={employee.employeeId}>
                            <EmployeeCard employee={employee}/>
                        </Link>
                    );
                }
                return <EmployeeCard employee={employee} key={employee.employeeId} />;
            })}
        </Feed>
        </div>
    );
}