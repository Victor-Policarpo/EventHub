import { ArrowLeft } from "lucide-react";
import { Button, Employee } from "../../components";

export function EmployeeEdit() {
    return (
        <div>
            <Button 
                to={"/feed/toys"} 
                variant="ghost" 
                className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
            >
                <ArrowLeft size={18} />
            </Button>
            <Employee />
        </div>
    );
}