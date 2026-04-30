import { LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../Ui";


export function Logout() {

    const {logout}  = useAuth();
    const handleLogout = async () => {
        logout();
    };
    return (
<Button
  onClick={handleLogout} 
  variant="ghostDanger"
  className="w-fit px-4 py-3 text-center"
>
  <LogOut size={14} />
  Sair da Conta
</Button>
    );
};