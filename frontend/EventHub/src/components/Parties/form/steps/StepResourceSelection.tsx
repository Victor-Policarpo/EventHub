import { useState } from 'react';
import { useAvailableResources } from '../../../../hooks';
import { type StepFormValues } from '../../../../schemas';
import { ToySelectorCard } from '../../components/ToySelectorCard';
import { EmployeeCheckbox } from '../../components/EmployeeCheckbox';
import { Button } from '../../../Ui'; 
import { formatForApi } from '../../../../utils/formatDateHours';

interface StepResourceSelectionProps {
  basicInfo: StepFormValues;
  initialToys?: Record<number, number>;
  initialEmployees?: number[];
  onBack: () => void;
  onFinalize: (payload: any) => void;
  isSubmitting?: boolean;
  partyId?: number;
}

type TabState = 'toys' | 'employees';

export function StepResourceSelection({ 
  basicInfo, 
  initialToys = {}, 
  initialEmployees = [], 
  onBack, 
  onFinalize,
  isSubmitting,
  partyId
}: StepResourceSelectionProps) {
  
  const { toys, employees, isPending, isError } = useAvailableResources(
    basicInfo.startDateHours, 
    basicInfo.endDateHours,
    partyId
  );

  const [selectedToysMap, setSelectedToysMap] = useState<Record<number, number>>(initialToys);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>(initialEmployees);
  const [activeTab, setActiveTab] = useState<TabState>('toys');
  const [searchTerm, setSearchTerm] = useState('');

  const handleToyChange = (toyId: number, quantity: number) => {
    setSelectedToysMap(prev => ({ ...prev, [toyId]: quantity }));
  };

  const handleEmployeeToggle = (employeeId: number) => {
  const targetId = Number(employeeId);
  
  setSelectedEmployees(prev => 
    prev.map(Number).includes(targetId)
      ? prev.map(Number).filter(id => id !== targetId)
      : [...prev.map(Number), targetId]                
  );
};

  const handleTabChange = (tab: TabState) => {
    setActiveTab(tab);
    setSearchTerm('');
  };

  const handleFinalize = () => {
    const toysPayload = Object.entries(selectedToysMap)
      .filter(([toyId, quantity]) => quantity > 0 && !isNaN(Number(toyId)))
      .map(([toyId, quantity]) => ({ toyId: Number(toyId), quantity }));

    const startForApi = formatForApi(basicInfo.startDateHours)!; 
    const endForApi = basicInfo.endDateHours ? formatForApi(basicInfo.endDateHours) : undefined; 
    const parsedValue = basicInfo.value ? Number(basicInfo.value) : undefined;

    const isEditing = !!partyId;
    const basePayload: any = {
      name: basicInfo.name,
      telephone: basicInfo.telephone,
      address: basicInfo.address,
      startDateHours: startForApi,
      endDateHours: endForApi,
      value: parsedValue,
    };

    if (isEditing) {
      basePayload.partyToys = toysPayload;
      basePayload.employees = selectedEmployees.map(id => ({ employeeId: id }));
    } else {
      basePayload.toys = toysPayload;
      basePayload.employeeId = selectedEmployees.map(Number);
    }
    onFinalize(basePayload);
  };

  const selectedToysCount = Object.values(selectedToysMap).filter(qtd => qtd > 0).length;
  const selectedEmployeesCount = selectedEmployees.length;

  const filteredToys = toys.filter(toy => 
    toy.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isPending) return <div className="flex justify-center items-center p-8 text-gray-500">Buscando itens disponíveis...</div>;
  if (isError) return <div className="p-4 bg-red-50 text-red-600 rounded-md">Erro ao buscar os recursos disponíveis.</div>;

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm">
      
      <div className="flex border-b border-gray-200">
        <button
          type="button"
          onClick={() => handleTabChange('toys')}
          className={`flex-1 py-4 text-sm font-medium text-center border-b-2 transition-colors
            ${activeTab === 'toys' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
        >
          Brinquedos 
          {selectedToysCount > 0 && <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs">{selectedToysCount} selecionados</span>}
        </button>
        
        <button
          type="button"
          onClick={() => handleTabChange('employees')}
          className={`flex-1 py-4 text-sm font-medium text-center border-b-2 transition-colors
            ${activeTab === 'employees' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
        >
          Funcionários
          {selectedEmployeesCount > 0 && <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs">{selectedEmployeesCount} selecionados</span>}
        </button>
      </div>

      <div className="p-4 sm:p-6 h-125 flex flex-col">
        
        <div className="mb-4 shrink-0">
          <input
            type="text"
            placeholder={`Buscar ${activeTab === 'toys' ? 'brinquedos' : 'funcionários'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          />
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          
          {activeTab === 'toys' && (
            <div className="animate-in fade-in duration-300">
              {filteredToys.length === 0 ? (
                <p className="text-gray-500 italic text-center mt-8">
                  {searchTerm ? 'Nenhum brinquedo encontrado para esta pesquisa.' : 'Nenhum brinquedo disponível.'}
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredToys.map(toy => (
                    <ToySelectorCard 
                      key={toy.toyId}
                      toy={toy}
                      quantitySelected={selectedToysMap[Number(toy.toyId)] || 0}
                      onChangeQuantity={handleToyChange}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'employees' && (
            <div className="animate-in fade-in duration-300">
              {filteredEmployees.length === 0 ? (
                <p className="text-gray-500 italic text-center mt-8">
                  {searchTerm ? 'Nenhum funcionário encontrado para esta pesquisa.' : 'Nenhum funcionário disponível.'}
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredEmployees.map(employee => (
                    <EmployeeCheckbox 
                      key={employee.employeeId}
                      employee={employee}
                      isSelected={selectedEmployees.map(Number).includes(Number(employee.employeeId))}
                      onToggle={handleEmployeeToggle}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          
        </div>
      </div>

      <div className="flex items-center justify-between p-4 sm:px-6 border-t border-gray-100 bg-gray-50 rounded-b-lg">
        <button 
          type="button" 
          onClick={onBack} 
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
        >
          &larr; Voltar
        </button>
        
        <Button type="button" onClick={handleFinalize} disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Finalizar Festa'}
        </Button>
      </div>
    </div>
  );
}