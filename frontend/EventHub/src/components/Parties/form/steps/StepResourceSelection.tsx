import { useState } from 'react';
import { Search } from 'lucide-react';
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

    if (isPending) return <div className="flex justify-center items-center p-12 text-slate-500 bg-white rounded-2xl shadow-sm border border-slate-200">Buscando itens disponíveis...</div>;
    if (isError) return <div className="p-6 bg-red-50 text-red-600 rounded-2xl border border-red-100 shadow-sm">Erro ao buscar os recursos disponíveis.</div>;

    return (
        <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="flex border-b border-slate-200 bg-slate-50/50">
                <button
                    type="button"
                    onClick={() => handleTabChange('toys')}
                    className={`flex-1 py-4 text-sm font-semibold text-center border-b-2 transition-colors flex flex-col sm:flex-row items-center justify-center gap-2
                        ${activeTab === 'toys' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
                >
                    Brinquedos 
                    {selectedToysCount > 0 && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px] sm:text-xs">{selectedToysCount} <span className="hidden sm:inline">selecionados</span></span>}
                </button>
                
                <button
                    type="button"
                    onClick={() => handleTabChange('employees')}
                    className={`flex-1 py-4 text-sm font-semibold text-center border-b-2 transition-colors flex flex-col sm:flex-row items-center justify-center gap-2
                        ${activeTab === 'employees' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
                >
                    Funcionários
                    {selectedEmployeesCount > 0 && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px] sm:text-xs">{selectedEmployeesCount} <span className="hidden sm:inline">selecionados</span></span>}
                </button>
            </div>

            <div className="p-4 sm:p-6 h-[60vh] min-h-100 flex flex-col">
                
                <div className="mb-4 shrink-0 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder={`Buscar ${activeTab === 'toys' ? 'brinquedos' : 'funcionários'}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-800 transition-shadow outline-none placeholder:text-slate-400"
                    />
                </div>
                
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    
                    {activeTab === 'toys' && (
                        <div className="animate-in fade-in duration-300">
                            {filteredToys.length === 0 ? (
                                <p className="text-slate-500 text-center mt-12 bg-slate-50 p-6 rounded-xl border border-dashed border-slate-200">
                                    {searchTerm ? 'Nenhum brinquedo encontrado para esta pesquisa.' : 'Nenhum brinquedo disponível para esta data.'}
                                </p>
                            ) : (
                                <div className="grid grid-cols-1 gap-3">
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
                                <p className="text-slate-500 text-center mt-12 bg-slate-50 p-6 rounded-xl border border-dashed border-slate-200">
                                    {searchTerm ? 'Nenhum funcionário encontrado para esta pesquisa.' : 'Nenhum funcionário disponível para esta data.'}
                                </p>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
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
            <div className="flex items-center justify-between p-4 sm:px-6 border-t border-slate-200 bg-slate-50">
                <button 
                    type="button" 
                    onClick={onBack} 
                    disabled={isSubmitting}
                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50"
                >
                    &larr; Voltar
                </button>
                
                <Button 
                    type="button" 
                    variant="primary"
                    onClick={handleFinalize} 
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                    className="w-auto px-8"
                >
                    Finalizar Festa
                </Button>
            </div>
            
        </div>
    );
}