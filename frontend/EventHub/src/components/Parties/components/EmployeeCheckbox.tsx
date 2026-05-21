import { type EmployeeData } from '../../../types';
import { Input } from '../../Ui';

interface EmployeeCheckboxProps {
  employee: EmployeeData;
  isSelected: boolean;
  onToggle: (employeeId: number) => void;
}

export function EmployeeCheckbox({ employee, isSelected, onToggle }: EmployeeCheckboxProps) {
  const isApiAvailable = employee.isAvailable !== false; 
  const canInteract = isApiAvailable || isSelected;
  const showUnavailableBadge = !isApiAvailable && !isSelected;

  return (
    <label 
      className={`
        flex items-start p-4 my-2 border rounded-lg transition-all duration-200
        ${canInteract ? 'cursor-pointer hover:shadow-md' : 'cursor-not-allowed opacity-60 bg-gray-50'}
        ${isSelected ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : 'border-gray-200 bg-white'}
        ${!isSelected && canInteract ? 'hover:border-gray-300' : ''}
      `}
    >
      <div className="flex items-center h-6">
        <Input 
          type="checkbox"
          label=''
          checked={isSelected}
          disabled={!canInteract}
          onChange={() => {
            if (canInteract) onToggle(employee.employeeId);
          }}
          className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2 disabled:cursor-not-allowed"
        />
      </div>
      
      <div className="flex flex-col ml-3">
        <strong className="text-gray-800 text-lg">
          {employee.name}
          {showUnavailableBadge && (
            <span className="ml-2 text-sm text-red-500 font-normal">
              (Indisponível)
            </span>
          )}
        </strong>
        <p className="text-sm text-gray-500 mt-1">
          {employee.telephone}
        </p>
      </div>
    </label>
  );
}