import React from "react";
import { OpInputIcon, OpOutputIcon } from "../components/processor-icons";
import { FilterIcon } from "../../../shared/components/icons";
const TransfoLots: React.FC<{ mode: 'inputs' | 'outputs' }> = ({ mode }) => {
    const items = mode === 'inputs'
        ? [{ code: "TRC-2026-0001", crop: "Cacao", qty: 500, farmer: "Kouamé Paul" }, { code: "TRC-2026-0002", crop: "Cacao", qty: 300, farmer: "Konan Jules" }]
        : [{ code: "TRC-2026-OUT1", crop: "Beurre cacao", qty: 400, farmer: "Transfo SARL" }];
    const title = mode === 'inputs' ? "Lots en entrée" : "Lots en sortie";
    const desc = mode === 'inputs' ? "Matière première à transformer" : "Produits transformés générés";
    const Icon = mode === 'inputs' ? OpInputIcon : OpOutputIcon;

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1"><h1 className="text-[16px] leading-[16px] font-normal text-cocoa">{title}</h1><p className="text-[12px] leading-[16px] text-cocoa-60">{desc}</p></div>
                <div className="flex gap-2"><div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer"><FilterIcon className="h-[18px] w-[18px] fill-white" /></div></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item, i) => (
                    <div key={i} className="bg-white/50 rounded-[16px] p-4 flex items-center gap-3 border border-white hover:bg-white hover:shadow-sm transition-all">
                        <Icon className="h-8 w-8 fill-cocoa-20 flex-shrink-0" />
                        <div className="flex-1 flex flex-col gap-0.5">
                            <span className="text-[13px] text-cocoa font-mono font-medium">{item.code}</span>
                            <span className="text-[11px] text-cocoa-40">{item.crop} · {item.qty} Kg</span>
                            <span className="text-[10px] text-cocoa-20">{item.farmer}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export const InputLots: React.FC = () => <TransfoLots mode="inputs" />;
export const OutputLots: React.FC = () => <TransfoLots mode="outputs" />;
