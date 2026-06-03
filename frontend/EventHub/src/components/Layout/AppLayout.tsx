import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sidebar } from "../Layout";
import logoUrl from "../../assets/Logo/Logo-PlimPlim-teste.svg";

export function AppLayout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            
            <header className="md:hidden flex items-center justify-between px-4 h-16 bg-white border-b border-slate-200 sticky top-0 z-30 shrink-0">
                <img 
                    src={logoUrl} 
                    alt="EventHub" 
                   className="h-50 w-auto"
                />
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 -mr-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 outline-none"
                    aria-label="Abrir menu"
                >
                    <Menu size={24} />
                </button>
            </header>

            <Sidebar 
                isOpen={isMobileMenuOpen} 
                onClose={() => setIsMobileMenuOpen(false)} 
            />

            <div className="flex flex-col flex-1 min-w-0">
                <main className="flex-1 w-full">
                    <Outlet />
                </main>
            </div>

        </div>
    );
}