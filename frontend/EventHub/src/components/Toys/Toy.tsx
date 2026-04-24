import { useNavigate, useParams } from "react-router-dom";
import { useDeleteToy } from "../../hooks/useDeleteToy";
import FormToyEdit from "../Forms/FormToyEdit";
import toast from "react-hot-toast";

export default function Toy() {
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
                navigate("/feed/toys");
            },
            onError: (error) => {
                toast.error("Erro ao excluir: " + (error.message || "Tente novamente"));
            }
        });
    }

    return (
        <div className="border-t pt-4">
            <FormToyEdit />
            
            <div className="mt-8">
                <button 
                    disabled={isPending}
                    className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white py-2 px-4 rounded-lg font-bold shadow-md active:scale-95 transition-all" 
                    onClick={handleDelete}
                >
                    {isPending ? "Excluindo..." : "Excluir Brinquedo"}
                </button>
            </div>
        </div>
    );
}