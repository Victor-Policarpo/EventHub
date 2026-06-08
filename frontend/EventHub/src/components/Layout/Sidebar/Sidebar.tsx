import { X } from "lucide-react";
import { SidebarLink } from "./SidebarLink";
import { navigationLinks, adminLinks } from "../../../utils/links";
import { Guard } from "../../Common";
import { ProfileCard } from "../../Users";
import logoUrl from "../../../assets/Logo/Logo-PlimPlim.png";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    return (
        <>
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden transition-opacity" 
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            <aside 
                className={`
                    fixed inset-y-0 left-0 z-50 w-72 md:w-64 bg-white border-r border-slate-200 flex flex-col
                    transform transition-transform duration-300 ease-in-out
                    md:sticky md:top-0 md:h-screen md:translate-x-0
                    ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
                `}
            >
                <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 shrink-0">
                    <img
                        src={logoUrl}
                        alt="EventHub"
                        className="h-50 w-auto"
                    />
                    
                    <button 
                        onClick={onClose}
                        className="md:hidden p-2 -mr-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 p-4 overflow-y-auto flex flex-col gap-6">
                    
                    <div className="space-y-1">
                        {navigationLinks.map(({ label, path, icon, requiredRole }) => {
                            const linkComponent = (
                                <SidebarLink
                                    key={path}
                                    label={label}
                                    path={path}
                                    Icon={icon}
                                    onClick={onClose}
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
                        <div className="pt-6 border-t border-slate-100">
                            <p className="px-4 mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                                Administração
                            </p>

                            <div className="space-y-1">
                                {adminLinks.map(({ label, path, icon }) => (
                                    <SidebarLink
                                        key={path}
                                        label={label}
                                        path={path}
                                        Icon={icon}
                                        onClick={onClose}
                                    />
                                ))}
                            </div>
                        </div>
                    </Guard>
                </nav>

                <div className="p-4 border-t border-slate-200 shrink-0 bg-slate-50/50">
                    <ProfileCard />
                </div>
            </aside>
        </>
    );
}