import toast from "react-hot-toast";
import { useAuth, useDeleteCurrentUser } from "../../hooks";
import { Button } from "../Ui";

export function DeleteAccount() {
    const { mutate, isPending } = useDeleteCurrentUser();
    const { logout } = useAuth();

    const handleDelete = () => {
        const confirm = window.confirm("Tem certeza que deseja Desativar sua conta?");
        if (!confirm) return;

        mutate(undefined, {
            onSuccess: () => {
                logout();
            },
            onError: () => {
                toast.error("Erro ao apagar conta");
            }
        });
    };

    return (
        <Button
            variant="ghostDanger"
            onClick={handleDelete}
            disabled={isPending}
            className="w-fit px-4 py-3 text-center"
        >
            Apagar Conta
        </Button>
    );
}