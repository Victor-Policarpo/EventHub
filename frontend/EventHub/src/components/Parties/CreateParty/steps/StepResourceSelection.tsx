import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAvailableResources } from '../../../../hooks';
import { type StepFormValues } from '../../../../schemas';
import type { SelectedToyPayload } from '../../../../types';
import { ToySelectorCard } from '../components/ToySelectorCard';
import { EmployeeCheckbox } from '../components/EmployeeCheckbox';
import { createParty } from '../../../../services';
import { Button } from '../../..'; 
import { formatForApi } from '../../../../utils/formatDateHours';

interface Step2ResourceSelectionProps {
  basicInfo: StepFormValues;
  onBack: () => void;
  onSuccess: () => void;
}

type TabState = 'toys' | 'employees';

export function StepResourceSelection({ basicInfo, onBack, onSuccess }: Step2ResourceSelectionProps) {
  const { toys, employees, isPending, isError } = useAvailableResources(
    basicInfo.startDateHours, 
    basicInfo.endDateHours
  );

  const [selectedToysMap, setSelectedToysMap] = useState<Record<number, number>>({});
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<TabState>('toys');
  const [searchTerm, setSearchTerm] = useState('');

  const { mutate: submitParty, isPending: isSubmitting } = useMutation({
    mutationFn: createParty,
    onSuccess: () => onSuccess(),
    onError: (err) => {
      console.error('Erro ao criar festa', err);
      alert('Falha ao criar a festa. Verifique o console e tente novamente.');
    }
  });

  const handleToyChange = (toyId: number, quantity: number) => {
    setSelectedToysMap(prev => ({ ...prev, [toyId]: quantity }));
  };

  const handleEmployeeToggle = (employeeId: number) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]                
    );
  };

  const handleTabChange = (tab: TabState) => {
    setActiveTab(tab);
    setSearchTerm('');
  };

  const handleFinalize = () => {
    const toysPayload: SelectedToyPayload[] = Object.entries(selectedToysMap)
      .filter(([_, quantity]) => quantity > 0)
      .map(([toyId, quantity]) => ({ toyId: Number(toyId), quantity }));

    const startForApi = formatForApi(basicInfo.startDateHours)!; 
    const endForApi = formatForApi(basicInfo.endDateHours); 
    const parsedValue = basicInfo.value ? Number(basicInfo.value) : undefined;

    submitParty({
      name: basicInfo.name,
      telephone: basicInfo.telephone,
      address: basicInfo.address,
      startDateHours: startForApi,
      endDateHours: endForApi,
      value: parsedValue,
      toys: toysPayload,
      employeeId: selectedEmployees
    });
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
                      quantitySelected={selectedToysMap[toy.toyId] || 0}
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
                      isSelected={selectedEmployees.includes(employee.employeeId)}
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