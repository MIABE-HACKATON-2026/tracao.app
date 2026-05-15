import React from "react";
import { OpHistoryIcon } from "../components/transporter-icons";
import { FilterIcon, SearchIcon } from "../../../shared/components/icons";
const DeliveryHistory: React.FC = () => {
    const items = [
        { batchCode: "TRC-2026-0001", from: "Abengourou", to: "Abidjan", date: "10-03-2026", status: "completed" as const },
        { batchCode: "TRC-2026-0004", from: "Daloa", to: "San Pedro", date: "05-03-2026", status: "completed" as const },
    ];
    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Historique</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Livraisons terminées</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer"><SearchIcon className="h-[18px] w-[18px] fill-cocoa-80 rotate-y-180" /></div>
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer"><FilterIcon className="h-[18px] w-[18px] fill-white" /></div>
                </div>
            </div>
            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-4 overflow-hidden flex flex-col">
                <div className="w-full bg-[#E5E1DE] rounded-t-[12px] flex items-center h-[44px] px-6">
                    <div className="w-[25%] text-[11px] font-medium text-cocoa-60">Lot</div>
                    <div className="w-[25%] text-[11px] font-medium text-cocoa-60">Trajet</div>
                    <div className="w-[20%] text-[11px] font-medium text-cocoa-60">Date</div>
                    <div className="w-[30%] text-[11px] font-medium text-cocoa-60">Statut</div>
                </div>
                <div className="flex-1 overflow-y-auto flex flex-col gap-1 mt-1.5">
                    {items.map((d, i) => (
                        <div key={i} className="h-[48px] bg-white/40 rounded-[8px] flex items-center px-6 hover:bg-white/60 border border-white/20">
                            <div className="w-[25%] text-[12px] text-cocoa font-mono">{d.batchCode}</div>
                            <div className="w-[25%] text-[12px] text-cocoa-40">{d.from} → {d.to}</div>
                            <div className="w-[20%] text-[12px] text-cocoa-40">{d.date}</div>
                            <div className="w-[30%]"><div className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#E8F5E9] border border-[#C8E6C9] text-[10px] text-[#4CAF50] font-medium">Livré</div></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default DeliveryHistory;
