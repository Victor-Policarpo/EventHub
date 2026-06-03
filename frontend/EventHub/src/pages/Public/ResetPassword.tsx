import { ResetPasswordForm } from "../../components";

export function ResetPassword() {
    return (
        <main className="min-h-screen w-full flex flex-col md:items-center md:justify-center bg-white md:bg-slate-50">
            
            <div className="w-full flex-1 flex flex-col justify-center px-6 py-8 md:flex-none md:max-w-md md:bg-white md:border md:border-slate-200 md:shadow-sm md:rounded-2xl md:p-10">
                
                <div className="flex flex-col mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Redefinir Senha
                    </h1>
                    <p className="text-base text-slate-500 mt-2 leading-relaxed">
                        Crie uma nova senha segura e confirme-a nos campos abaixo para recuperar seu acesso.
                    </p>
                </div>
                <ResetPasswordForm />
                
            </div>
        </main>
    );
}