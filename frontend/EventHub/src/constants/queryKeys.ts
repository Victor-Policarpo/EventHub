export const queryKeys = {
  toys: {
    all: ['toys'] as const,
    lists: () => [...queryKeys.toys.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.toys.lists(), filters] as const,
    details: () => [...queryKeys.toys.all, 'detail'] as const,
    detail: (id: number | string) => [...queryKeys.toys.details(), id] as const,
    available: (start?: string, end?: string, partyId?: number) => [...queryKeys.toys.all, 'available', { start, end, partyId }] as const,
  },

  employees: {
    all: ['employees'] as const,
    lists: () => [...queryKeys.employees.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.employees.lists(), filters] as const,
    details: () => [...queryKeys.employees.all, 'detail'] as const,
    detail: (id: number | string) => [...queryKeys.employees.details(), id] as const,
    available: (start?: string, end?: string, partyId?: number) =>  [...queryKeys.employees.all, 'available', { start, end, partyId }] as const,
  },
  parties: {
    all: ['parties'] as const,
    lists: () => [...queryKeys.parties.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.parties.lists(), filters] as const,
    detail: (id: number | string) => [...queryKeys.parties.all, 'detail', id] as const,
    histories: () => [...queryKeys.parties.all, 'history'] as const,
    history: (partyId: number | string) => [...queryKeys.parties.histories(), partyId] as const,
  },
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
  },
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
  },

  dashboard: {
    all: ['dashboard'] as const,
    summary: (filters: Record<string, any>) => [...queryKeys.dashboard.all, 'summary', filters] as const,
    chart: (filters: Record<string, any>) => [...queryKeys.dashboard.all, 'chart', filters] as const,
    breakdown: (filters: Record<string, any>) => [...queryKeys.dashboard.all, 'breakdown', filters] as const,
}
};