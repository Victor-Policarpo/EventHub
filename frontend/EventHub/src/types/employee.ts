import type { BaseFilters } from "./pagination";

export interface EmployeeData {
    employeeId: number;
    name: string;
    telephone: string;
    isAvailable: boolean;
}

export interface EmployeeResponse {
    content: EmployeeData[];
}

export interface EmployeeFilters extends BaseFilters {
    start?: string;
    end?: string;
    excludePartyId?: number;
}

export interface EmployeeInput {
    name: string;
    telephone: string;
}
