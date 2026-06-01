import { ArrowLeft, NotebookText } from "lucide-react";
import { Button, ProfileForm, SecurityModal, Logout, Guard, DeleteAccount } from "../../components";

export function Profile() {
    return (
        <div className="max-w-4xl px-8 py-12 flex flex-col gap-10">
            <Button 
                to={"/feed"}
                variant="ghost"
                className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
            >
                <ArrowLeft size={18} />
            </Button>

            <section>
                <h2 className="text-xl font-bold text-slate-800 mb-6">Meu Perfil</h2>
                <ProfileForm />
            </section>

            <hr className="border-slate-100 w-full max-w-md" />

            <section className="flex flex-col gap-6">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                    Configurações de Conta
                </h3>
                
                <div className="flex flex-col items-start gap-4">
                    <SecurityModal />
                    <Guard role="ADMIN">
                        <Button
                        to={"/manage-users"}
                        variant="ghost"
                        className="w-fit px-4 py-3 text-center"
                    >
                        <NotebookText size={18}/> Gerenciar Usuários
                    </Button>
                    </Guard>
                    <Logout />
                    <DeleteAccount />
                </div>
            </section>

            <div className="h-20" />
        </div>
    );
}