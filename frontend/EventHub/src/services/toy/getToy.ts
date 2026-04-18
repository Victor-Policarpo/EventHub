import type { AxiosPromise } from "axios";
import api from "../../lib/axios";
import type { PageResponse, ToyData, ToyFilters } from "../../types";

export function getToys(params: ToyFilters): AxiosPromise<PageResponse<ToyData>> {
    const response = api.get<PageResponse<ToyData>>("auth/toys", {
        params
    });
    return response;
} 