import { useState } from 'react';
import { StepBasicInfo } from './steps/StepBasicInfo';
import { StepResourceSelection } from './steps/StepResourceSelection';
import { type StepFormValues } from '../../../schemas';
import { formatForApi } from '../../../utils/formatDateHours';

interface PartyFormWizardProps {
    initialBasicInfo?: StepFormValues | null;
    initialToys?: Record<number, number>;
    initialEmployees?: number[];
    onSubmit: (payload: any) => void;
    isSubmitting?: boolean;
    isPastEvent?: boolean;
    partyId?: number;
}

export function PartyFormWizard({ 
    initialBasicInfo = null, 
    initialToys, 
    initialEmployees, 
    onSubmit, 
    isSubmitting,
    isPastEvent = false,
    partyId
}: PartyFormWizardProps) {
  
    const [step, setStep] = useState<1 | 2>(1);
    const [basicInfo, setBasicInfo] = useState<StepFormValues | null>(initialBasicInfo);

    const handleAdvanceToStep2 = (data: StepFormValues) => {
        if (isPastEvent) {
            const startForApi = formatForApi(data.startDateHours)!; 
            const endForApi = formatForApi(data.endDateHours); 
            const parsedValue = data.value ? Number(data.value) : undefined;

            onSubmit({
                name: data.name,
                telephone: data.telephone,
                address: data.address,
                startDateHours: startForApi,
                endDateHours: endForApi,
                value: parsedValue,
            });
        } else {
            setBasicInfo(data);
            setStep(2);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {step === 1 ? 'Detalhes do Evento' : 'Seleção de Recursos'}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                    Etapa {step} de {isPastEvent ? 1 : 2}
                </p>
            </div>

            <div className="w-full">
                {step === 1 && (
                    <StepBasicInfo 
                        initialData={basicInfo} 
                        onNext={handleAdvanceToStep2} 
                        isPastEvent={isPastEvent}
                    /> 
                )}

                {step === 2 && basicInfo && (
                    <StepResourceSelection 
                        basicInfo={basicInfo} 
                        initialToys={initialToys}
                        initialEmployees={initialEmployees}
                        onBack={() => setStep(1)} 
                        onFinalize={onSubmit} 
                        isSubmitting={isSubmitting}
                        partyId={partyId}
                    />
                )}
            </div>

        </div>
    );
}