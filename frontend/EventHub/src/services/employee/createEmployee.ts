import api from "../../lib/axios";
import type { EmployeeData, EmployeeInput } from "../../types";

export async function createEmployee(employeeData: EmployeeInput): Promise<EmployeeData> {
    const response = await api.post<EmployeeData>('/auth/employee', 
        employeeData
    )
    return response.data;
}