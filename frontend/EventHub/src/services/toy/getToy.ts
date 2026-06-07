import api from "../../lib/axios";
import type { PageResponse, ToyData, ToyFilters } from "../../types";

export async function getToys(params: ToyFilters): Promise<PageResponse<ToyData>> {
    const response = await api.get<PageResponse<ToyData>>("auth/toys", {
        params
    });
    return response.data;
} 