import type { AxiosPromise } from "axios";
import api from "../../lib/axios";
import type { UserDataResponse } from "../../types/types";

export default function getCurrentUser(): AxiosPromise<UserDataResponse>{
    const response = api.get<UserDataResponse>("auth/profile")
    return response;
} 