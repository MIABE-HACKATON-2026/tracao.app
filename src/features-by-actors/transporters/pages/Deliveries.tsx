import React from "react";
import { OpDeliveryIcon, OpMapIcon } from "../components/transporter-icons";
import { FilterIcon, SearchIcon } from "../../../shared/components/icons";
import Modal from "../../../shared/components/atoms/Modal";
import { useTransporterTransportsStore } from "../stores/transporter-stores";
import type { Transport } from "../../stores/types/transport";

const Deliveries: React.FC = () => {
    const { deliveries, isLoading, error, fetchDeliveries } = useTransporterTransportsStore();
    const [selected, setSelected] = React.useState<Transport | null>(null);

    React.useEffect(() => { fetchDeliveries(); }, [fetchDeliveries]);

    const sStyles: Record<string, string> = {
        pending: "bg-cocoa-10 text-cocoa-60 border-cocoa-10",
        in_progress: "bg-[#E3F2FD] text-[#2196F3] border-[#BBDEFB]",
        completed: "bg-[#E8F5E9] text-[#4CAF50] border-[#C8E6C9]",
    };
    const sLabels: Record<string, string> = { pending: "En attente", in_progress: "En cours", completed: "Livré" };

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Mes transports</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Livraisons assignées</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer"><SearchIcon className="h-[18px] w-[18px] fill-cocoa-80 rotate-y-180" /></div>
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer"><FilterIcon className="h-[18px] w-[18px] fill-white" /></div>
                </div>
            </div>
            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-4 overflow-y-auto flex flex-col gap-3">
                {isLoading ? (
                    <div className="flex items-center justify-center h-40 text-cocoa-40 text-[12px]">Chargement...</div>
                ) : error ? (
                    <div className="flex items-center justify-center h-40 text-red-500 text-[12px]">{error}</div>
                ) : (
                    deliveries.map((d) => (
                        <div key={d.id} className="bg-white rounded-[12px] p-4 flex flex-col gap-3 border border-cocoa-5 hover:bg-cocoa-5 cursor-pointer transition-colors" onClick={() => setSelected(d)}>
                            <div className="flex justify-between items-center">
                                <span className="text-[13px] text-cocoa font-mono font-medium">{d.batch_details?.unique_code || d.batch}</span>
                                <div className={`inline-flex items-center px-2 py-0.5 rounded-[6px] text-[10px] font-medium border ${sStyles[d.status] || ''}`}>{sLabels[d.status]}</div>
                            </div>
                            <div className="text-[12px] text-cocoa-40">{d.from_location} → {d.to_location}</div>
                            <div className="flex justify-between text-[11px] text-cocoa-20">
                                <span>{d.departure_date ? new Date(d.departure_date).toLocaleDateString("fr-FR") : "—"}</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex-1 h-[34px] rounded-[8px] bg-cocoa-5 text-[12px] text-cocoa font-medium hover:bg-cocoa-10 cursor-pointer">Confirmer départ</button>
                                <button className="h-[34px] w-[34px] rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer"><OpMapIcon className="h-4 w-4 text-cocoa-40" /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
                <div className="p-8 flex flex-col gap-6">
                    <h2 className="text-[20px] font-medium text-cocoa">Détails livraison</h2>
                    {[{ label: "Lot", value: selected?.batch_details?.unique_code || selected?.batch }, { label: "Départ", value: selected?.from_location }, { label: "Arrivée", value: selected?.to_location }].map((f, i) => (
                        <div key={i} className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 flex items-center justify-between"><span className="text-[14px] text-cocoa-40">{f.label}</span><span className="text-[14px] text-cocoa font-medium">{f.value}</span></div>
                    ))}
                    <button onClick={() => setSelected(null)} className="self-end h-[48px] px-8 rounded-full bg-cocoa-5 text-cocoa text-[14px] font-medium hover:bg-cocoa-10 cursor-pointer">Fermer</button>
                </div>
            </Modal>
        </div>
    );
};
export default Deliveries;
