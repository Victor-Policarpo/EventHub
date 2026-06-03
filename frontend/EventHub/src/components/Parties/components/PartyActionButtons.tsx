import React from 'react';
import { Play, CheckCircle, XCircle, Wrench, Truck } from 'lucide-react';
import { usePartyTransition } from '../../../hooks';
import type { PartyTransitionAction } from '../../../types';
import toast from 'react-hot-toast';

interface ActionButtonsProps {
  partyId: number;
  partyStatus: 'SCHEDULED' | 'IN_PROGRESS' | 'FINISHED' | 'CANCELED';
  assemblyStatus: 'TO_ASSEMBLE' | 'ASSEMBLED' | 'TO_DISASSEMBLE' | 'DISASSEMBLED' | 'NOT_APPLICABLE';
}

export const PartyActionButtons: React.FC<ActionButtonsProps> = ({ partyId, partyStatus, assemblyStatus }) => {
  const { mutate: transition, isPending } = usePartyTransition(partyId);
 
  const handleAction = (action: PartyTransitionAction) => {
      transition(action, {
        onSuccess: () => {
          toast.success(`Ação realizada com sucesso!`);
        }, 
        onError: () => {
          toast.error(`Erro ao realizar ação. Por favor, tente novamente.`);
        }
      });
  };

  if (
    assemblyStatus === 'DISASSEMBLED' || 
    assemblyStatus === 'NOT_APPLICABLE' ||
    (partyStatus === 'CANCELED' && assemblyStatus !== 'TO_DISASSEMBLE')
  ) {
    return (
      <div className="text-sm font-medium text-zinc-400 italic bg-zinc-50 p-3 rounded-lg text-center w-full">
        Fluxo concluído. Nenhuma ação pendente para esta festa.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3 p-4 bg-zinc-50 rounded-xl border border-zinc-200 w-full">
      
      {partyStatus === 'SCHEDULED' && assemblyStatus === 'TO_ASSEMBLE' && (
        <button
          onClick={() => handleAction('ASSEMBLE')}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors disabled:opacity-50"
        >
          <Wrench size={16} />
          Marcar como Montado
        </button>
      )}

      {partyStatus === 'SCHEDULED' && assemblyStatus === 'ASSEMBLED' && (
        <button
          onClick={() => handleAction('START')}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors disabled:opacity-50"
        >
          <Play size={16} />
          Iniciar Festa
        </button>
      )}

      {partyStatus === 'IN_PROGRESS' && (
        <button
          onClick={() => handleAction('FINISH')}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors disabled:opacity-50"
        >
          <CheckCircle size={16} />
          Finalizar Festa
        </button>
      )}

      {assemblyStatus === 'TO_DISASSEMBLE' && (
        <button
          onClick={() => handleAction('COLLECT')}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors disabled:opacity-50"
        >
          <Truck size={16} />
          Recolher Brinquedos
        </button>
      )}

      {partyStatus !== 'CANCELED' && partyStatus !== 'FINISHED' && (
        <button
          onClick={() => handleAction('CANCEL')}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-red-50 text-red-600 border border-red-200 font-medium text-sm rounded-lg shadow-sm transition-colors ml-auto disabled:opacity-50"
        >
          <XCircle size={16} />
          Cancelar Festa
        </button>
      )}

    </div>
  );
};