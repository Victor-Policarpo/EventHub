import { useNavigate, useParams } from "react-router-dom";
import { useDeleteToy } from "../../hooks";
import toast from "react-hot-toast";
import { FormToyEdit } from "./form";
import { Button } from "../Ui";
import { Guard } from "../Common";

export function Toy() {
    const { toyId } = useParams();
    const id = Number(toyId);
    const { mutate, isPending } = useDeleteToy();
    const navigate = useNavigate();

    function handleDelete() {
        if (!confirm("Tem certeza que deseja excluir este brinquedo? Essa ação não pode ser desfeita.")) {
            return;
        }
        mutate(id!, {
            onSuccess: () => {
                toast.success("Brinquedo excluído com sucesso!");
                navigate("/toys", { replace: true });
            },
            onError: (error) => {
                toast.error("Erro ao excluir: " + (error.message || "Tente novamente"));
            }
        });
    }

    return (
        <div className="w-full flex flex-col gap-6">
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
                <FormToyEdit />
            </div>
            
            <Guard role="ADMIN">
                <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                    <div>
                        <h3 className="text-base font-semibold text-slate-900">
                            Excluir Brinquedo
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                            Essa ação é irreversível. O brinquedo será removido permanentemente do acervo.
                        </p>
                    </div>
                    
                    <Button
                        disabled={isPending}
                        isLoading={isPending}
                        variant="ghostDanger"
                        onClick={handleDelete}
                        className="w-full sm:w-auto px-6 py-2.5 shrink-0"
                    >
                        Excluir Brinquedo
                    </Button>
                </div>
            </Guard>

        </div>
    );
}