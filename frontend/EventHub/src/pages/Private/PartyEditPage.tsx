import { useParams } from 'react-router-dom';
import { EditParty } from "../../components";

export function PartyEditPage() {
    const { partyId } = useParams<{ partyId: string }>();
    const id = Number(partyId);

    return (
        <div className="p-4">
            {id ? (
                <EditParty partyId={id} />
            ) : (
                <p className="text-center text-gray-500 mt-8">ID da festa inválido.</p>
            )}
        </div>
    );
}1