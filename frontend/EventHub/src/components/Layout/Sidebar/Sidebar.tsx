// src/components/Layout/Sidebar.tsx
import { SidebarLink } from "./SidebarLink";
import { navigationLinks, adminLinks } from "../../../utils/links";
import { Guard } from "../../Common";
import { ProfileCard } from "../ProfileCard";
import logoUrl from "../../../assets/Logo/Logo-PlimPlim-teste.svg";

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 h-screen sticky top-0 border-r border-slate-200 bg-white flex-col">
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <img
          src={logoUrl}
          alt="EventHub"
          className="h-50 w-auto"
        />
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        
        <div className="space-y-2">
          {navigationLinks.map(({ label, path, icon, requiredRole }) => {
            const linkComponent = (
              <SidebarLink
                key={path}
                label={label}
                path={path}
                Icon={icon}
              />
            );

            if (requiredRole) {
              return (
                <Guard key={path} role={requiredRole}>
                  {linkComponent}
                </Guard>
              );
            }
            return linkComponent;
          })}
        </div>

        <Guard role="ADMIN">
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="px-4 mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Create
            </p>

            <div className="space-y-2">
              {adminLinks.map(({ label, path, icon }) => (
                <SidebarLink
                  key={path}
                  label={label}
                  path={path}
                  Icon={icon}
                />
              ))}
            </div>
          </div>
        </Guard>
      </nav>

      {/* Card de Perfil do Usuário */}
      <div className="p-4 border-t border-slate-200">
        <ProfileCard />
      </div>
    </aside>
  );
}