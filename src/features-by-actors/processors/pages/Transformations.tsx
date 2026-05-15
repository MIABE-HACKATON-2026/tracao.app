import React, { useEffect } from "react";
import { OpTransfoIcon } from "../components/processor-icons";
import { FilterIcon } from "../../../shared/components/icons";
import { useProcessorStore } from "../stores/processor.store";

const Transformations: React.FC = () => {
    const { transformations, fetchTransformations, isLoading } = useProcessorStore();
    useEffect(() => { fetchTransformations(); }, []);

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            completed: "bg-green-100 text-green-700",
            locked: "bg-blue-100 text-blue-700",
            pending: "bg-yellow-100 text-yellow-700",
            draft: "bg-gray-100 text-gray-700",
        };
        const labels: Record<string, string> = {
            completed: "Terminée",
            locked: "Verrouillée",
            pending: "En attente",
            draft: "Brouillon",
        };
        return <span className={`text-[10px] px-2 py-0.5 rounded-full ${styles[status] || styles.pending}`}>{labels[status] || status}</span>;
    };

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Transformations</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Gestion des transformations en cours</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer">
                        <FilterIcon className="h-[18px] w-[18px] fill-white" />
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-3 overflow-auto">
                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center text-cocoa-20">Chargement...</div>
                ) : transformations.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-cocoa-20">Aucune transformation</div>
                ) : transformations.map((t, i) => (
                    <div key={i} className="bg-white rounded-[16px] p-4 flex flex-col gap-3 border border-cocoa-5 hover:shadow-sm transition-all">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-[10px] bg-cocoa-5 flex items-center justify-center">
                                    <OpTransfoIcon className="h-5 w-5 text-cocoa-40" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[13px] text-cocoa font-medium font-mono">#{t.id.substring(0, 8)}</span>
                                    <span className="text-[11px] text-cocoa-40">{t.created_at}</span>
                                </div>
                            </div>
                            {getStatusBadge(t.status)}
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-cocoa-5">
                            <div className="flex gap-4">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-cocoa-20 uppercase">Entrées</span>
                                    <span className="text-[12px] text-cocoa font-medium">{t.inputs?.length || 0} lots</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-cocoa-20 uppercase">Sorties</span>
                                    <span className="text-[12px] text-cocoa font-medium">{t.outputs?.length || 0} lots</span>
                                </div>
                            </div>
                            <span className="text-[10px] text-cocoa-20">{new Date(t.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Transformations;