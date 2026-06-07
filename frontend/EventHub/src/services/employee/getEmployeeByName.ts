import api from "../../lib/axios";
import type { EmployeeData, PageResponse } from "../../types";

export async function getEmployeeByName(search: string): Promise<PageResponse<EmployeeData>> {
    const response = await api.get<PageResponse<EmployeeData>>(`/auth/employee`, { params: { search } })
    return response.data;
}