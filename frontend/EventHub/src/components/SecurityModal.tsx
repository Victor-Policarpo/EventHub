import { Lock, X } from "lucide-react";
import { useState } from "react";
import { newPasswordSchema, type NewPasswordFormData } from "../schemas/newPasswordSchema";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { PasswordUpdateData, SpringError } from "../types/types";
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { useNewPassword } from "../hooks/useNewPassword";
import { toast } from "react-hot-toast";

function SecurityModal() {
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
      <button 
  onClick={() => setIsOpen(true)}
  className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 rounded-md text-xs font-medium hover:bg-slate-50 hover:text-indigo-600 transition-all active:scale-95 shadow-sm"
>
  <Lock size={14} />
  Alterar Senha
</button>

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
                <button type="button" onClick={handleClose} className="text-slate-400 hover:bg-slate-100 rounded-lg w-8 h-8 flex justify-center items-center">
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 md:p-6">
                <form className="space-y-4" onSubmit={hookHandleSubmit(onSubmit)}>
                  
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-slate-700">Senha Atual</label>
                    <input 
                      type="password" 
                      {...register("oldPassword")}
                      className={`w-full p-2.5 bg-slate-50 border rounded-xl outline-none transition-all ${errors.oldPassword ? 'border-red-500' : 'border-slate-200 focus:ring-indigo-500'}`} 
                      placeholder="••••••••" 
                    />
                    {errors.oldPassword && <span className="text-[11px] text-red-500 mt-1">{errors.oldPassword.message}</span>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-slate-700">Nova Senha</label>
                    <input 
                      type="password" 
                      {...register("newPassword")}
                      className={`w-full p-2.5 bg-slate-50 border rounded-xl outline-none transition-all ${errors.newPassword ? 'border-red-500' : 'border-slate-200 focus:ring-indigo-500'}`} 
                      placeholder="••••••••" 
                    />

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

                    {errors.newPassword && <span className="text-[11px] text-red-500 mt-2 block">{errors.newPassword.message}</span>}
                  </div>

                  <div className="pt-4 flex flex-col gap-3">
                    <button 
                      type="submit" 
                      disabled={isPending}
                      className="w-full text-white bg-indigo-600 hover:bg-indigo-700 font-bold rounded-xl text-sm px-5 py-3 transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-indigo-100"
                    >
                      {isPending ? "Processando..." : "Confirmar Alteração"}
                    </button>
                    <button type="button" onClick={handleClose} className="w-full text-slate-500 font-semibold text-sm px-5 py-2.5 hover:bg-slate-50 rounded-xl">
                      Cancelar
                    </button>
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
export default SecurityModal;