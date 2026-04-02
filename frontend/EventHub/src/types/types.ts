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
