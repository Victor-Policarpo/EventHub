import { LayoutDashboard, Package, Users, CalendarDays, StickyNote, Blocks, UserPlus } from "lucide-react";

export const navigationLinks = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
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

export const adminLinks = [
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