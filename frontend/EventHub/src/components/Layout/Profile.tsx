import { UserPen } from "lucide-react";
import { useCurrentUser } from "../../hooks";
import { Loading, ErrorState, Button } from "../Ui";

export function Profile() {
    const { data, isLoading, isError } = useCurrentUser();

    if (isLoading) return <Loading />;
    if (isError) return <ErrorState message="Erro ao carregar perfil 😢" />;

    return (
        <Button
            to="/profile" 
            variant="ghost" 
            className="w-fit h-auto p-2 justify-start items-center"
        >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <UserPen size={20} />
            </div>
            <div className="flex flex-col items-start leading-tight">
                <h1 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                    {data?.username}
                </h1>
                <p className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${
                    data?.roles?.[0] === "ADMIN" ? "text-indigo-600" : "text-slate-500"
                }`}>
                    {data?.roles?.[0] === "ADMIN" ? "Administrador" : "Funcionário"}
                </p>
            </div>
        </Button>
    );
}