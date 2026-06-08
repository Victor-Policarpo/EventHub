import { LayoutDashboard, Package, Users, CalendarDays, StickyNote, Blocks, UserPlus } from "lucide-react";

export interface NavigationLink {
  label: string;
  path: string;
  icon: React.ElementType;
  requiredRole?: 'ADMIN' | 'BASIC';
}

export const navigationLinks: NavigationLink[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    requiredRole: "ADMIN",
  },
  {
    label: "Eventos",
    path: "/parties",
    icon: CalendarDays,
  },
  {
    label: "Brinquedos",
    path: "/toys",
    icon: Package,
  },
  {
    label: "Funcionários",
    path: "/employees",
    icon: Users,
  },
];

export const adminLinks: NavigationLink[] = [
  {
    label: "Criar Evento",
    path: "/parties/new",
    icon: StickyNote,
  },
  {
    label: "Criar Brinquedo",
    path: "/toys/new",
    icon: Blocks,
  },
  {
    label: "Criar Funcionário",
    path: "/employees/new",
    icon: UserPlus,
  },
];