import { type EmployeeData } from '../../../types';

interface EmployeeCheckboxProps {
    employee: EmployeeData;
    isSelected: boolean;
    onToggle: (employeeId: number) => void;
}

// Formatador visual de telefone
const formatPhoneDisplay = (phone?: string) => {
    if (!phone) return "Não informado";
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    if (cleaned.length === 10) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    return phone; 
};

export function EmployeeCheckbox({ employee, isSelected, onToggle }: EmployeeCheckboxProps) {
    const isApiAvailable = employee.isAvailable !== false; 
    const canInteract = isApiAvailable || isSelected;
    const showUnavailableBadge = !isApiAvailable && !isSelected;

    return (
        <label 
            // O uso de 'w-full' garante que ele preencha a tela do celular
            className={`
                w-full flex items-start p-4 my-2 border rounded-xl transition-all duration-200
                ${canInteract ? 'cursor-pointer' : 'cursor-not-allowed opacity-60 bg-slate-50'}
                ${isSelected ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 shadow-sm' : 'border-slate-200 bg-white'}
                ${!isSelected && canInteract ? 'hover:border-slate-300 hover:shadow-sm' : ''}
            `} 
        >
            {/* Input nativo para controle exato de alinhamento e foco */}
            <div className="flex items-center h-6 shrink-0 mt-0.5">
                <input 
                    type="checkbox"
                    checked={isSelected}
                    disabled={!canInteract}
                    onChange={() => {
                        if (canInteract) onToggle(employee.employeeId);
                    }}
                    className="w-5 h-5 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed transition-colors"
                />
            </div>
            
            <div className="flex flex-col ml-3 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                    <strong className="text-slate-800 text-base sm:text-lg truncate">
                        {employee.name}
                    </strong>
                    {showUnavailableBadge && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700 whitespace-nowrap">
                            Indisponível
                        </span>
                    )}
                </div>
                <p className="text-sm text-slate-500 mt-0.5 font-medium tracking-wide">
                    {formatPhoneDisplay(employee.telephone)}
                </p>
            </div>
        </label>
    );
}