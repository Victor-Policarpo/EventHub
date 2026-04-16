// FilterBar.tsx
import { useState, type ReactNode } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

interface FilterBarProps {
    children: ReactNode;
    activeFiltersDisplay: ReactNode;
    onApply: () => void;
}

export function FilterBar({ children, activeFiltersDisplay, onApply }: FilterBarProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex items-center flex-wrap gap-3">
            <div className="relative">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                >
                    <SlidersHorizontal size={18} /> 
                    Filtrar
                    <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4 animate-in fade-in zoom-in-95 duration-150">
                        {children}
                        <button 
                            onClick={() => {
                                onApply();
                                setIsOpen(false);
                            }}
                            className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md transition-colors"
                        >
                            Aplicar Filtros
                        </button>
                    </div>
                )}
            </div>

            <div className="flex flex-wrap gap-2">
                {activeFiltersDisplay}
            </div>
        </div>
    );
}