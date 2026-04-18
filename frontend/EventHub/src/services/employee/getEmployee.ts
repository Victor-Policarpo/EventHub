import type { AxiosPromise } from "axios";
import api from "../../lib/axios";
import type { EmployeeData, EmployeeFilters, PageResponse } from "../../types";

export function getEmployee(params: EmployeeFilters): AxiosPromise<PageResponse<EmployeeData>> {
    const response = api.get<PageResponse<EmployeeData>>("/auth/employee", {
        params
    });
    return response;
}