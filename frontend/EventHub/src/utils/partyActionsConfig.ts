import { type PartyDetails } from '../types';


export type PartyActionType = 'START' | 'END' | 'COLLECT' | 'CANCEL';

export interface PartyActionConfig {
  id: PartyActionType;
  label: string;
  theme: 'primary' | 'danger' | 'warning' | 'success';
  isVisible: (party: PartyDetails) => boolean;
}

export const partyActionsConfig: PartyActionConfig[] = [
  {
    id: 'START',
    label: 'Iniciar Festa',
    theme: 'success',
    isVisible: (party) => party.partyStatus === 'SCHEDULED',
  },
  {
    id: 'END',
    label: 'Finalizar Festa',
    theme: 'primary',
    isVisible: (party) => party.partyStatus === 'IN_PROGRESS',
  },
  {
    id: 'COLLECT',
    label: 'Coletar Brinquedos',
    theme: 'warning',
    isVisible: (party) => party.assemblyStatus === 'TO_DISASSEMBLE',
  },
  {
    id: 'CANCEL',
    label: 'Cancelar Festa',
    theme: 'danger',
    isVisible: (party) => 
      party.partyStatus !== 'FINISHED' && party.partyStatus !== 'CANCELED',
  },
];