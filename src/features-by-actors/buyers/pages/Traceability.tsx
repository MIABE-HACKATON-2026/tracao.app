import React from "react";
import { BuyerBlockchainIcon } from "../components/buyer-icons";
import { FilterIcon, CheckIcon } from "../../../shared/components/icons";
import { ApiClient } from "../../../shared/api/api-client";
import { formatDate } from "../../../shared/utils/formatters";

interface TraceLog {
    id: string;
    action_type: string;
    actor_name: string;
    details: string;
    timestamp: string;
}

const Traceability: React.FC = () => {
    const [selectedBatch, setSelectedBatch] = React.useState<string>("TRC-2026-0001");
    const [logs, setLogs] = React.useState<TraceLog[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const fetchTraceability = async (code: string) => {
        setIsLoading(true);
        try {
            // Utiliser le bon endpoint pour récupérer la traçabilité d'un lot
            const data = await ApiClient.get<TraceLog[]>(`/batches/${code}/logs/`);
            setLogs(data);
        } catch (error) {
            console.error("Erreur traçabilité", error);
            // Fallback mock labels si l'API échoue en dev
            setLogs([]);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchTraceability(selectedBatch);
    }, [selectedBatch]);

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Traçabilité</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Chaîne complète de traçabilité d'un lot</p>
                </div>
                <div className="flex gap-2">
                    <input 
                        type="text"
                        placeholder="Code du lot (ex: TRC-...)"
                        className="h-[34px] px-3 rounded-[8px] bg-cocoa-5 text-[12px] text-cocoa outline-none border border-transparent focus:border-cocoa-20 transition-all"
                        value={selectedBatch}
                        onChange={(e) => setSelectedBatch(e.target.value)}
                    />
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                        <FilterIcon className="h-[18px] w-[18px] fill-white" />
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-6 overflow-y-auto">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center gap-2 mb-8">
                        <BuyerBlockchainIcon className="h-5 w-5 fill-[#4CAF50]" />
                        <span className="text-[14px] text-cocoa font-mono font-medium">{selectedBatch}</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#E8F5E9] border border-[#C8E6C9] text-[10px] text-[#4CAF50] font-medium">Ancrage Verified</span>
                    </div>

                    <div className="relative">
                        {isLoading ? (
                            <div className="p-10 text-center text-cocoa-40 text-[12px]">Chargement des étapes...</div>
                        ) : logs.length === 0 ? (
                            <div className="p-10 text-center text-cocoa-40 text-[12px]">Entrez un code de lot valide pour voir son historique.</div>
                        ) : (
                            logs.map((step, i) => (
                                <div key={step.id} className="flex gap-5 pb-8 relative">
                                    {i < logs.length - 1 && <div className="absolute left-4 top-10 bottom-0 w-px bg-cocoa-10"></div>}
                                    <div className="h-8 w-8 rounded-full bg-cocoa flex items-center justify-center flex-shrink-0 z-10">
                                        <CheckIcon className="h-4 w-4 fill-white" />
                                    </div>
                                    <div className="flex-1 bg-white rounded-[12px] p-4 border border-cocoa-5 hover:shadow-sm transition-shadow">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <span className="text-[14px] text-cocoa font-medium capitalize">{step.action_type.replace('_', ' ')}</span>
                                                <div className="text-[12px] text-cocoa-40 mt-0.5 font-medium">{step.actor_name}</div>
                                            </div>
                                            <span className="text-[11px] text-cocoa-20">{formatDate(step.timestamp)}</span>
                                        </div>
                                        <div className="text-[12px] text-cocoa-60 mt-2 leading-relaxed">{step.details}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {!isLoading && logs.length > 0 && (
                        <div className="bg-white rounded-[12px] p-4 flex items-center justify-between border border-cocoa-5 mt-4">
                            <div className="flex items-center gap-3">
                                <BuyerBlockchainIcon className="h-6 w-6 fill-cocoa-40" />
                                <span className="text-[13px] text-cocoa font-medium">Vérification d'intégrité SHA-256</span>
                            </div>
                            <button className="px-4 py-2 rounded-[8px] bg-cocoa-5 text-[12px] text-cocoa font-medium hover:bg-cocoa-10 transition-colors cursor-pointer">
                                Vérifier l'ancrage
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Traceability;
