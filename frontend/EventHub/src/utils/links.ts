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
    label: "Parties",
    path: "/parties",
    icon: CalendarDays,
  },
  {
    label: "Toys",
    path: "/toys",
    icon: Package,
  },
  {
    label: "Employees",
    path: "/employees",
    icon: Users,
  },
];

export const adminLinks: NavigationLink[] = [
  {
    label: "Create Party",
    path: "/parties/new",
    icon: StickyNote,
  },
  {
    label: "Create Toy",
    path: "/toys/new",
    icon: Blocks,
  },
  {
    label: "Create Employee",
    path: "/employees/new",
    icon: UserPlus,
  },
];