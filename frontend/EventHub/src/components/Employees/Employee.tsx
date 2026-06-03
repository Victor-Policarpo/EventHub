import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { useDeleteEmployee } from "../../hooks";
import { FormEmployeeEdit } from "./forms/FormEmployeeEdit";
import { Button } from "../Ui";
import { Guard } from "../Common";

export function Employee() {
    const { employeeId } = useParams();
    const id = Number(employeeId);
    const { mutate, isPending } = useDeleteEmployee();
    const navigate = useNavigate();

    function handleDelete() {
        if (!confirm("Tem certeza que deseja excluir este funcionário? Essa ação não pode ser desfeita.")) {
            return;
        }
        mutate(id!, {
            onSuccess: () => {
                toast.success("Funcionário excluído com sucesso!");
                navigate("/employees", { replace: true });
            },
            onError: (error) => {
                toast.error("Erro ao excluir: " + (error.message || "Tente novamente"));
            }
        });
    }

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
                <FormEmployeeEdit employeeId={id} />
            </div>
            <Guard role="ADMIN">
                <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                    <div>
                        <h3 className="text-base font-semibold text-slate-900">
                            Excluir Funcionário
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                            Essa ação é irreversível. O funcionário perderá acesso e será removido do sistema.
                        </p>
                    </div>
                    
                    <Button
                        variant="ghostDanger"
                        onClick={handleDelete}
                        isLoading={isPending}
                        disabled={isPending}
                        className="w-full sm:w-auto px-6 py-2.5 shrink-0"
                    >
                        Excluir Funcionário
                    </Button>
                </div>
            </Guard>
            
        </div>
    );
}