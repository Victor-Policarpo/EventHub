import { useParams } from 'react-router-dom';
import { EditParty } from "../../components";

export function PartyEditPage() {
    const { partyId } = useParams<{ partyId: string }>();
    const id = Number(partyId);

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 flex justify-center">
            {id ? (
                <EditParty partyId={id} />
            ) : (
                <div className="w-full max-w-4xl mx-auto flex items-center justify-center p-12 bg-white rounded-2xl border border-red-100 shadow-sm">
                    <p className="text-center text-red-600 font-medium">ID da festa inválido ou corrompido.</p>
                </div>
            )}
        </div>
    );
}