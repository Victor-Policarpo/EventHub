import type { BaseFilters } from "./pagination";

export interface ToyData {
    toyId: number;
    name: string;
    valueForFourHours: number;
    availableQuantity: number;
}

export interface ToyResponse {
    content: ToyData[];
}

export interface ToyFilters extends BaseFilters {
    start?: string;
    end?: string;
    excludePartyId?: number;
    search?: string;
}

export interface ToyInput {
    name: string;
    valueForFourHours: number;
    availableQuantity: number;
}

export interface SelectedToyPayload {
  toyId: number;
  quantity: number;
}