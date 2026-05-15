import React from "react";
import { BuyerTransportIcon } from "../components/buyer-icons";
import { AddIcon, FilterIcon, SearchIcon, ArrowDownIcon } from "../../../shared/components/icons";
import Modal from "../../../shared/components/atoms/Modal";

interface TransportItem {
    id: string; batchCode: string; from: string; to: string; transporter: string;
    status: 'pending' | 'in_progress' | 'completed'; date: string;
}

const TransportManagement: React.FC = () => {
    const [selected, setSelected] = React.useState<TransportItem | null>(null);

    const transports: TransportItem[] = [
        { id: "1", batchCode: "TRC-2026-0001", from: "Abengourou", to: "Abidjan", transporter: "+225 01 02 03 04", status: "in_progress", date: "15-03-2026" },
        { id: "2", batchCode: "TRC-2026-0002", from: "Daloa", to: "San Pedro", transporter: "+225 05 06 07 08", status: "pending", date: "18-03-2026" },
    ];

    const sStyles = {
        pending: { bg: "bg-[#FFF3E0]", text: "text-[#FF9800]", border: "border-[#FFE0B2]", label: "En attente" },
        in_progress: { bg: "bg-[#E3F2FD]", text: "text-[#2196F3]", border: "border-[#BBDEFB]", label: "En cours" },
        completed: { bg: "bg-[#E8F5E9]", text: "text-[#4CAF50]", border: "border-[#C8E6C9]", label: "Livré" },
    };

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Gestion Transport</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Suivez et gérez vos transports</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer"><SearchIcon className="h-[18px] w-[18px] fill-cocoa-80 rotate-y-180" /></div>
                    <div className="h-[34px] bg-cocoa-5 rounded-[8px] flex items-center overflow-hidden cursor-pointer hover:bg-cocoa-10">
                        <div className="flex items-center px-4 gap-2 h-full">
                            <AddIcon className="h-[18px] w-[18px] fill-cocoa-80" />
                            <span className="text-[12px] text-cocoa-80">Créer</span>
                        </div>
                        <div className="h-[34px] w-[34px] border-l border-l-cocoa-20 flex items-center justify-center"><ArrowDownIcon className="h-[18px] w-[18px] fill-cocoa-80" /></div>
                    </div>
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer"><FilterIcon className="h-[18px] w-[18px] fill-white" /></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {transports.map((t) => {
                    const s = sStyles[t.status];
                    return (
                        <div key={t.id} className="bg-white/50 rounded-[16px] p-4 flex flex-col gap-3 border border-white hover:bg-white hover:shadow-sm transition-all cursor-pointer" onClick={() => setSelected(t)}>
                            <div className="flex justify-between items-center">
                                <span className="text-[13px] text-cocoa font-mono font-medium">{t.batchCode}</span>
                                <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${s.bg} border ${s.border}`}>
                                    <span className={`text-[10px] font-medium ${s.text}`}>{s.label}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-[12px] text-cocoa-40">
                                <span>{t.from} → {t.to}</span>
                            </div>
                            <div className="flex justify-between text-[11px] text-cocoa-20">
                                <span>Transporteur : {t.transporter}</span>
                                <span>{t.date}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
                <div className="p-8 flex flex-col gap-6">
                    <h2 className="text-[20px] font-medium text-cocoa">Détails du transport</h2>
                    <div className="flex flex-col gap-3">
                        {[ 
                            { label: "Lot", value: selected?.batchCode },
                            { label: "Départ", value: selected?.from },
                            { label: "Arrivée", value: selected?.to },
                            { label: "Transporteur", value: selected?.transporter },
                            { label: "Date", value: selected?.date },
                        ].map((f, i) => (
                            <div key={i} className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 flex items-center justify-between">
                                <span className="text-[14px] text-cocoa-40">{f.label}</span>
                                <span className="text-[14px] text-cocoa font-medium">{f.value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button onClick={() => setSelected(null)} className="h-[48px] px-8 rounded-full bg-cocoa-5 text-cocoa text-[14px] font-medium hover:bg-cocoa-10">Fermer</button>
                        <button className="h-[48px] px-8 rounded-full bg-cocoa text-white text-[14px] font-medium hover:opacity-90">Confirmer réception</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default TransportManagement;
