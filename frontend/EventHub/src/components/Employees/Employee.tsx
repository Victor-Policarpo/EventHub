import { useNavigate, useParams } from "react-router-dom";
import FormEmployeeEdit from "../Forms/FormEmployeeEdit";
import toast from "react-hot-toast";
import { useDeleteEmployee } from "../../hooks/useDeleteEmployee";

export default function Employee() {
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
                navigate("/feed/employees");
            },
            onError: (error) => {
                toast.error("Erro ao excluir: " + (error.message || "Tente novamente"));
            }
        });
    }

    return (
            <div className="border-t pt-4">
                <FormEmployeeEdit />
                
                <div className="mt-8">
                    <button 
                        disabled={isPending}
                        className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white py-2 px-4 rounded-lg font-bold shadow-md active:scale-95 transition-all" 
                        onClick={handleDelete}
                    >
                        {isPending ? "Excluindo..." : "Excluir Funcionário"}
                    </button>
                </div>
            </div>
        );
}