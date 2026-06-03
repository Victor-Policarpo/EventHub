import { useNavigate, useParams } from "react-router-dom";
import { useDeleteToy } from "../../hooks/toy/useDeleteToy";
import toast from "react-hot-toast";
import { FormToyEdit } from "../Forms";
import { Button } from "../Ui";
import { Guard } from "../Common/Guard";


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
        <div className="border-t pt-4">

            <FormToyEdit />
            
            <div className="mt-8">
                <Guard role="ADMIN">
                    <Button
                        disabled={isPending}
                        isLoading={isPending}
                        variant="ghostDanger"
                        onClick={handleDelete}
                        className="w-fit px-4 py-2"
                    >
                        Excluir Brinquedo
                    </Button>
                </Guard>
            </div>
        </div>
    );
}