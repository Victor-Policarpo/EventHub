import { type ToyData } from '../../../types';

interface ToySelectorCardProps {
    toy: ToyData;
    quantitySelected: number;
    onChangeQuantity: (toyId: number, newQuantity: number) => void;
}

export function ToySelectorCard({ toy, quantitySelected, onChangeQuantity }: ToySelectorCardProps) {
    const handleIncrease = () => {
        if (quantitySelected < toy.availableQuantity) {
            onChangeQuantity(toy.toyId, quantitySelected + 1);
        }
    };

    const handleDecrease = () => {
        if (quantitySelected > 0) {
            onChangeQuantity(toy.toyId, quantitySelected - 1);
        }
    };

    const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(toy.valueForFourHours); 
    
    const isSelected = quantitySelected > 0;
    const isUnavailable = toy.availableQuantity === 0 && !isSelected;

    return (
        <div 
            // Layout alterado de 'flex-row' fixo para 'flex-col' no mobile e 'flex-row' no sm+
            className={`
                w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 my-2 border rounded-xl transition-all duration-200
                ${isUnavailable ? 'border-red-200 bg-red-50/40 opacity-75 cursor-not-allowed' : ''}
                ${isSelected ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 shadow-sm' : ''}
                ${!isSelected && !isUnavailable ? 'border-slate-200 bg-white hover:shadow-sm hover:border-slate-300' : ''}
            `}
        >
            
            {/* Informações do Brinquedo */}
            <div className="flex flex-col flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                    <strong className="text-slate-800 text-base sm:text-lg truncate">
                        {toy.name}
                    </strong>
                    {isUnavailable && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700 whitespace-nowrap">
                            Esgotado
                        </span>
                    )}
                </div>
                
                <div className="flex items-center flex-wrap gap-1.5 text-sm text-slate-500 mt-1">
                    <span>Estoque: 
                        <span className={`font-semibold ml-1 ${isUnavailable ? 'text-red-600' : 'text-slate-700'}`}>
                            {toy.availableQuantity}
                        </span>
                    </span>
                    <span className="text-slate-300 hidden sm:inline">•</span>
                    <span className="font-medium bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 ml-1 sm:ml-0">
                        {formattedPrice} <span className="text-[10px] uppercase">/ 4h</span>
                    </span>
                </div>
            </div>
            
            {/* Controles de Quantidade */}
            <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 bg-white sm:bg-transparent p-1 rounded-lg border border-slate-100 sm:border-transparent">
                <button 
                    type="button" 
                    onClick={handleDecrease}
                    disabled={quantitySelected === 0 || isUnavailable}
                    className="flex items-center justify-center w-10 h-10 sm:w-8 sm:h-8 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none"
                    aria-label="Diminuir quantidade"
                >
                    <span className="text-xl sm:text-base leading-none mb-0.5">-</span>
                </button>
                
                <span className={`w-8 text-center font-bold text-lg sm:text-base ${isSelected ? 'text-emerald-700' : 'text-slate-800'}`}>
                    {quantitySelected}
                </span>
                
                <button 
                    type="button" 
                    onClick={handleIncrease} 
                    disabled={quantitySelected >= toy.availableQuantity || isUnavailable}
                    className={`flex items-center justify-center w-10 h-10 sm:w-8 sm:h-8 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 outline-none
                        ${isUnavailable 
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                    aria-label="Aumentar quantidade"
                >
                    <span className="text-xl sm:text-base leading-none mb-0.5">+</span>
                </button>
            </div>

        </div>
    );
}