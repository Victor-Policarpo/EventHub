import type { BaseFilters } from "./pagination";

export interface EmployeeData {
    employeeId: number;
    name: string;
    telephone: string;
    isActive: boolean;
    isAvailable: boolean;
}

export interface EmployeeResponse {
    content: EmployeeData[];
}

export interface EmployeeFilters extends BaseFilters {
    start?: string;
    end?: string;
    excludePartyId?: number;
    search?: string;
}

export interface EmployeeInput {
    name: string;
    telephone: string;
}
