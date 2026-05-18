import { ResetPasswordForm } from "../../components";

export function ResetPassword(){
    return (
        <div className="h-full flex flex-col justify-center items-center">
            <div className="space-y-2 text-center max-w-md mx-auto mb-6">
                <h1 className="text-2xl font-bold text-gray-950">
                    Resetar sua Senha
                </h1>
                <p className="text-sm text-gray-500 leading-relaxed">
                    Insira sua nova senha e confirme-a nos campos abaixo.
                </p>
            </div>
            <ResetPasswordForm/>
        </div>
    );
}