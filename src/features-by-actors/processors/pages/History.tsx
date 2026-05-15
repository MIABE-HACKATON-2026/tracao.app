import React from "react";
import { OpHistoryIcon, OpTraceIcon } from "../components/processor-icons";
import { FilterIcon } from "../../../shared/components/icons";
const TransfoHistory: React.FC = () => (
    <div className="w-full h-full flex flex-col gap-5">
        <div className="flex justify-between items-center">
            <div className="flex flex-col items-start gap-1"><h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Historique transformations</h1><p className="text-[12px] leading-[16px] text-cocoa-60">Transformations clôturées</p></div>
            <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer"><FilterIcon className="h-[18px] w-[18px] fill-white" /></div>
        </div>
        <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-4 flex flex-col gap-3">
            {[{ type: "Cacao → Beurre", date: "20-03-2026", ratio: "3 entrées / 2 sorties" }, { type: "Café → Café moulu", date: "15-03-2026", ratio: "2 entrées / 1 sortie" }].map((h, i) => (
                <div key={i} className="bg-white rounded-[12px] p-4 flex items-center justify-between border border-white/50">
                    <div className="flex flex-col gap-0.5"><span className="text-[13px] text-cocoa font-medium">{h.type}</span><span className="text-[11px] text-cocoa-40">{h.ratio}</span></div>
                    <span className="text-[11px] text-cocoa-20">{h.date}</span>
                </div>
            ))}
        </div>
    </div>
);
export default TransfoHistory;

export const ProcessorTrace: React.FC = () => (
    <div className="w-full h-full flex flex-col gap-5">
        <div className="flex justify-between items-center">
            <div className="flex flex-col items-start gap-1"><h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Traçabilité transformation</h1><p className="text-[12px] leading-[16px] text-cocoa-60">Chaîne avant/après transformation</p></div>
        </div>
        <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-6 flex flex-col items-center justify-center gap-4">
            <OpTraceIcon className="h-16 w-16 text-cocoa-20" />
            <span className="text-[14px] text-cocoa-40">Sélectionnez une transformation pour voir sa traçabilité</span>
        </div>
    </div>
);
