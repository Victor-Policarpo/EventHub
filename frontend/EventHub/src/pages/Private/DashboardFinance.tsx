import { FinanceDashboard } from "../../components";

export function DashboardFinance() {
    return (
        <div className="min-h-screen bg-slate-50 pt-6 pb-12 px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-7xl mx-auto space-y-4">
                <FinanceDashboard />
            </div>
        </div>
    );
}