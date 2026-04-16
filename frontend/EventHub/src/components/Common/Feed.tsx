import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

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

function Feed({ title, filterBar, children, pagination, isEmpty, emptyMessage }: FeedProps) {
    const { currentPage, totalPages, totalElements, isPlaceholderData, onPageChange } = pagination;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {title && <h1 className="text-2xl font-bold text-gray-800">{title}</h1>}
            <div className="space-y-3">
                {filterBar}
            </div>

            <div className={`space-y-4 transition-opacity ${isPlaceholderData ? 'opacity-50' : 'opacity-100'}`}>
                {isEmpty ? (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500 italic">{emptyMessage || "Nenhum registro encontrado."}</p>
                    </div>
                ) : (
                    children
                )}
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">
                        Página <strong>{currentPage + 1}</strong> de <strong>{totalPages}</strong> 
                    </span>
                    <span className="text-[10px] text-gray-400">Total de registros: {totalElements}</span>
                </div>
                
                <div className="flex gap-2">
                    <button
                        disabled={currentPage === 0 || isPlaceholderData}
                        onClick={() => onPageChange(currentPage - 1)}
                        className="p-2 border border-gray-300 rounded-lg disabled:opacity-30 hover:bg-gray-50 transition-colors shadow-sm bg-white"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        disabled={currentPage >= totalPages - 1 || isPlaceholderData}
                        onClick={() => onPageChange(currentPage + 1)}
                        className="p-2 border border-gray-300 rounded-lg disabled:opacity-30 hover:bg-gray-50 transition-colors shadow-sm bg-white"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Feed;