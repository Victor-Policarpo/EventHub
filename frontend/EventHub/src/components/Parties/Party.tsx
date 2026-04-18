import { Link, useParams } from "react-router-dom";
import { useGetParty } from "../../hooks/useGetParty";
import type { EmployeeParty, ToyParty } from "../../types";
import ErrorState from "../Ui/ErrorState";
import Loading from "../Ui/Loading";
import { formatDateHours } from "../../utils/formatDateHours";
import { useDeleteParty } from "../../hooks/useDeleteParty";

function Party() {
    const { partyId } = useParams();
    const id = partyId ? Number(partyId) : NaN;
    const { data, isLoading, error, refetch } = useGetParty(id);
    const { mutate, isPending } = useDeleteParty();
    if (!partyId || isNaN(id)) {
        return <ErrorState message="ID da festa inválido ou não fornecido" />;
    }

    if (isLoading) return <Loading />;

    if (error) {
        return (
            <ErrorState
                message="Erro ao carregar a festa 😢"
                detail={error instanceof Error ? error.message : undefined}
                onRetry={() => refetch()}
            />
        );
    }

    if (!data) {
        return <ErrorState message="Festa não encontrada" onRetry={() => refetch()} />;
    }

    function handleDelete() {
        mutate(partyId!);
    }

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Nome: {data.name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p><strong>Telefone:</strong> {data.telephone}</p>
                <p><strong>Valor:</strong> R$ {data.value.toFixed(2)}</p>
                
                <p><strong>Início:</strong> {formatDateHours(data.startDateHours)}</p>
                <p><strong>Fim:</strong> {formatDateHours(data.endDateHours)}</p>
                
                <p><strong>Status:</strong> {data.partyStatus}</p>
                <p><strong>Montagem:</strong> {data.assemblyStatus}</p>
            </div>

            <div className="border-t pt-4">
                <strong>Brinquedos:</strong>
                <div className="flex flex-wrap gap-2 mt-2">
                    {data.partyToys.map((toy: ToyParty) => (
                        <span key={toy.toyId} className="bg-blue-50 border border-blue-200 px-2 py-1 rounded">
                            {toy.name} ({toy.quantity})
                        </span>
                    ))}
                </div>
            </div>

            <div className="border-t pt-4">
                <strong>Monitores:</strong>
                <div className="flex flex-wrap gap-2 mt-2">
                    {data.employees.length > 0 ? (
                        data.employees.map((employee: EmployeeParty) => (
                            <span key={employee.employeeId} className="bg-green-50 border border-green-200 px-2 py-1 rounded">
                                {employee.name}
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-400 italic text-sm">
                            Nenhum monitor escalado para esta festa.
                        </span>
                    )}
                </div>
            </div>
            <div className="border-t pt-4">
                <strong>Endereço:</strong>
                <p>{data.address}</p>
                <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`}
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-3 w-100 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-all"
                >
                <span>📍</span>
                <span>Abrir no Google Maps / Waze</span>
                </a>
            </div>

            <div className="border-t pt-4">
                <Link to={`/parties/${id}/edit`} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold shadow-md">
                Editar Festa
                </Link>
                <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-bold shadow-md active:scale-95 transition-all" onClick={handleDelete}>
                    {isPending ? "Excluindo..." : "Apagar Party"}
                </button>
            </div>
            
        </div>
    );
}
export default Party;