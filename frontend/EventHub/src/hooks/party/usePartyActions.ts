import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { startPartyRequest, endPartyRequest, collectPartyRequest, cancelPartyRequest } from '../../services';
import type { PartyActionType } from '../../utils/partyActionsConfig';

export function usePartyActions(partyId: string | number) {
  const queryClient = useQueryClient();

  const handleSuccess = (message: string) => {
    toast.success(message);
    queryClient.invalidateQueries({ queryKey: ['party', Number(partyId)] });
  };

  const startMutation = useMutation({
    mutationFn: () => startPartyRequest(partyId),
    onSuccess: () => handleSuccess('Festa iniciada com sucesso!'),
    onError: () => toast.error('Erro ao iniciar a festa.'),
  });

  const endMutation = useMutation({
    mutationFn: () => endPartyRequest(partyId),
    onSuccess: () => handleSuccess('Festa finalizada com sucesso!'),
    onError: () => toast.error('Erro ao finalizar a festa.'),
  });

  const collectMutation = useMutation({
    mutationFn: () => collectPartyRequest(partyId),
    onSuccess: () => handleSuccess('Brinquedos coletados com sucesso!'),
    onError: () => toast.error('Erro ao coletar brinquedos.'),
  });

  const cancelMutation = useMutation({
    mutationFn: () => cancelPartyRequest(partyId),
    onSuccess: () => handleSuccess('Festa cancelada com sucesso!'),
    onError: () => toast.error('Erro ao cancelar a festa.'),
  });

  const executeAction = (actionType: PartyActionType) => {
    const actionsMap: Record<PartyActionType, () => void> = {
      START: () => startMutation.mutate(),
      END: () => endMutation.mutate(),
      COLLECT: () => collectMutation.mutate(),
      CANCEL: () => cancelMutation.mutate(),
    };

    actionsMap[actionType]();
  };

  return {
    executeAction,
    isPending:
      startMutation.isPending ||
      endMutation.isPending ||
      collectMutation.isPending ||
      cancelMutation.isPending,
  };
}