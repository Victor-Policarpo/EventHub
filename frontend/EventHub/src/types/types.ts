export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
}

export interface PartyFilters {
  partyStatus?: 'SCHEDULED' | 'IN_PROGRESS' | 'FINISHED' | 'CANCELED';
  assemblyStatus?: 'TO_ASSEMBLE' | 'ASSEMBLED' | 'TO_DISASSEMBLE' | 'DISASSEMBLED' | 'NOT_APPLICABLE';
  date?: string;
  page?: number;
  size?: number;
  sort?: string;
}

export interface SpringError {
    timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string;
}

export interface PartyData {
    partyId: number;
    name: string;
    address: string;
    startDateHours: string;
    assemblyStatus: 'TO_ASSEMBLE' | 'ASSEMBLED' | 'TO_DISASSEMBLE' | 'DISASSEMBLED' | 'NOT_APPLICABLE';
    partyStatus: 'SCHEDULED' | 'IN_PROGRESS' | 'FINISHED' | 'CANCELED';

}

export interface PartyDataResponse {
    content: PartyData[];
    page: {
        size: number;
        number: number;
        totalElements: number;
        totalPages: number;
    };
}

export interface UserDataResponse {
    fullName: string;
    username: string;
    email: string;
    roles: string[];
    active: boolean;
}

export interface UserUpdateData {
    fullName?: string;
    username?: string;
    email?: string;
}

export interface PasswordUpdateData {
    oldPassword: string;
    newPassword: string;
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

export interface UpdatePartyData {
  name: string;
  address: string;
  telephone: string;
  startDateHours: string;
  endDateHours: string;
  value: number;
}