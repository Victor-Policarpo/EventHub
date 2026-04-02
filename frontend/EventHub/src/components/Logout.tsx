import { LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export function Logout() {

    const {logout}  = useAuth();
    const handleLogout = async () => {
        logout();
    };
    return (
    <button 
      onClick={handleLogout}
      className="flex items-center gap-2 px-3 py-1.5 text-slate-500 hover:text-red-600 font-medium text-xs transition-all rounded-md hover:bg-red-50 group"
    >
      <LogOut size={14} className="text-slate-400 group-hover:text-red-600 transition-colors" />
      Sair da Conta
    </button>
  );
}
export default Logout;