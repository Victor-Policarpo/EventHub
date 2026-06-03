import { useNavigate } from 'react-router-dom';
import { PartyFormWizard } from '../form/PartyFormWizard';
import { useGetParty, useUpdateParty } from '../../../hooks';
import toast from 'react-hot-toast';
import { ErrorState, Loading } from '../../Ui';

interface EditPartyProps {
    partyId: number;
}

export function EditParty({ partyId }: EditPartyProps) {
    const navigate = useNavigate();
    const { mutate, isPending } = useUpdateParty();
    const { data: party, isLoading, isError } = useGetParty(partyId);

    if (isLoading) return <div className="py-12 flex justify-center"><Loading /></div>;
    if (isError || !party) return <ErrorState message="Erro ao carregar dados do evento" />;

    const initialEmployeesArray = party.employees?.map((e: any) => Number(e.employeeId || e.id)) || [];
    const initialToysMap = party.partyToys?.reduce((acc: Record<number, number>, current: any) => {
        acc[Number(current.toyId || current.id)] = Number(current.quantity);
        return acc;
    }, {}) || {};

    const initialBasicInfo = {
        name: party.name || '',
        telephone: party.telephone || '',
        address: party.address || '',
        startDateHours: party.startDateHours || '',
        endDateHours: party.endDateHours || '',
        value: party.value ? String(party.value) : '',
    };

    const isPastEvent = new Date(party.endDateHours) < new Date();

    return (
        <PartyFormWizard 
            initialBasicInfo={initialBasicInfo}
            initialToys={initialToysMap}
            initialEmployees={initialEmployeesArray}
            isPastEvent={isPastEvent}
            partyId={partyId}
            onSubmit={(payload) => mutate(
                { id: partyId, data: payload }, 
                { 
                    onSuccess: () => {
                        toast.success('Festa atualizada com sucesso!');
                        navigate('/parties', { replace: true });
                    }, 
                    onError: () => {
                        toast.error('Erro ao atualizar a festa.');
                    }
                }
            )}
            isSubmitting={isPending}
        />
    );
}