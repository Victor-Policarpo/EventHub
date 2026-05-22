import { type PartyDetails } from '../types';

export const partyStatusMap: Record<PartyDetails['partyStatus'], string> = {
  SCHEDULED: 'Agendada',
  IN_PROGRESS: 'Em Andamento',
  FINISHED: 'Finalizada',
  CANCELED: 'Cancelada',
};

export const assemblyStatusMap: Record<PartyDetails['assemblyStatus'], string> = {
  TO_ASSEMBLE: 'A Montar',
  ASSEMBLED: 'Montado',
  TO_DISASSEMBLE: 'A Desmontar',
  DISASSEMBLED: 'Desmontado',
  NOT_APPLICABLE: 'Não Aplicável',
};