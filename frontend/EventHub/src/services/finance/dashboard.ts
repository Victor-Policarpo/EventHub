import api from "../../lib/axios";
import type { DashboardFilters, DashboardSummary, RevenueBreakdown, RevenueChartData } from "../../types";

export async function getSummary(filters?: DashboardFilters): Promise<DashboardSummary>{
    const response = await api.get("/auth/finance/summary", { params: filters });
    return response.data;
}

export async function getRevenueChart(filters?: DashboardFilters): Promise<RevenueChartData[]>{
    const response = await api.get("/auth/finance/revenue", { params: filters });
    return response.data;
}

export async function getRevenueBreakdown(filters?: DashboardFilters): Promise<RevenueBreakdown> {
    const response = await api.get("/auth/finance/revenue-breakdown", { params: filters });
    return response.data;
}