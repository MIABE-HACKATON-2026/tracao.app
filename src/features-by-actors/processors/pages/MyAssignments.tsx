import React from "react";
import { OpTransfoIcon } from "../components/processor-icons";
import { FilterIcon } from "../../../shared/components/icons";
const MyAssignments: React.FC = () => {
    const items = [
        { id: "1", type: "Cacao → Beurre", status: "open" as const, inputs: 3, outputs: 0, date: "20-03-2026" },
        { id: "2", type: "Café → Café moulu", status: "open" as const, inputs: 2, outputs: 1, date: "22-03-2026" },
    ];
    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1"><h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Mes assignations</h1><p className="text-[12px] leading-[16px] text-cocoa-60">Transformations qui vous sont assignées</p></div>
                <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer"><FilterIcon className="h-[18px] w-[18px] fill-white" /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((t) => (
                    <div key={t.id} className="bg-white/50 rounded-[16px] p-4 flex flex-col gap-3 border border-white hover:bg-white hover:shadow-sm transition-all">
                        <div className="flex justify-between items-center">
                            <span className="text-[14px] text-cocoa font-medium">{t.type}</span>
                            <div className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${t.status === 'open' ? 'bg-[#FFF3E0] text-[#FF9800] border border-[#FFE0B2]' : 'bg-[#E8F5E9] text-[#4CAF50] border border-[#C8E6C9]'}`}>
                                {t.status === 'open' ? 'Ouvert' : 'Clôturé'}
                            </div>
                        </div>
                        <div className="flex gap-4 text-[12px] text-cocoa-40"><span>Entrants: {t.inputs} lots</span><span>Sortants: {t.outputs} lots</span></div>
                        <span className="text-[11px] text-cocoa-20">{t.date}</span>
                        <button className="h-[34px] rounded-[8px] bg-cocoa-5 text-[12px] text-cocoa font-medium hover:bg-cocoa-10 transition-colors cursor-pointer">Voir le détail</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default MyAssignments;
