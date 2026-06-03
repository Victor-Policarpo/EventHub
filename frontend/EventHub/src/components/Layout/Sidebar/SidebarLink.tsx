import { NavLink } from "react-router-dom";

interface SidebarLinkProps {
    label: string;
    path: string;
    Icon: React.ElementType;
    onClick?: () => void;
}

export function SidebarLink({ label, path, Icon, onClick }: SidebarLinkProps) {
    return (
        <NavLink
            to={path}
            end
            onClick={onClick}
            className={({ isActive }) =>
                `
                flex items-center gap-3
                px-4 py-3 rounded-xl
                transition-all duration-200
                outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1
                ${isActive
                    ? "bg-blue-50 text-blue-700 font-semibold shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 font-medium"
                }
                `
            }
        >
            {({ isActive }) => (
                <>
                    <Icon
                        size={20}
                        className={isActive ? "text-blue-600" : "text-slate-400"}
                    />
                    <span>{label}</span>
                </>
            )}
        </NavLink>
    );
}