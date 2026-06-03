import { UserPen } from "lucide-react";
import { useCurrentUser } from "../../hooks";
import { Button, Loading, ErrorState } from "../Ui";

export function ProfileCard() {
  const { data, isLoading, isError } = useCurrentUser();

  if (isLoading) return <Loading />;
  if (isError) return <ErrorState message="Erro ao carregar perfil" />;

  return (
    <Button
      to="/profile"
      variant="ghost"
      className="w-full h-auto p-3 justify-start"
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600">
          <UserPen size={20} />
        </div>

        <div className="flex flex-col items-start min-w-0">
          <span className="font-medium text-sm text-slate-800 truncate">
            {data?.username}
          </span>

          <span
            className={`text-xs ${
              data?.roles?.[0] === "ADMIN"
                ? "text-blue-600"
                : "text-slate-500"
            }`}
          >
            {data?.roles?.[0] === "ADMIN"
              ? "Administrador"
              : "Funcionário"}
          </span>
        </div>
      </div>
    </Button>
  );
}