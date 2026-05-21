import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { PartyFormWizard } from '../form/PartyFormWizard';
import { createParty } from '../../../services';
import toast from 'react-hot-toast';

export function CreateParty() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: createParty,
    onSuccess: () => {
        navigate('/feed', { replace: true });
        toast.success('Festa criada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao criar festa. Tente novamente.');
    }
  });

  return (
    <div className="w-full max-w-4xl mx-auto">
      <PartyFormWizard onSubmit={mutate} isSubmitting={isPending} />
    </div>
  );
}