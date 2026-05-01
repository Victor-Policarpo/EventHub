import type { AxiosPromise } from "axios";
import api from "../../lib/axios";
import type { PageResponse, ToyData, ToyFilters } from "../../types";

export async function getToys(params: ToyFilters): AxiosPromise<PageResponse<ToyData>> {
    const response = await api.get<PageResponse<ToyData>>("auth/toys", {
        params
    });
    return response;
} 