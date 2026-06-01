import api from "../../lib/axios";
import type { FinanceData } from "../../types";

interface StartEndFilters {
    start?: string;
    end?: string;
}
export async function getFinance(filters?: StartEndFilters): Promise<FinanceData> {
    const response = await api.get<FinanceData>('auth/finance', { params: filters });
    return response.data;
}