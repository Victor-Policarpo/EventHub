import { UserPen } from "lucide-react";
import ErrorState from "./ErrorState";
import Loading from "./Loading";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useNavigate } from "react-router-dom";

function Profile(){
    const {data, isLoading, isError} = useCurrentUser();
    const navigate = useNavigate();
    console.log("CONTEUDO DO DATA:", data);
    if (isLoading) return <Loading />;
    if (isError) return <ErrorState message="Erro ao carregar perfil 😢" />;

    return (
    <button 
        onClick={() => navigate("/profile")}
        className="group flex items-center gap-3 p-2 transition-all duration-200 rounded-xl hover:bg-slate-100 active:scale-95"
    >
        {/* Container do Ícone */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
        <UserPen size={20} />
        </div>

        {/* Textos: Username e Role */}
        <div className="flex flex-col items-start leading-tight">
        <h1 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
            {data?.username}
        </h1>
        <p className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${
            data?.roles?.[0] === "ADMIN" ? "text-indigo-600" : "text-slate-500"
        }`}>
            {!data ? "..." : (data?.roles?.[0] === "ADMIN" ? "Administrador" : "Usuário Básico")}
        </p>
        </div>
    </button>
    );
}

export default Profile;