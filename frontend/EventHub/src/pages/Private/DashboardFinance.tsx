import { FinanceDashboard } from "../../components";

export function DashboardFinance() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full">
      <div className="max-w-7xl mx-auto space-y-4">
        <div>
          <FinanceDashboard />
        </div>
      </div>
    </div>
  );
}
