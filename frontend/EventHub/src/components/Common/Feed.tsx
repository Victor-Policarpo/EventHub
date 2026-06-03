import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "../Ui";

interface FeedProps {
    title?: string;
    filterBar: ReactNode;
    children: ReactNode;
    pagination: {
        currentPage: number;
        totalPages: number;
        totalElements: number;
        isPlaceholderData: boolean;
        onPageChange: (newPage: number) => void;
    };
    isEmpty: boolean;
    emptyMessage?: string;
}

export function Feed({ title, filterBar, children, pagination, isEmpty, emptyMessage }: FeedProps) {
    const { currentPage, totalPages, totalElements, isPlaceholderData, onPageChange } = pagination;

    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-6 md:px-8 md:py-8 flex flex-col gap-6">
            
            {title && (
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {title}
                </h1>
            )}
            
            <div className="w-full">
                {filterBar}
            </div>

            <div className={`flex flex-col gap-4 transition-opacity duration-200 ${isPlaceholderData ? 'opacity-50' : 'opacity-100'}`}>
                {isEmpty ? (
                    <div className="flex flex-col items-center justify-center text-center py-20 px-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-300">
                        <p className="text-slate-500 font-medium">
                            {emptyMessage || "Nenhum registro encontrado."}
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 w-full">
                        {children}
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 pt-6 mt-2">
                
                <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-slate-700">
                        Página <strong className="font-semibold">{currentPage + 1}</strong> de <strong className="font-semibold">{totalPages}</strong> 
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                        Total de registros: {totalElements}
                    </span>
                </div>
                
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        disabled={currentPage === 0 || isPlaceholderData}
                        onClick={() => onPageChange(currentPage - 1)}
                        className="w-10 h-10 p-0 flex items-center justify-center rounded-lg"
                        aria-label="Página anterior"
                    >
                        <ChevronLeft size={20} />
                    </Button>
                    
                    <Button
                        variant="secondary"
                        disabled={currentPage >= totalPages - 1 || isPlaceholderData}
                        onClick={() => onPageChange(currentPage + 1)}
                        className="w-10 h-10 p-0 flex items-center justify-center rounded-lg"
                        aria-label="Próxima página"
                    >
                        <ChevronRight size={20} />
                    </Button>
                </div>
                
            </div>
        </div>
    );
}