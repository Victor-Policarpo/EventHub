import type { BaseFilters } from "./pagination";

export interface EmployeeData {
    employeeId: number;
    name: string;
    telephone: string;
    isAvailable: boolean;
}

export interface EmployeeFilters extends BaseFilters {
    startDateHours?: string;
    endDateHours?: string;
}