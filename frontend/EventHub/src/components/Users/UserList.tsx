import { ShieldAlert, ShieldCheck, UserCheck, UserX } from "lucide-react";
import { useGetUsersData, useToggleUserActive, useToggleUserDelete, useCurrentUser } from "../../hooks";
import { Button, ErrorState, Loading } from "../Ui";
import toast from "react-hot-toast";
import type { UserDataResponse } from "../../types";

export function UserList() {
    const { data, isLoading, isError, refetch } = useGetUsersData();
    const { mutate: toggleActive, isPending: isStatusPending } = useToggleUserActive();
    const { mutate: deleteUser, isPending: isDeletePending } = useToggleUserDelete();
    const { data: currentUser } = useCurrentUser();
    
    const usersWithoutMe = data 
        ? data.filter(user => user.userId !== currentUser?.userId) : [];
    const sortedUsers = [...usersWithoutMe].sort((a, b) => Number(b.active) - Number(a.active));

    if (isLoading) return <Loading />;
    if (isError) return <ErrorState message="Falha ao carregar dados dos usuários" onRetry={refetch} />;

    const handleToggleStatus = (userId: string, user: UserDataResponse) => {
        const confirm = window.confirm(`Tem certeza que deseja Ativar o acesso do usuario @${user.username}? `);
        if (!confirm) return;
        toggleActive(userId, {
            onSuccess: () => {
                toast.success(`Usuario @${user.username} ativo.`);
            },
            onError: () => {
                toast.error(`Falha ao atualizar status do usuário @${user.username}.`);
            }
        });
    };
    
    const handleDeleteUser = (userId: string, user: UserDataResponse) => {
        const confirm = window.confirm(`Tem certeza que deseja Remover o acesso do usuário @${user.username}? `);
        if (!confirm) return;
        deleteUser(userId, {
            onSuccess: () => {
                toast.success(`Usuario @${user.username} deletado.`);
            },
            onError: () => {
                toast.error(`Falha ao deletar usuário @${user.username}.`);
            }
        });
    }

    return (
        <div className="w-full rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
            
            <div className="lg:hidden flex flex-col divide-y divide-zinc-200">
                {sortedUsers.map((user) => (
                    <div key={user.userId} className="p-4 flex flex-col gap-4 bg-white transition-colors hover:bg-zinc-50/50">
                        
                        <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-zinc-900 text-base">
                                @{user.username}
                            </span>
                            <span className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium border ${
                                user.active 
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                                    : "bg-red-50 text-red-700 border-red-200"
                            }`}>
                                {user.active ? (
                                    <><UserCheck size={12} /> Ativo</>
                                ) : (
                                    <><UserX size={12} /> Inativo</>
                                )}
                            </span>
                        </div>

                        <div className="flex flex-col gap-1 text-sm">
                            <span className="font-medium text-zinc-700">{user.fullName}</span>
                            <span className="text-zinc-500">{user.email}</span>
                        </div>

                        <div className="pt-2">
                            <Button
                                variant="ghostDanger"
                                className="w-full min-h-11"
                                disabled={isStatusPending || isDeletePending} 
                                onClick={() => {
                                    if (user.active) {
                                        handleDeleteUser(user.userId, user);
                                    } else {
                                        handleToggleStatus(user.userId, user);
                                    }
                                }}
                            >
                                {user.active ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <ShieldAlert size={18} />
                                        <span>Revogar Acesso</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <ShieldCheck size={18} />
                                        <span>Permitir Acesso</span>
                                    </div>
                                )}
                            </Button>
                        </div>
                        
                    </div>
                ))}
            </div>

            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full border-collapse text-left align-middle text-sm">
                    <thead>
                        <tr className="border-b border-zinc-200 bg-zinc-50 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                            <th className="px-6 py-4">Nome de usuário</th>
                            <th className="px-6 py-4">Nome completo</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 bg-white">
                        {sortedUsers.map((user) => (
                            <tr 
                                key={user.userId} 
                                className="transition-colors hover:bg-zinc-50/50"
                            >
                                <td className="whitespace-nowrap px-6 py-4 font-medium text-zinc-900">
                                    @{user.username}
                                </td>
                                
                                <td className="whitespace-nowrap px-6 py-4 text-zinc-600">
                                    {user.fullName}
                                </td>
                                
                                <td className="whitespace-nowrap px-6 py-4 text-zinc-500">
                                    {user.email}
                                </td>
                                
                                <td className="whitespace-nowrap px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium border ${
                                        user.active 
                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                                            : "bg-red-50 text-red-700 border-red-200"
                                    }`}>
                                        {user.active ? (
                                            <>
                                                <UserCheck size={14} />
                                                Ativo
                                            </>
                                        ) : (
                                            <>
                                                <UserX size={14} />
                                                Inativo
                                            </>
                                        )}
                                    </span>
                                </td>
                                
                                <td className="whitespace-nowrap px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <Button
                                            variant="ghostDanger"
                                            disabled={isStatusPending || isDeletePending} 
                                            onClick={() => {
                                                if (user.active) {
                                                    handleDeleteUser(user.userId, user);
                                                } else {
                                                    handleToggleStatus(user.userId, user);
                                                }
                                            }}
                                            title={user.active ? "Desativar Acesso" : "Ativar Acesso"}
                                        >
                                            {user.active ? (
                                                <div className="flex items-center gap-1">
                                                    <ShieldAlert size={16} />
                                                    <span className="text-xs">Revogar</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1">
                                                    <ShieldCheck size={16} />
                                                    <span className="text-xs">Permitir</span>
                                                </div>
                                            )}
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}