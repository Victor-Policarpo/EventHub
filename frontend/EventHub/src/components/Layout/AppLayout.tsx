import { Outlet } from "react-router-dom";
import { Sidebar } from "../Layout";

export function AppLayout() {
    return (
        <div className="min-h-screen bg-slate-50 flex">

            <Sidebar />
            <div className="flex flex-col flex-1 min-w-0">
                <main className="flex-1 p-4 md:p-6 overflow-auto">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}