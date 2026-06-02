import { useParams } from 'react-router-dom';
import { EditParty } from "../../components";

export function PartyEditPage() {
    const { id } = useParams<{ id: string }>();
    const partyId = Number(id);

    return (
        <div className="p-4">
            {partyId ? (
                <EditParty partyId={partyId} />
            ) : (
                <p className="text-center text-gray-500 mt-8">ID da festa inválido.</p>
            )}
        </div>
    );
}