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
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl rounded-t-2xl sm:rounded-2xl max-h-[90vh] sm:max-h-[80vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col transform transition-all animate-slide-up sm:animate-scale-in">
                
                <div className="flex flex-col p-5 border-b border-slate-100 shrink-0 relative">
                    <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-3 sm:hidden" />
                    
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Histórico de Alterações</h2>
                            <p className="text-xs text-slate-500 mt-0.5">Auditoria e transições da festa</p>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-white custom-scrollbar">
                    <PartyTimeline partyId={partyId} />
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0">
                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto text-center px-6 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-medium text-sm rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
                    >
                        Fechar Histórico
                    </button>
                </div>

            </div>
        </div>
    );
};