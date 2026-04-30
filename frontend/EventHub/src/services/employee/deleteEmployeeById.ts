import api from "../../lib/axios";

export default async function deleteEmployeeById(employeeId: number): Promise<void> {
    await api.delete(`auth/employee/${employeeId}`);
}