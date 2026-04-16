import { useParams } from "react-router-dom";
import { useGetParty } from "../../hooks/useGetParty";
import Loading from "../Ui/Loading";
import ErrorState from "../Ui/ErrorState";
import { Controller, useForm } from "react-hook-form";
import { formatToDateTimeLocal } from "../../utils/formatDateHours";
import { updatePartySchema, type UpdatePartyForm } from "../../schemas/updatePartySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateParty } from "../../hooks/useUpdateParty";
import toast from "react-hot-toast";
import { PatternFormat } from "react-number-format";

function FormPartyEdit(){
    const { partyId } = useParams();
    const id = Number(partyId);
    const { data, isLoading, isError } = useGetParty(id);
    const { mutate, isPending } = useUpdateParty();
    const { register, handleSubmit, control, formState: {errors} } = useForm<UpdatePartyForm>({
        values: {
            name: data?.name || "",
            address: data?.address || "",
            telephone: data?.telephone || "",
            value: data?.value ? String(data.value) : "",
            startDateHours: data?.startDateHours ? formatToDateTimeLocal(data.startDateHours) : "",
            endDateHours: data?.endDateHours ? formatToDateTimeLocal(data.endDateHours) : ""
        },
        resolver: zodResolver(updatePartySchema),
        mode: "onBlur"
    });

    if (isLoading) return <Loading />;
    if (isError) return <ErrorState message="Erro ao carregar dados do perfil 😢" />;


    function onSubmit(values: UpdatePartyForm) {
        const payload = {
            name: values.name,
            address: values.address,
            telephone: values.telephone.replace(/\D/g, ""),
            value: Number(values.value),
            startDateHours: values.startDateHours, 
            endDateHours: values.endDateHours
        };

        console.log("Payload: ", payload);
        if (!id || isNaN(id)) {
            toast.error("ID da festa inválido!");
            return;
        }

        mutate({ 
            id: id,
            data: payload 
        }, {
            onSuccess: () => toast.success("Festa atualizada com sucesso!"),
            onError: (err) => toast.error("Erro: " + err.message)
        });
    }

    return (
        <div>
           <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 w-125">

                <div>
                    <label htmlFor="name" className="font-bold text-sm text-gray-600">Nome da Festa</label>
                    <input type="text" id="name" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                     {...register("name")} />
                </div>

                <div>
                    <label htmlFor="address" className="font-bold text-sm text-gray-600">Endereço</label>
                    <input type="text" id="address" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                     {...register("address")} />
                </div>
                <div>
                <label htmlFor="telephone" className="font-bold text-sm text-gray-600">Telefone</label>
                <Controller
                control={control}
                name="telephone"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <PatternFormat
                    format="(##) #####-####"
                    mask="_"
                    getInputRef={ref}
                    value={value}
                    onValueChange={(vals) => onChange(vals.formattedValue)}
                    onBlur={onBlur}
                    className={`w-full p-3 border rounded-xl ${errors.telephone ? 'border-red-500' : 'border-gray-200'}`}
                    />
            )}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="value" className="font-bold text-sm text-gray-600">Valor da Festa</label>
                    <div className="relative flex items-center">
                        <span className="absolute left-3 text-gray-400">R$</span>
                        <input 
                            type="number" 
                            step="0.01" 
                            id="value" 
                            {...register("value")}
                            className="w-full pl-10 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="startDateHours" className="font-bold text-sm text-gray-600">Início</label>
                        <input 
                            type="datetime-local" 
                            id="startDateHours" 
                            {...register("startDateHours")} 
                            className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="endDateHours" className="font-bold text-sm text-gray-600">Fim</label>
                        <input 
                            type="datetime-local" 
                            id="endDateHours" 
                            {...register("endDateHours")} 
                            className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                </div>

                <button 
                      type="submit" 
                      disabled={isPending}
                      className="w-full text-white bg-indigo-600 hover:bg-indigo-700 font-bold rounded-xl text-sm px-5 py-3 transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-indigo-100"
                    >
                      {isPending ? "Processando..." : "Confirmar Alteração"}
                    </button>
            </form>
        </div>
    );
}
export default FormPartyEdit;