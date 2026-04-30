import { ArrowLeft } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button, FormPartyEdit } from "../../components";

export function PartyEdit() {
    const { partyId } = useParams();
    const id = Number(partyId);
    return (
        <div>
            <Button 
                to={`/parties/${id}`}
                variant="ghost" 
                className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
            >
                <ArrowLeft size={18} />
            </Button>
            <FormPartyEdit />
        </div>
    );
}