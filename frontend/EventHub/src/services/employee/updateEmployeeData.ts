import type { AxiosPromise } from "axios";
import type { EmployeeData, EmployeeInput } from "../../types";
import { api } from "../../lib/axios";

export function updateEmployeeData(id: number, data: EmployeeInput): AxiosPromise<EmployeeData> {
    const response = api.patch<EmployeeData>(`auth/employee/${id}`, data);
    return response;
}