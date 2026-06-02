import { NavLink } from "react-router-dom";

interface SidebarLinkProps {
  label: string;
  path: string;
  Icon: React.ElementType;
}

export function SidebarLink({
  label,
  path,
  Icon,
}: SidebarLinkProps) {
  return (
    <NavLink
      to={path}
      end
      className={({ isActive }) =>
        `
        flex items-center gap-3
        px-4 py-3 rounded-xl
        transition-colors
        ${
          isActive
            ? "bg-blue-50 text-blue-600"
            : "text-slate-600 hover:bg-slate-100"
        }
      `
      }
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </NavLink>
  );
}