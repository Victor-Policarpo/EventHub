import type { SelectedToyPayload } from "./toy";

export interface PartyFilters {
  partyStatus?: 'SCHEDULED' | 'IN_PROGRESS' | 'FINISHED' | 'CANCELED';
  assemblyStatus?: 'TO_ASSEMBLE' | 'ASSEMBLED' | 'TO_DISASSEMBLE' | 'DISASSEMBLED' | 'NOT_APPLICABLE';
  date?: string;
  search?: string;
  page?: number;
  size?: number;
}

export interface PartyData {
    partyId: number;
    name: string;
    address: string;
    startDateHours: string;
    assemblyStatus: 'TO_ASSEMBLE' | 'ASSEMBLED' | 'TO_DISASSEMBLE' | 'DISASSEMBLED' | 'NOT_APPLICABLE';
    partyStatus: 'SCHEDULED' | 'IN_PROGRESS' | 'FINISHED' | 'CANCELED';
}

export interface ToyParty {
    toyId: string;
    name: string;
    quantity: number;
}

export interface EmployeeParty {
    employeeId: string;
    name: string;
}

export interface PartyDetails {
    partyId: string;
    name: string;
    address: string;
    telephone: string;
    startDateHours: string;
    endDateHours: string;
    value: number;
    partyToys: ToyParty[];
    employees: EmployeeParty[];
    createBy: string;
    assemblyStatus: 'TO_ASSEMBLE' | 'ASSEMBLED' | 'TO_DISASSEMBLE' | 'DISASSEMBLED' | 'NOT_APPLICABLE';
    partyStatus: 'SCHEDULED' | 'IN_PROGRESS' | 'FINISHED' | 'CANCELED';
}

export interface CreatePartyPayload {
  name: string;
  telephone: string;
  address: string;
  startDateHours: string;
  endDateHours?: string;
  value?: number;
  toys: SelectedToyPayload[];
  employeeId: number[];
}

export interface UpdatePartyPayload {
  name: string;
  telephone: string;
  address: string;
  startDateHours: string;
  endDateHours: string;
  value?: number;
  partyToys: { toyId: number; quantity: number }[]; 
  employees: { employeeId: number }[];
}

export type PartyTransitionAction = 'ASSEMBLE' | 'START' | 'FINISH' | 'CANCEL' | 'COLLECT';

export interface TransitionRequest {
  action: PartyTransitionAction;
}

export interface PartyHistoryItem {
  id: number;
  action: PartyTransitionAction;
  performedAt: string;
  performedBy: {
    id: string;
    username: string;
  };
}