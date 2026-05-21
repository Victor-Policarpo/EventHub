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

  return (
    <div 
      className={`
        flex items-center justify-between p-4 my-2 border rounded-lg shadow-sm transition-all duration-200
        ${isSelected ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : 'border-gray-200 bg-white'}
      `}
    >
      
      <div className="flex flex-col">
        <strong className="text-gray-800 text-lg">{toy.name}</strong>
        <p className="text-sm text-gray-500">
          Disponível: <span className="font-semibold text-gray-700">{toy.availableQuantity}</span> | {formattedPrice}
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          type="button" 
          onClick={handleDecrease} 
          disabled={quantitySelected === 0}
          className="flex items-center justify-center w-8 h-8 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          -
        </button>
        
        <span className={`w-5 text-center font-medium ${isSelected ? 'text-green-700' : 'text-gray-800'}`}>
          {quantitySelected}
        </span>
        
        <button 
          type="button" 
          onClick={handleIncrease} 
          disabled={quantitySelected >= toy.availableQuantity}
          className="flex items-center justify-center w-8 h-8 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          +
        </button>
      </div>

    </div>
  );
}