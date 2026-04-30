import { ArrowLeft } from "lucide-react";
import { Button, Party } from "../../components";

export function PartyDetails(){
    return (
        <div>
           <Button 
                to={"/feed"}
                variant="ghost" 
                className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
            >
                <ArrowLeft size={18} />
            </Button>

            <Party/>
        </div>
    );
}