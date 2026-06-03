import { NotebookText, Shield, UserCog } from "lucide-react";
import { Button, ProfileForm, SecurityModal, Logout, Guard, DeleteAccount } from "../../components";

export function Profile() {
    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 flex justify-center">
            <div className="w-full max-w-3xl flex flex-col gap-8">
                
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                        Configurações da Conta
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Gerencie suas informações pessoais e preferências do sistema.
                    </p>
                </div>

                <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
                    <div className="mb-6 pb-4 border-b border-slate-100 flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <UserCog size={20} />
                        </div>
                        <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
                            Dados do Perfil
                        </h2>
                    </div>
                    
                    <ProfileForm />
                </section>
                <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
                    <div className="mb-6 pb-4 border-b border-slate-100 flex items-center gap-3">
                        <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
                            <Shield size={20} />
                        </div>
                        <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
                            Segurança e Acesso
                        </h2>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <SecurityModal />
                            
                            <Guard role="ADMIN">
                                <Button
                                    to="/users"
                                    variant="ghost"
                                    className="w-full sm:w-auto min-h-11"
                                >
                                    <NotebookText size={18} className="text-slate-500" /> 
                                    Gerenciar Usuários
                                </Button>
                            </Guard>
                        </div>

                        <hr className="border-slate-100 my-2" />
                        <div className="flex flex-col sm:flex-row gap-3">
                            <DeleteAccount />
                            <Logout />
                        </div>
                    </div>
                </section>
                <div className="h-12" />
            </div>
        </div>
    );
}