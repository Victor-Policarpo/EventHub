import { ArrowLeft } from "lucide-react";
import { Button, FinanceDashboard } from "../../components";

export function DashboardFinance() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full">
      <div className="max-w-7xl mx-auto space-y-4">
        <nav className="flex items-center">
          <Button
            to="/feed" 
            variant="ghost" 
            className="w-8 h-8 rounded-full p-0 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={18} />
          </Button>
          <span className="text-sm font-medium text-gray-500 ml-2">Voltar ao Feed</span>
        </nav>

        <div>
          <FinanceDashboard />
        </div>
      </div>
    </div>
  );
}
