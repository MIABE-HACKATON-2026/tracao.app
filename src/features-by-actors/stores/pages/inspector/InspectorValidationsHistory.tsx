import React from "react";
import { StoreHistoryIcon, StoreValidationIcon } from "../../stores/stores-icons";
import { FilterIcon, SearchIcon, CheckIcon, CloseIcon } from "../../../../shared/components/icons";

const InspectorValidationsHistory: React.FC = () => {
    const items = [
        { id: "1", type: "parcel" as const, entity: "Parcelle A", farmer: "Kouamé Paul", action: "approved" as const, comment: "Conforme après inspection", date: "10-03-2026" },
        { id: "2", type: "batch" as const, entity: "TRC-2026-0001", farmer: "Konan Jules", action: "approved" as const, comment: "Quantité vérifiée sur place", date: "09-03-2026" },
        { id: "3", type: "parcel" as const, entity: "Parcelle B", farmer: "N'Guessan Alice", action: "rejected" as const, comment: "Limites parcelles non conformes", date: "08-03-2026" },
    ];

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Mes validations</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Historique de vos inspections</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer">
                        <SearchIcon className="h-[18px] w-[18px] fill-cocoa-80 rotate-y-180" />
                    </div>
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer">
                        <FilterIcon className="h-[18px] w-[18px] fill-white" />
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-4 overflow-hidden flex flex-col">
                <div className="w-full bg-[#E5E1DE] rounded-t-[12px] flex items-center h-[44px] px-6">
                    <div className="w-[14%] text-[11px] font-medium text-cocoa-60">Type</div>
                    <div className="w-[22%] text-[11px] font-medium text-cocoa-60">Entité</div>
                    <div className="w-[20%] text-[11px] font-medium text-cocoa-60">Agriculteur</div>
                    <div className="w-[12%] text-[11px] font-medium text-cocoa-60">Action</div>
                    <div className="w-[22%] text-[11px] font-medium text-cocoa-60">Commentaire</div>
                    <div className="w-[10%] text-[11px] font-medium text-cocoa-60">Date</div>
                </div>
                <div className="flex-1 overflow-y-auto flex flex-col gap-1 mt-1.5">
                    {items.map((h) => (
                        <div key={h.id} className="h-[48px] bg-white/40 rounded-[8px] flex items-center px-6 hover:bg-white/60 transition-colors border border-white/20">
                            <div className="w-[14%]">
                                <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${h.type === 'parcel' ? 'bg-[#E3F2FD] text-[#2196F3] border border-[#BBDEFB]' : 'bg-[#F1F8E9] text-[#8BC34A] border border-[#DCEDC8]'}`}>
                                    {h.type === 'parcel' ? 'Parcelle' : 'Lot'}
                                </div>
                            </div>
                            <div className="w-[22%] text-[12px] text-cocoa font-medium">{h.entity}</div>
                            <div className="w-[20%] text-[12px] text-cocoa-40">{h.farmer}</div>
                            <div className="w-[12%]">
                                <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${h.action === 'approved' ? 'bg-[#E8F5E9] text-[#4CAF50] border border-[#C8E6C9]' : 'bg-[#FFEBEE] text-[#F44336] border border-[#FFCDD2]'}`}>
                                    {h.action === 'approved' ? <CheckIcon className="h-3 w-3" /> : <CloseIcon className="h-3 w-3" />}
                                    {h.action === 'approved' ? 'Approuvé' : 'Rejeté'}
                                </div>
                            </div>
                            <div className="w-[22%] text-[11px] text-cocoa-20 italic">{h.comment}</div>
                            <div className="w-[10%] text-[11px] text-cocoa-40">{h.date}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InspectorValidationsHistory;
