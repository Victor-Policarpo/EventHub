import { Link } from "react-router-dom";
import { ForgotPasswordForm } from "../../components";

export function ForgotPassword() {
    return (
        <main className="min-h-screen w-full flex flex-col md:items-center md:justify-center bg-white md:bg-slate-50">
            
            <div className="w-full flex-1 flex flex-col justify-center px-6 py-8 md:flex-none md:max-w-md md:bg-white md:border md:border-slate-200 md:shadow-sm md:rounded-2xl md:p-10">
                
                <div className="flex flex-col mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Esqueceu a senha?</h1>
                    <p className="text-base text-slate-500 mt-2 leading-relaxed">
                        Digite o e-mail cadastrado na sua conta. Nós enviaremos um link de recuperação para você redefinir sua senha.
                    </p>
                </div>
                
                <ForgotPasswordForm />
                
                <div className="mt-8 flex flex-col items-center gap-4 text-base text-slate-600 md:text-sm">
                    <p>
                        Lembrou da senha?{" "}
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors focus-visible:outline-blue-600">
                            Faça login
                        </Link>
                    </p>
                </div>

            </div>
        </main>
    );
}