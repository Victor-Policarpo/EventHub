import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { History } from "lucide-react";

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

    if (isLoading) return <Loading />;
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

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6 text-gray-800">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>

                    <div className="flex flex-wrap items-center gap-2 mt-3">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-sm font-medium">
                            {partyStatusMap[data.partyStatus] || data.partyStatus}
                        </span>

                        <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-100 rounded-full text-sm font-medium">
                            {assemblyStatusMap[data.assemblyStatus] || data.assemblyStatus}
                        </span>

                        <button
                            onClick={() => setIsTimelineOpen(true)}
                            className="flex items-center gap-2 px-3 py-1 bg-zinc-50 border border-zinc-200 rounded-full text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
                        >
                            <History size={16} />
                            Histórico
                        </button>
                    </div>
                </div>

                <div className="shrink-0 w-full md:w-auto">
                    <PartyActionButtons
                        partyId={id}
                        partyStatus={data.partyStatus}
                        assemblyStatus={data.assemblyStatus}
                    />
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Detalhes do Evento</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                        <p className="text-sm text-gray-500">Telefone</p>
                        <p className="font-medium mt-1">{data.telephone}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Valor</p>
                        <p className="font-medium mt-1 text-green-600">
                            R$ {data.value.toFixed(2)}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Início</p>
                        <p className="font-medium mt-1">
                            {formatDateHours(data.startDateHours)}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Término</p>
                        <p className="font-medium mt-1">
                            {formatDateHours(data.endDateHours)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Brinquedos Locados
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {data.partyToys.length > 0 ? (
                            data.partyToys.map((toy: ToyParty) => (
                                <span
                                    key={toy.toyId}
                                    className="bg-gray-50 border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium"
                                >
                                    {toy.name}
                                    <span className="text-gray-400 ml-1">
                                        x{toy.quantity}
                                    </span>
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-400 text-sm italic">
                                Nenhum brinquedo escalado.
                            </span>
                        )}
                    </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Monitores
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {data.employees.length > 0 ? (
                            data.employees.map((employee: EmployeeParty) => (
                                <span
                                    key={employee.employeeId}
                                    className="bg-gray-50 border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium"
                                >
                                    {employee.name}
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-400 text-sm italic">
                                Nenhum monitor escalado.
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Localização
                </h2>

                <p className="text-gray-600 mb-4">{data.address}</p>

                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-3 rounded-xl font-medium transition-colors"
                >
                    Abrir no Google Maps
                </a>
            </div>

            <Guard role="ADMIN">
                <div className="flex flex-wrap gap-3 pt-4">
                    <Button
                        to={`/parties/${id}/edit`}
                        variant="ghost"
                    >
                        Editar Festa
                    </Button>

                    <Button
                        variant="ghostDanger"
                        onClick={handleDelete}
                        isLoading={isPending}
                        disabled={isPending}
                        className="px-6 py-3 rounded-xl"
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