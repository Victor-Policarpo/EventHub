import { Button } from "../../components";
import { CreateParty } from "../../components";
import { ArrowLeft } from 'lucide-react';

export function CreatePartyPage() {
    return (
        <div className="p-4">
            <Button
                to={"/feed"} 
                variant="ghost" 
                className="w-8 h-8 rounded-full p-0 flex items-center justify-center mb-4"
            >
                <ArrowLeft size={18} />
            </Button>
            <CreateParty />
        </div>
    );
}