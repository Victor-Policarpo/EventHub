import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepBasicInfo } from './steps/StepBasicInfo';
import { StepResourceSelection } from './steps/StepResourceSelection';
import { type StepFormValues } from '../../../schemas';

export function CreatePartyWizard() {
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1);
  const [basicInfo, setBasicInfo] = useState<StepFormValues | null>(null);

  const handleAdvanceToStep2 = (data: StepFormValues) => {
    setBasicInfo(data);
    setStep(2);
  };

  const handleSuccess = () => {
    navigate('/feed', { replace: true });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          {step === 1 ? 'Detalhes do Evento' : 'Seleção de Recursos'}
        </h2>
        <p className="text-gray-500 mt-2 font-medium">
          Etapa {step} de 2
        </p>
    
      </div>
      
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        {step === 1 && (
          <StepBasicInfo 
            initialData={basicInfo} 
            onNext={handleAdvanceToStep2} 
          />
        )}

        {step === 2 && basicInfo && (
          <StepResourceSelection 
            basicInfo={basicInfo} 
            onBack={() => setStep(1)} 
            onSuccess={handleSuccess} 
          />
        )}
      </div>

    </div>
  );
}