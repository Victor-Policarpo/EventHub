import Profile from "./Profile";
import logoUrl from "../../assets/Logo/Logo-PlimPlim-teste.svg";
function Header(){
    return (
    <header className="flex items-center justify-between h-20 px-8 bg-white border-b border-slate-100 shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
        <img src={logoUrl} className="h-50 w-auto" alt="Logo" />
        </div>

        <div className="flex items-center gap-4">
        <div className="h-6 w-px bg-slate-200" />
        
        <Profile />
        </div>
    </header>
    );

}

export default Header;