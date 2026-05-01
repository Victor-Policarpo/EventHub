import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, X } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { useNewPassword } from "../../hooks/auth/useNewPassword";
import { usePasswordValidation } from "../../hooks/auth/usePasswordValidation";
import { type NewPasswordFormData, newPasswordSchema } from "../../schemas/auth/newPasswordSchema";
import type { PasswordUpdateData, SpringError } from "../../types";
import { Button, Input } from "../Ui";

export function SecurityModal() {
  const [isOpen, setIsOpen] = useState(false);


  const { 
    register, 
    handleSubmit: hookHandleSubmit,
    formState: { errors },
    reset,
    setError,
    control
  } = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
    mode: "onBlur"
  });

  const passwordValue = useWatch({
    control,
    name: "newPassword", 
    defaultValue: ""
  });

  const { hasMinMax, hasLetter, hasNumber, hasSpecial } = usePasswordValidation(passwordValue);
  const handleClose = () => {
    setIsOpen(false);
    reset();
  };
  const { mutate, isPending } = useNewPassword();

  const onSubmit = (data: PasswordUpdateData) => {
    mutate(data, {
      onSuccess: () => {
          setIsOpen(false);
          reset();
          toast.success('Senha alterada com sucesso!');
      },
      onError: (error: unknown) => {
        const springError = error as SpringError;
          if (springError.status === 400 || springError.message.includes("The password is incorrect")) {
              setError("oldPassword", { type: "manual", message: "Senha atual incorreta" });
        }
        toast.error('Erro ao alterar senha!');
      }
    });
  };

  return (
    <div>
        <Button onClick={() => setIsOpen(true)} variant="ghost">
          <Lock size={14} />
          Alterar Senha
        </Button>

      {isOpen && (
        <div className="fixed inset-0 z-100 overflow-y-auto overflow-x-hidden flex items-center justify-center w-full h-full">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
            onClick={handleClose}
          />

          <div className="relative p-4 w-full max-w-md max-h-full animate-in fade-in zoom-in duration-200">
            <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
              
              <div className="flex items-center justify-between p-4 md:p-5 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Segurança da Conta</h3>

                <Button 
                  onClick={handleClose} 
                  variant="ghost" 
                  className="w-8 h-8 rounded-full p-0"
                >
                  <X size={16} />
                </Button>

              </div>

              <div className="p-4 md:p-6">
                <form className="space-y-4" onSubmit={hookHandleSubmit(onSubmit)}>
                    <div>
                        <Input
                          label="Senha Atual"
                          type="password"
                          placeholder="Insira sua senha atual"
                          error={errors.oldPassword?.message}
                          {...register("oldPassword")}
                        />
                    </div>

                  <div>
                    <div>
                        <Input
                          label="Nova Senha"
                          type="password"
                          placeholder="Insira sua nova senha"
                          error={errors.newPassword?.message}
                          {...register("newPassword")}
                        />
                    </div>

                    <div className="mt-3 space-y-1 text-[11px] font-medium">
                      <p className={hasMinMax ? "text-emerald-500" : "text-slate-400"}>
                        {hasMinMax ? "✓" : "○"} Entre 6 e 16 caracteres
                      </p>
                      <p className={hasLetter ? "text-emerald-500" : "text-slate-400"}>
                        {hasLetter ? "✓" : "○"} Pelo menos uma letra
                      </p>
                      <p className={hasNumber ? "text-emerald-500" : "text-slate-400"}>
                        {hasNumber ? "✓" : "○"} Pelo menos um número
                      </p>
                      <p className={hasSpecial ? "text-emerald-500" : "text-slate-400"}>
                        {hasSpecial ? "✓" : "○"} Um caractere especial (!@#$)
                      </p>
                    </div>

                  </div>

                  <div className="pt-4 flex flex-col gap-3">
                      <Button
                      type="submit"
                      isLoading={isPending}
                      disabled={isPending}
                      variant="primary"
                      >
                        Confirmar Alteração
                      </Button>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}