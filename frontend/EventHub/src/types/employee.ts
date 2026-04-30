import type { BaseFilters } from "./pagination";

export interface EmployeeData {
    employeeId: number;
    name: string;
    telephone: string;
    isAvailable: boolean;
}

export interface EmployeeFilters extends BaseFilters {
    start?: string;
    end?: string;
}

export interface UpdateEmployeeData {
    name: string;
    telephone: string;
}