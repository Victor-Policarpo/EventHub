import { ShieldCheck, ArrowLeft } from "lucide-react";
import { UserList } from "../../components";
import { Button } from "../../components";

export function ManageUsers() {
    return (
        <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-8">
                
                <div className="flex flex-col gap-4 border-b border-zinc-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <Button
                                to="/feed" 
                                variant="ghost" 
                                className="w-8 h-8 rounded-full p-0 flex items-center justify-center hover:bg-zinc-100 text-zinc-500 hover:text-zinc-700 transition-colors"
                            >
                                <ArrowLeft size={18} />
                            </Button>

                            <div className="rounded-lg bg-zinc-100 p-1.5 text-zinc-700">
                                <ShieldCheck size={20} />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                                Gerenciar Usuários
                            </h1>
                        </div>
                        <p className="mt-2 text-sm text-zinc-500 ml-11">
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