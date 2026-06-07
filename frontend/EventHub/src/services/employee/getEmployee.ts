import api from "../../lib/axios";
import type { EmployeeData, EmployeeFilters, PageResponse } from "../../types";

export async function getEmployee(params: EmployeeFilters): Promise<PageResponse<EmployeeData>> {
    const response = await api.get<PageResponse<EmployeeData>>("/auth/employee", {
        params
    });
    return response.data;
}