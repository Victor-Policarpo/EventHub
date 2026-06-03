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
            <div className="border-t pt-4">
                <FormEmployeeEdit employeeId={id} />
                <div className="mt-8">
                    <Guard role="ADMIN">
                        <Button
                            variant="ghostDanger"
                            onClick={handleDelete}
                            isLoading={isPending}
                            disabled={isPending}
                            className="w-fit px-4 py-3 text-center"
                            >
                                Excluir Funcionário
                        </Button>
                    </Guard>
                    
                </div>
            </div>
        );
}