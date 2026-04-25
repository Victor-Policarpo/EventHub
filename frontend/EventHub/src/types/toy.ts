import type { BaseFilters } from "./pagination";

export interface ToyData {
    toyId: number;
    name: string;
    valueForFourHours: number;
    availableQuantity: number;
}

export interface ToyFilters extends BaseFilters {
    start?: string;
    end?: string;
}

export interface UpdateToyData {
    name: string;
    valueForFourHours: number;
    availableQuantity: number;
}