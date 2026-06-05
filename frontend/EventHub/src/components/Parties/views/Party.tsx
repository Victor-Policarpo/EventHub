import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { History, Phone, CircleDollarSign, CalendarDays, Clock } from "lucide-react";

import { useGetParty, useDeleteParty } from "../../../hooks";
import { Button, ErrorState, Loading } from "../../Ui";
import { formatDateHours } from "../../../utils/formatDateHours";
import type { EmployeeParty, ToyParty } from "../../../types";
import { Guard } from "../../Common";
import { PartyActionButtons } from "../components/PartyActionButtons";
import { assemblyStatusMap, partyStatusMap } from "../../../utils/statusTranslations";
import { PartyTimelineModal } from "./PartyTimeLineModal";
import toast from "react-hot-toast";

export function Party() {
    const [isTimelineOpen, setIsTimelineOpen] = useState(false);

    const { partyId } = useParams();
    const id = partyId ? Number(partyId) : NaN;
    const { data, isLoading, isError, refetch } = useGetParty(id);
    const { mutate, isPending } = useDeleteParty();
    const navigate = useNavigate();

    if (isLoading) return <div className="py-12 flex justify-center"><Loading /></div>;
    if (isError || !partyId || isNaN(id)) return <Navigate to="/parties" replace />;
    if (!data) return <ErrorState message="Erro ao carregar a festa" onRetry={() => refetch()} />;
    
    function handleDelete() {
        if (!confirm("Tem certeza que deseja excluir esta festa? Essa ação não pode ser desfeita.")) return;
        mutate(id, {
            onSuccess: () => {
                toast.success("Festa excluída com sucesso!");
                navigate("/parties", { replace: true });
            },
            onError: () => {
                toast.error("Erro ao excluir a festa. Tente novamente.");
            }
        });
    }

    const startDateTime = formatDateHours(data.startDateHours);
    const endDateTime = formatDateHours(data.endDateHours);

    return (
    <div className="max-w-5xl mx-auto space-y-6 text-slate-800">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                <div className="flex-1 min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                        {data.name}
                    </h1>

                    <div className="flex flex-wrap items-center gap-2 mt-4">

                        <span className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-xs sm:text-sm font-semibold">
                            {partyStatusMap[data.partyStatus] || data.partyStatus}
                        </span>

                        <span className="px-3 py-1.5 bg-purple-50 text-purple-700 border border-purple-100 rounded-full text-xs sm:text-sm font-semibold">
                            {assemblyStatusMap[data.assemblyStatus] || data.assemblyStatus}
                        </span>

                        <button
                            onClick={() => setIsTimelineOpen(true)}
                            className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                        >
                            <History size={16} />
                            Ver Histórico
                        </button>

                    </div>
                </div>

                <div className="w-full lg:w-auto lg:shrink-0">
                    <PartyActionButtons
                        partyId={id}
                        partyStatus={data.partyStatus}
                        assemblyStatus={data.assemblyStatus}
                    />
                </div>

            </div>
        </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-5">Detalhes do Evento</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:border-slate-200">
                        <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-500 shrink-0">
                            <Phone size={20} />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Telefone</p>
                            <p className="font-semibold text-slate-800 text-sm truncate">{data.telephone}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:border-slate-200">
                        <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-500 shrink-0">
                            <CircleDollarSign size={20} />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Valor Total</p>
                            <p className="font-semibold text-slate-800 text-sm truncate">R$ {data.value.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:border-slate-200">
                        <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-500 shrink-0">
                            <CalendarDays size={20} />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Início</p>
                            <p className="font-semibold text-slate-800 text-sm truncate">
                                {startDateTime.date}
                            </p>
                            <div className="flex items-center text-slate-500 text-xs mt-0.5">
                                <Clock size={12} className="mr-1.5 shrink-0" />
                                <span className="font-medium truncate">{startDateTime.time}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:border-slate-200">
                        <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-500 shrink-0">
                            <CalendarDays size={20} />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Término</p>
                            <p className="font-semibold text-slate-800 text-sm truncate">
                                {endDateTime.date}
                            </p>
                            <div className="flex items-center text-slate-500 text-xs mt-0.5">
                                <Clock size={12} className="mr-1.5 shrink-0" />
                                <span className="font-medium truncate">{endDateTime.time}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">
                        Brinquedos Locados
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {data.partyToys.length > 0 ? (
                            data.partyToys.map((toy: ToyParty) => (
                                <span
                                    key={toy.toyId}
                                    className="bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium"
                                >
                                    {toy.name}
                                    <span className="text-slate-400 ml-1.5 font-bold">
                                        x{toy.quantity}
                                    </span>
                                </span>
                            ))
                        ) : (
                            <span className="text-slate-400 text-sm italic">
                                Nenhum brinquedo escalado.
                            </span>
                        )}
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">
                        Monitores
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {data.employees.length > 0 ? (
                            data.employees.map((employee: EmployeeParty) => (
                                <span
                                    key={employee.employeeId}
                                    className="bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium"
                                >
                                    {employee.name}
                                </span>
                            ))
                        ) : (
                            <span className="text-slate-400 text-sm italic">
                                Nenhum monitor escalado.
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold text-slate-900 mb-2">
                        Localização
                    </h2>
                    <p className="text-slate-600">{data.address}</p>
                </div>

                <a
                    href={`https://maps.google.com/?q=$${encodeURIComponent(data.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-3 rounded-xl font-medium transition-colors shrink-0 text-sm sm:text-base"
                >
                    Abrir no Maps
                </a>
            </div>

            <Guard role="ADMIN">
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
                    <Button
                        to={`/parties/${id}/edit`}
                        variant="ghost"
                        className="w-full sm:w-auto px-8"
                    >
                        Editar Festa
                    </Button>

                    <Button
                        variant="ghostDanger"
                        onClick={handleDelete}
                        isLoading={isPending}
                        disabled={isPending}
                        className="w-full sm:w-auto px-8"
                    >
                        Apagar Festa
                    </Button>
                </div>
            </Guard>

            <PartyTimelineModal
                partyId={id}
                isOpen={isTimelineOpen}
                onClose={() => setIsTimelineOpen(false)}
            />

        </div>
    );
}