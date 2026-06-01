export interface DashboardSummary {
  totalParties: number;
  revenueReceived: number;
  revenueToReceive: number;
  totalRevenue: number;
}

export interface RevenueChartData {
  year: number;
  month: number;
  label: string;
  revenue: number;
}

export interface RevenueBreakdown {
  received: number;
  pending: number;
}

export interface DashboardFilters {
  start?: string;
  end?: string;
}