import { LogOut } from "lucide-react";
import { useAuth } from "../../hooks";
import { Button } from "../Ui";

export function Logout() {
    const { logout } = useAuth();
    
    const handleLogout = async () => {
        logout();
    };
    
    return (
        <Button
            onClick={handleLogout} 
            variant="ghostDanger"
            className="w-full sm:w-auto min-h-11"
        >
            <LogOut size={18} />
            Sair da Conta
        </Button>
    );
}