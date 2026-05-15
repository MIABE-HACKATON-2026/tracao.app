import React from "react";
import { BuyerTransfoIcon } from "../components/buyer-icons";
import { FilterIcon, SearchIcon, CheckIcon } from "../../../shared/components/icons";
import Modal from "../../../shared/components/atoms/Modal";

interface Transfo {
    id: string; type: string; status: 'open' | 'locked'; inputs: number; outputs: number; date: string;
}

const Transformations: React.FC = () => {
    const [selected, setSelected] = React.useState<Transfo | null>(null);
    const items: Transfo[] = [
        { id: "1", type: "Cacao → Beurre", status: "locked", inputs: 3, outputs: 2, date: "20-03-2026" },
        { id: "2", type: "Café → Café moulu", status: "open", inputs: 2, outputs: 1, date: "22-03-2026" },
    ];

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Transformations</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Suivi des transformations associées</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer"><SearchIcon className="h-[18px] w-[18px] fill-cocoa-80 rotate-y-180" /></div>
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer"><FilterIcon className="h-[18px] w-[18px] fill-white" /></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((t) => (
                    <div key={t.id} className="bg-white/50 rounded-[16px] p-4 flex flex-col gap-3 border border-white hover:bg-white hover:shadow-sm transition-all cursor-pointer" onClick={() => setSelected(t)}>
                        <div className="flex justify-between items-center">
                            <span className="text-[14px] text-cocoa font-medium">{t.type}</span>
                            <div className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${t.status === 'locked' ? 'bg-[#E8F5E9] text-[#4CAF50] border border-[#C8E6C9]' : 'bg-[#FFF3E0] text-[#FF9800] border border-[#FFE0B2]'}`}>
                                {t.status === 'locked' ? 'Clôturé' : 'Ouvert'}
                            </div>
                        </div>
                        <div className="flex gap-4 text-[12px] text-cocoa-40">
                            <span>Entrants: {t.inputs} lots</span>
                            <span>Sortants: {t.outputs} lots</span>
                        </div>
                        <span className="text-[11px] text-cocoa-20">{t.date}</span>
                    </div>
                ))}
            </div>

            <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
                <div className="p-8 flex flex-col gap-6">
                    <h2 className="text-[20px] font-medium text-cocoa">Détails transformation</h2>
                    <div className="flex flex-col gap-3">
                        {[{ label: "Type", value: selected?.type }, { label: "Statut", value: selected?.status === 'locked' ? 'Clôturé' : 'Ouvert' }, { label: "Lots entrants", value: selected?.inputs }, { label: "Lots sortants", value: selected?.outputs }].map((f, i) => (
                            <div key={i} className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 flex items-center justify-between">
                                <span className="text-[14px] text-cocoa-40">{f.label}</span>
                                <span className="text-[14px] text-cocoa font-medium">{f.value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end mt-4">
                        <button onClick={() => setSelected(null)} className="h-[48px] px-8 rounded-full bg-cocoa-5 text-cocoa text-[14px] font-medium hover:bg-cocoa-10">Fermer</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Transformations;
