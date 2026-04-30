import api from "../../lib/axios";
import type { EmployeeData } from "../../types";

export async function getEmployeeById(id: number): Promise<EmployeeData> {
    const response = await api.get<EmployeeData>(`/auth/employee/${id}`);
    return response.data;
}