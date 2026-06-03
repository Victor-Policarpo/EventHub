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
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
            
            <div className="relative w-full sm:w-auto">
                <Button 
                    variant="secondary" 
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full sm:w-auto justify-between sm:justify-center min-h-12 sm:min-h-11"
                >
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal size={18} className="text-slate-500" /> 
                        <span className="font-semibold text-slate-800">Filtros</span>
                    </div>
                    <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </Button>

                {isOpen && (
                    <div className="absolute top-full left-0 mt-2 w-70 sm:w-80 md:w-96 bg-white border border-slate-200 rounded-xl shadow-lg z-50 p-5 animate-in fade-in zoom-in-95 duration-200">
                        
                        <div className="mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Filtrar Resultados
                            </h3>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            {children}
                        </div>
                    
                        <Button 
                            onClick={() => {
                                onApply();
                                setIsOpen(false);
                            }}
                            variant="primary"
                            className="mt-6 w-full min-h-12 text-base"
                        >
                            Aplicar Filtros
                        </Button>
                    </div>
                )}
            </div>
            <div className="flex flex-wrap gap-2 items-center flex-1">
                {activeFiltersDisplay}
            </div>
            
        </div>
    );
}