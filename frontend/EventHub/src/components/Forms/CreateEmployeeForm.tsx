import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createEmployeeSchema, type CreateEmployeeData } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "../Ui";
import { PatternFormat } from "react-number-format";
import { useCreateEmployee } from "../../hooks";
import toast from "react-hot-toast";

export function CreateEmployeeForm() {
    const navigate = useNavigate();
    const { mutate, isPending } = useCreateEmployee();
    const {register, handleSubmit, control, formState: { errors }} = useForm<CreateEmployeeData>({
        resolver: zodResolver(createEmployeeSchema),
        mode: "onBlur"
    });

    const onSubmit = (data: CreateEmployeeData) => {
        mutate(data, {
            onSuccess: () => {
                toast.success(`${data.name} criado com sucesso!`);
                navigate("employees/new", { replace: true });
            },
            onError: (error) => {  
                toast.error(`Erro ao criar funcionário: ${error.message}`);
            }
        });
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 w-125">
                <div>
                    <Input
                        label="Nome"
                        placeholder="Digite o nome do funcionário"
                        {...register("name")}
                        error={errors.name?.message}
                    />
                </div>

                <div>
                    <Controller
                        control={control}
                        name="telephone"
                        render={({ field: { onChange, value, ref } }) => (
                        <PatternFormat
                            customInput={Input} 
                            label="Telefone"
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
                </div>
                    <Button
                        type="submit"
                        isLoading={isPending}
                        disabled={isPending}
                        variant="primary"
                    >
                        Criar Funcionário   
                    </Button>
            </form>
        </div>
    );
}