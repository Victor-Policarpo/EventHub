import { useForm } from "react-hook-form";
import useCurrentUser from "../../hooks/useCurrentUser";
import type { UserUpdateData } from "../../types/types";
import ErrorState from "../Ui/ErrorState";
import Loading from "../Ui/Loading";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { profileSchema, type ProfileFormData } from "../../schemas/profileSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

function ProfileForm() {
    const { data, isLoading, isError } = useCurrentUser();
    const {register, handleSubmit , formState: { errors }} = useForm<ProfileFormData>({
        values: {
            fullName: data?.fullName || "",
            username: data?.username || "",
            email: data?.email || ""
        },
        resolver: zodResolver(profileSchema),
        mode: "onBlur"
    });
    const { mutate, isPending } = useUpdateUser();
    const onSubmit = (formData: UserUpdateData) => {
        mutate(formData, {
        onSuccess: () => {
            toast.success("Perfil atualizado com sucesso!");
        },
        onError: (error) => {
            toast.error("Erro ao atualizar: " + error.message);
        }
        });
    };
    if (isLoading) return <Loading />;
    if (isError) return <ErrorState message="Erro ao carregar dados do perfil 😢" />;

    return (
  <div className="w-full flex justify-start px-8 mt-12">
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
      
      <div className="relative z-0 w-full mb-6 group">
        <input 
          type="text" 
          id="fullName" 
          {...register("fullName")}
          className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer" 
          placeholder=" " 
        />
        <label 
          htmlFor="fullName" 
          className="peer-focus:font-medium absolute text-sm text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:inset-s-0 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Nome Completo
        </label>
        {errors.fullName && <span className="text-[11px] text-red-500 mt-1 block">{errors.fullName.message}</span>}
      </div>

      <div className="relative z-0 w-full mb-6 group">
        <input 
          type="text" 
          id="username" 
          {...register("username")}
          className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer" 
          placeholder=" " 
        />
        <label 
          htmlFor="username" 
          className="peer-focus:font-medium absolute text-sm text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:inset-s-0 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Username
        </label>
        {errors.username && <span className="text-[11px] text-red-500 mt-1 block">{errors.username.message}</span>}
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input 
          type="email" 
          id="email" 
          {...register("email")}
          className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer" 
          placeholder=" " 
        />
        <label 
          htmlFor="email" 
          className="peer-focus:font-medium absolute text-sm text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:inset-s-0 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email
        </label>
        {errors.email && <span className="text-[11px] text-red-500 mt-1 block">{errors.email.message}</span>}
      </div>

      <button 
        type="submit" 
        disabled={isPending} 
        className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-bold rounded-xl text-sm w-full sm:w-auto px-8 py-2.5 text-center transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-indigo-100"
      >
        {isPending ? "Salvando..." : "Salvar Alterações"}
      </button>
    </form>
  </div>
);
}
export default ProfileForm;