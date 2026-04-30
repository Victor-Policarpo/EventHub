import { useState, type ReactNode } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { Button } from "../Ui";

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
            <Button 
                variant="ghost" 
                onClick={() => setIsOpen(!isOpen)}
                className="w-fit bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm"
            >
                <SlidersHorizontal size={18} /> 
                Filtrar
                <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </Button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4 animate-in fade-in zoom-in-95 duration-150">
                    {children}
                
                    <Button 
                        onClick={() => {
                            onApply();
                            setIsOpen(false);
                        }}
                        variant="primary"
                        className="mt-2"
                    >
                        Aplicar Filtros
                    </Button>
                </div>
            )}
        </div>

        <div className="flex flex-wrap gap-2">
            {activeFiltersDisplay}
        </div>
    </div>
);
}