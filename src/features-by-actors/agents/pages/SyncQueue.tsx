import React from "react";
import { CheckIcon, CloseIcon } from "../../../shared/components/icons";
import { useAgentSyncStore } from "../stores/agent-stores";

const SyncQueue: React.FC = () => {
    const { items, isLoading, fetchSync } = useAgentSyncStore();

    React.useEffect(() => {
        fetchSync();
    }, [fetchSync]);

    const statusMap = {
        synced: { bg: "bg-[#E8F5E9]", text: "text-[#4CAF50]", label: "Synchronisé", icon: CheckIcon },
        pending: { bg: "bg-[#FFF3E0]", text: "text-[#FF9800]", label: "En attente", icon: null },
        conflict: { bg: "bg-[#FFEBEE]", text: "text-[#F44336]", label: "Conflit", icon: CloseIcon },
        failed: { bg: "bg-[#FFEBEE]", text: "text-[#F44336]", label: "Échec", icon: CloseIcon },
    };

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Synchronisation</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">File d'attente offline (Données terrain)</p>
                </div>
                <button 
                    onClick={() => fetchSync()}
                    className="h-[34px] px-4 rounded-[8px] bg-cocoa text-white text-[12px] font-medium hover:opacity-90 cursor-pointer transition-opacity"
                >
                    {isLoading ? "Rafraîchissement..." : "Synchroniser tout"}
                </button>
            </div>

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-4 overflow-hidden flex flex-col">
                <div className="w-full bg-[#E5E1DE] rounded-t-[12px] flex items-center h-[44px] px-6">
                    <div className="flex-[2] text-[11px] font-medium text-cocoa-60">Action</div>
                    <div className="flex-1 text-[11px] font-medium text-cocoa-60">Statut</div>
                    <div className="flex-[2] text-[11px] font-medium text-cocoa-60">Créé localement</div>
                    <div className="flex-1 text-[11px] font-medium text-cocoa-60">Détails</div>
                </div>
                
                <div className="flex-1 overflow-y-auto flex flex-col gap-1 mt-1.5">
                    {isLoading && items.length === 0 ? (
                        <div className="p-10 text-center text-cocoa-40 text-[12px]">Chargement de la file d'attente...</div>
                    ) : items.length === 0 ? (
                        <div className="p-10 text-center text-cocoa-40 text-[12px]">Aucune donnée en attente de synchronisation.</div>
                    ) : (
                        items.map((item) => {
                            const s = statusMap[item.status] || statusMap.pending;
                            return (
                                <div key={item.id} className="h-[48px] bg-white/40 rounded-[8px] flex items-center px-6 hover:bg-white/60 border border-white/20">
                                    <div className="flex-[2] text-[12px] text-cocoa font-medium">{item.action_type.replace('_', ' ')}</div>
                                    <div className="flex-1">
                                        <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${s.bg} text-[10px] font-medium ${s.text}`}>
                                            {s.label}
                                        </div>
                                    </div>
                                    <div className="flex-[2] text-[11px] text-cocoa-40">
                                        {new Date(item.created_locally_at).toLocaleString('fr-FR')}
                                    </div>
                                    <div className="flex-1 text-[11px] text-cocoa-40 italic cursor-pointer hover:text-cocoa">
                                        Voir payload
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default SyncQueue;
