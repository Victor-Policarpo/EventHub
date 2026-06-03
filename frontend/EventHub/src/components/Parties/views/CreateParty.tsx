import { PartyFormWizard } from '../form/PartyFormWizard';
import { useCreateParty } from '../../../hooks';
import type { CreatePartyPayload } from '../../../types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function CreateParty() {
    const navigate = useNavigate();
    const { mutate, isPending } = useCreateParty();

    const handleCreateParty = (payload: CreatePartyPayload) => {
        mutate(payload, {
            onSuccess: () => {
                toast.success('Festa criada com sucesso!');
                navigate('/parties', { replace: true });
            },
            onError: () => {
                toast.error('Erro ao criar a festa.');
            }
        });
    };

    return <PartyFormWizard onSubmit={handleCreateParty} isSubmitting={isPending} />;
}