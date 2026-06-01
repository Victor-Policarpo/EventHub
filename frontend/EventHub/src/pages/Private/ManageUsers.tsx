import { ShieldCheck } from "lucide-react";
import { UserList } from "../../components";

export function ManageUsers() {
    return (
        <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-8">
                
                <div className="flex flex-col gap-2 border-b border-zinc-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="rounded-lg bg-zinc-100 p-1.5 text-zinc-700">
                                <ShieldCheck size={20} />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                                Gerenciar Usuários
                            </h1>
                        </div>
                        <p className="mt-2 text-sm text-zinc-500">
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