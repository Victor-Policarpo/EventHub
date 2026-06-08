import { Package, Clock } from "lucide-react";
import type { ToyData } from "../../types";
import { Card } from "../Common";
import { formatCurrency } from "../../utils/formatCurrency";

export function ToyCard({ toy }: { toy: ToyData }) {
    const hasStock = Number(toy.availableQuantity) > 0;

    return (
        <Card className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-3">
                <h2
                    className="font-semibold text-base text-slate-900 tracking-tight line-clamp-1"
                    title={toy.name}
                >
                    {toy.name}
                </h2>

                <div className="shrink-0">
                    {hasStock ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 shadow-sm">
                            <Package size={14} />
                            {toy.availableQuantity}{" "}
                            {toy.availableQuantity === 1 ? "unid." : "unids."}
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-red-50 text-red-600 border border-red-100 shadow-sm">
                            <Package size={14} />
                            Esgotado
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
                <Clock size={14} className="text-slate-400 shrink-0" />

                <div className="flex items-baseline gap-1">
                    <span className="font-medium text-slate-700 tracking-wide">
                        {formatCurrency(toy.valueForFourHours)}
                    </span>

                    <span className="text-xs text-slate-400 font-medium">
                        / 4 horas
                    </span>
                </div>
            </div>
        </Card>
    );
}