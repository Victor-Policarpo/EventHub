import { type PartyDetails } from '../../../types';
import { Button } from '../../../components';
import { usePartyActions } from '../../../hooks';
import { partyActionsConfig } from '../../../utils/partyActionsConfig';

interface PartyActionButtonsProps {
  party: PartyDetails;
}

export function PartyActionButtons({ party }: PartyActionButtonsProps) {
  const { executeAction, isPending } = usePartyActions(party.partyId);
  const visibleActions = partyActionsConfig.filter((config) => config.isVisible(party));
  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case 'primary': return 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm';
      case 'success': return 'bg-green-600 hover:bg-green-700 text-white shadow-sm';
      case 'warning': return 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-sm';
      case 'danger': return 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (visibleActions.length === 0) return null;

  return (
      <div className="flex flex-wrap gap-2">
        {visibleActions.map((action) => (
          <Button
            key={action.id}
            onClick={() => executeAction(action.id)}
            disabled={isPending}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${getThemeClasses(action.theme)}`}
          >
            {isPending ? 'Processando...' : action.label}
          </Button>
        ))}
      </div>
  );
}