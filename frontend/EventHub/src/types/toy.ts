import type { BaseFilters } from "./pagination";

export interface ToyData {
    toyId: number;
    name: string;
    valueForFourHours: number;
    availableQuantity: number;
}

export interface ToyFilters extends BaseFilters {
    startDateHours?: string;
    endDateHours?: string;
}