import type { AxiosPromise } from "axios";
import api from "../../lib/axios";
import type { GetParams, Toy } from "../../types/types";

export function getToys(params: GetParams): AxiosPromise<Toy[]> {
    const response = api.get<Toy[]>("auth/toys", {
        params
    });
    return response;
} 