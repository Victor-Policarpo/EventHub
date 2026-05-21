import { useParams } from 'react-router-dom';
import { Button } from "../../components"; 
import { EditParty } from "../../components";
import { ArrowLeft } from 'lucide-react';

export function PartyEditPage() {
    const { id } = useParams<{ id: string }>();
    const partyId = Number(id);

    return (
        <div className="p-4">
            <Button
                to={"/parties/" + partyId} 
                variant="ghost" 
                className="w-8 h-8 rounded-full p-0 flex items-center justify-center mb-4"
            >
                <ArrowLeft size={18} />
            </Button>
            
            {partyId ? (
                <EditParty partyId={partyId} />
            ) : (
                <p className="text-center text-gray-500 mt-8">ID da festa inválido.</p>
            )}
        </div>
    );
}