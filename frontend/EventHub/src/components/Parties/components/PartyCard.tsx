import { MapPin, CalendarDays, Clock } from "lucide-react";
import type { PartyData } from "../../../types";
import { assemblyStatusMap, partyStatusMap } from "../../../utils/statusTranslations";
import { Card } from "../../Common";
import { formatDateHours } from "../../../utils/formatDateHours";

export function PartyCard({ party }: { party: PartyData }) {
    const { date, time } = formatDateHours(party.startDateHours);

    return (
        <Card className="flex flex-col h-full">
            
            <div className="flex items-start justify-between gap-4 mb-4">
                <h2 
                    className="font-semibold text-base text-slate-900 tracking-tight line-clamp-2" 
                    title={party.name}
                >
                    {party.name}
                </h2>
                <div className="shrink-0">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100 shadow-sm whitespace-nowrap">
                        {partyStatusMap[party.partyStatus] || party.partyStatus}
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-3 flex-1">
                
                <div className="flex items-center flex-wrap gap-2 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                        <CalendarDays size={16} className="text-slate-400 shrink-0" />
                        <span className="font-medium text-slate-700 leading-snug">
                            {date}
                        </span>
                    </div>
                    
                    {time && (
                        <div className="flex items-center gap-2">
                            <span className="text-slate-300 mx-0.5">•</span>
                            <Clock size={14} className="text-slate-400 shrink-0" />
                            <span className="font-semibold text-slate-800 leading-snug">
                                {time}
                            </span>
                        </div>
                    )}
                </div>
                
                <div className="flex items-start gap-2.5 text-sm text-slate-500">
                    <MapPin size={16} className="text-slate-400 shrink-0 mt-0.5" />
                    <span className="leading-snug line-clamp-2" title={party.address}>
                        {party.address}
                    </span>
                </div>
                
            </div>

            <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider truncate">
                    <span className="hidden sm:inline">Logística de </span>Montagem
                </span>
                
                <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2 py-1 rounded-md text-[11px] sm:text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200">
                    {assemblyStatusMap[party.assemblyStatus] || party.assemblyStatus}
                </span>
            </div>
            
        </Card>
    );
}