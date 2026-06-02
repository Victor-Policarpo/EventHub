import React from 'react';
import { X } from 'lucide-react';
import { PartyTimeline } from './PartyTimeline';

interface PartyTimelineModalProps {
  partyId: number;
  isOpen: boolean;
  onClose: () => void;
}

export const PartyTimelineModal: React.FC<PartyTimelineModalProps> = ({ partyId, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full sm:w-[90vw] lg:w-200 xl:w-225 rounded-t-2xl sm:rounded-2xl max-h-[90vh] sm:max-h-[80vh] overflow-hidden shadow-2xl border border-zinc-100 flex flex-col transform transition-all animate-slide-up sm:animate-scale-in">
        
        <div className="flex flex-col p-5 border-b border-zinc-100 shrink-0 relative">
          <div className="w-12 h-1 bg-zinc-300 rounded-full mx-auto mb-3 sm:hidden" />
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-zinc-900">Histórico de Alterações</h2>
              <p className="text-xs text-zinc-500 mt-0.5">Auditoria e transições da festa</p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-white">
          <PartyTimeline partyId={partyId} />
        </div>

        <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto text-center px-5 py-3 sm:py-2 bg-white border border-zinc-200 hover:bg-zinc-100 text-zinc-700 font-medium text-sm rounded-xl transition-colors shadow-sm"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};