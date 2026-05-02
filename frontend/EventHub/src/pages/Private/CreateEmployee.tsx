import { ArrowLeft } from "lucide-react";
import { Button, CreateEmployeeForm } from "../../components";

export function CreateEmployee(){

    return (
        <div>
            <Button
                to={"/feed/employees"} 
                variant="ghost" 
                className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
            >
                <ArrowLeft size={18} />
            </Button>
            <CreateEmployeeForm />
        </div>

    );

}