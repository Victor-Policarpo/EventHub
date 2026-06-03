import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createEmployeeSchema, type CreateEmployeeData } from "../../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "../../Ui";
import { PatternFormat } from "react-number-format";
import { useCreateEmployee } from "../../../hooks";
import toast from "react-hot-toast";

export function CreateEmployeeForm() {
    const navigate = useNavigate();
    const { mutate, isPending } = useCreateEmployee();
    const { register, handleSubmit, control, formState: { errors } } = useForm<CreateEmployeeData>({
        resolver: zodResolver(createEmployeeSchema),
        mode: "onBlur"
    });

    const onSubmit = (data: CreateEmployeeData) => {
        mutate(data, {
            onSuccess: () => {
                toast.success(`${data.name} criado com sucesso!`);
                navigate("/employees", { replace: true });
            },
            onError: () => {  
                toast.error(`Erro ao criar funcionário`);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
            
            <Input
                label="Nome Completo"
                placeholder="Ex: João da Silva"
                {...register("name")}
                error={errors.name?.message}
            />

            <Controller
                control={control}
                name="telephone"
                render={({ field: { onChange, value, ref } }) => (
                    <PatternFormat
                        customInput={Input} 
                        label="Telefone / WhatsApp"
                        format="(##) #####-####"
                        mask="_"
                        value={value}
                        getInputRef={ref}
                        onValueChange={(vals) => onChange(vals.formattedValue)}
                        error={errors.telephone?.message}
                        placeholder="(00) 00000-0000"
                    />
                )}
            />

            <div className="pt-4 flex justify-end">
                <Button
                    type="submit"
                    isLoading={isPending}
                    disabled={isPending}
                    variant="primary"
                    className="w-full sm:w-auto px-8 min-h-12"
                >
                    Criar Funcionário   
                </Button>
            </div>
            
        </form>
    );
}