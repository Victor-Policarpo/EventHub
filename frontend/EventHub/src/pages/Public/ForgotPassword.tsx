import { ForgotPasswordForm } from "../../components";

export function ForgotPassword() {
    return (
        <div className="h-full flex flex-col justify-center items-center">
            <div className="space-y-2 text-center max-w-md mx-auto mb-6">
                <h1 className="text-2xl font-bold text-gray-950">
                    Esqueceu a senha?
                </h1>
                <p className="text-sm text-gray-500 leading-relaxed">
                    Digite o e-mail cadastrado na sua conta. Nós enviaremos um link de recuperação para você redefinir sua senha.
                </p>
            </div>
            
            <ForgotPasswordForm />
        </div>
    );
}