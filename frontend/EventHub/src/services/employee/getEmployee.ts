import type { AxiosPromise } from "axios";
import api from "../../lib/axios";
import type { Employee, GetParams } from "../../types/types";

export function getEmployee(params: GetParams): AxiosPromise<Employee[]> {
    const response = api.get<Employee[]>("/auth/employee", {
        params
    });
    return response;
}