import React from "react";
import { FarmersHarvestIcon, AddIcon, ArrowDownIcon, FilterIcon, SearchIcon, CalendarIcon } from "../../../shared/components/icons";
import Modal from "../../../shared/components/atoms/Modal";

interface Harvest {
    id: string;
    batchCode: string;
    crop: string;
    quantity: number;
    date: string;
    recordedAt: string;
}

const FarmersHarvests: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const harvests: Harvest[] = [
        { id: "1", batchCode: "TRC-2026-0001", crop: "Cacao", quantity: 250, date: "10-03-2026", recordedAt: "10-03-2026" },
        { id: "2", batchCode: "TRC-2026-0001", crop: "Cacao", quantity: 180, date: "08-03-2026", recordedAt: "09-03-2026" },
        { id: "3", batchCode: "TRC-2026-0002", crop: "Café", quantity: 120, date: "05-03-2026", recordedAt: "06-03-2026" },
    ];

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Gestion des récoltes</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Enregistrez vos récoltes par lot</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer hover:bg-cocoa-10 transition-colors">
                        <SearchIcon className="h-[18px] w-[18px] fill-cocoa-80 rotate-y-180" />
                    </div>
                    <div className="h-[34px] bg-cocoa-5 rounded-[8px] flex items-center overflow-hidden cursor-pointer hover:bg-cocoa-10 transition-colors" onClick={() => setIsModalOpen(true)}>
                        <div className="flex items-center px-4 gap-2 h-full">
                            <AddIcon className="h-[18px] w-[18px] fill-cocoa-80" />
                            <span className="text-[12px] text-cocoa-80">Nouvelle récolte</span>
                        </div>
                        <div className="h-[34px] w-[34px] border-l border-l-[0.4px] border-l-cocoa-20 flex items-center justify-center">
                            <ArrowDownIcon className="h-[18px] w-[18px] fill-cocoa-80" />
                        </div>
                    </div>
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                        <FilterIcon className="h-[18px] w-[18px] fill-white" />
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-4 overflow-hidden flex flex-col">
                <div className="w-full bg-[#E5E1DE] rounded-t-[12px] flex items-center h-[44px] px-6">
                    <div className="flex-1 text-[11px] font-medium text-cocoa-60">Lot</div>
                    <div className="flex-1 text-[11px] font-medium text-cocoa-60">Culture</div>
                    <div className="flex-1 text-[11px] font-medium text-cocoa-60">Quantité</div>
                    <div className="flex-1 text-[11px] font-medium text-cocoa-60">Date récolte</div>
                    <div className="flex-1 text-[11px] font-medium text-cocoa-60">Enregistrée le</div>
                </div>

                <div className="flex-1 overflow-y-auto flex flex-col gap-1 mt-1.5">
                    {harvests.map((h) => (
                        <div key={h.id} className="h-[48px] bg-white/40 rounded-[8px] flex items-center px-6 hover:bg-white/60 transition-colors border border-white/20">
                            <div className="flex-1 text-[12px] text-cocoa font-mono">{h.batchCode}</div>
                            <div className="flex-1 text-[12px] text-cocoa-40 capitalize">{h.crop}</div>
                            <div className="flex-1 text-[12px] text-cocoa font-medium">{h.quantity} Kg</div>
                            <div className="flex-1 text-[12px] text-cocoa-40">{h.date}</div>
                            <div className="flex-1 text-[12px] text-cocoa-40">{h.recordedAt}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Barre cumulative */}
            <div className="bg-white rounded-[16px] p-4 flex items-center gap-6 border border-cocoa-5">
                <FarmersHarvestIcon className="h-8 w-8 fill-cocoa-40" />
                <div className="flex-1 flex flex-col gap-1">
                    <div className="flex justify-between text-[12px]">
                        <span className="text-cocoa font-medium">Total récolté</span>
                        <span className="text-cocoa font-medium">550 Kg / 800 Kg estimés</span>
                    </div>
                    <div className="h-2 rounded-full bg-cocoa-5 overflow-hidden">
                        <div className="h-full w-[68%] rounded-full bg-cocoa"></div>
                    </div>
                </div>
                <span className="text-[11px] text-cocoa-40">68%</span>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-8 flex flex-col gap-6">
                    <h2 className="text-[20px] font-medium text-cocoa">Enregistrer une récolte</h2>
                    <div className="flex flex-col gap-4">
                        <div className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 flex items-center justify-between cursor-pointer border border-transparent hover:border-cocoa-10 transition-all">
                            <span className="text-[14px] text-cocoa-40">Sélectionner un lot</span>
                            <ArrowDownIcon className="h-4 w-4 fill-cocoa-40" />
                        </div>
                        <input type="text" placeholder="Quantité récoltée (Kg)" className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none focus:ring-1 focus:ring-cocoa-20 placeholder:text-cocoa-40" />
                        <div className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 flex items-center justify-between cursor-pointer border border-transparent hover:border-cocoa-10 transition-all">
                            <span className="text-[14px] text-cocoa-40">Date de récolte</span>
                            <CalendarIcon className="h-4 w-4 text-cocoa-40" />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button onClick={() => setIsModalOpen(false)} className="h-[48px] px-8 rounded-full bg-cocoa-5 text-cocoa text-[14px] font-medium hover:bg-cocoa-10">Annuler</button>
                        <button className="h-[48px] px-8 rounded-full bg-black text-white text-[14px] font-medium hover:opacity-90">Enregistrer</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default FarmersHarvests;
