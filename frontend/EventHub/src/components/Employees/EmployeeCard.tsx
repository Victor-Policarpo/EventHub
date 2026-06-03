import { Phone, CheckCircle2, XCircle } from "lucide-react";
import type { EmployeeData } from "../../types";
import { Card } from "../Common";
import { formatPhoneDisplay } from "../../utils/formatPhoneDisplay";


export function EmployeeCard({ employee }: { employee: EmployeeData }) {
    return (
        <Card className="flex flex-col gap-3">
            
            <div className="flex items-start justify-between gap-4">
                <h2 className="font-semibold text-base text-slate-900 tracking-tight line-clamp-1">
                    {employee.name}
                </h2>

                <div className="shrink-0">
                    {employee.isAvailable ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                            <CheckCircle2 size={14} />
                            Disponível
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200">
                            <XCircle size={14} className="text-slate-400" />
                            Indisponível
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                <Phone size={14} className="text-slate-400 shrink-0" />
                <span className="font-medium tracking-wide">
                    {formatPhoneDisplay(employee.telephone)}
                </span>
            </div>
            
        </Card>
    );
}