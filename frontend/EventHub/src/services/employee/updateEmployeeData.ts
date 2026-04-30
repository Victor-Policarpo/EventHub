import type { AxiosPromise } from "axios";
import type { UpdateEmployeeData } from "../../types";
import { api } from "../../lib/axios";

export default function updateEmployeeData(id: number, data: UpdateEmployeeData): AxiosPromise<UpdateEmployeeData> {
    const response = api.patch<UpdateEmployeeData>(`auth/employee/${id}`, data);
    return response;
}