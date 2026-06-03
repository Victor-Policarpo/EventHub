import { ShieldCheck } from "lucide-react";
import { UserList } from "../../components";

export function ManageUsers() {
    return (
        <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-8">
                
                <div className="flex flex-col gap-4 border-b border-zinc-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            {/* shrink-0 adicionado para o ícone não amassar no mobile */}
                            <div className="shrink-0 rounded-lg bg-zinc-100 p-2 text-zinc-700">
                                <ShieldCheck size={20} />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                                Gerenciar Usuários
                            </h1>
                        </div>
                        {/* Margem ajustada para alinhar com o texto apenas no desktop */}
                        <p className="mt-3 text-sm text-zinc-500 sm:ml-12 sm:mt-1">
                            Controle o acesso ao sistema, visualize perfis ativos e revogue ou permita permissões da equipe.
                        </p>
                    </div>
                </div>

                <div className="animate-fade-in">
                    <UserList />
                </div>

            </div>
        </div>
    );
}