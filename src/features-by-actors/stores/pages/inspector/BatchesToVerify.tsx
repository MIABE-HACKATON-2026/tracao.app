import React from "react";
import { StoreValidationIcon } from "../../stores/stores-icons";
import { FilterIcon, SearchIcon, CheckIcon, CloseIcon } from "../../../../shared/components/icons";
import Modal from "../../../../shared/components/atoms/Modal";

interface BatchItem {
    id: string;
    code: string;
    farmer: string;
    crop: string;
    quantity: number;
    area: number;
}

const BatchesToVerify: React.FC = () => {
    const [selected, setSelected] = React.useState<BatchItem | null>(null);
    const [comment, setComment] = React.useState("");

    const items: BatchItem[] = [
        { id: "1", code: "TRC-2026-0001", farmer: "Kouamé Paul", crop: "Cacao", quantity: 500, area: 2.5 },
        { id: "2", code: "TRC-2026-0002", farmer: "Konan Jules", crop: "Café", quantity: 300, area: 1.8 },
        { id: "3", code: "TRC-2026-0003", farmer: "N'Guessan Alice", crop: "Cacao", quantity: 750, area: 3.2 },
    ];

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Lots à vérifier</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Vérifiez la cohérence des lots déclarés</p>
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
                    <div className="w-[20%] text-[11px] font-medium text-cocoa-60">Code</div>
                    <div className="w-[18%] text-[11px] font-medium text-cocoa-60">Agriculteur</div>
                    <div className="w-[12%] text-[11px] font-medium text-cocoa-60">Culture</div>
                    <div className="w-[15%] text-[11px] font-medium text-cocoa-60">Quantité</div>
                    <div className="w-[15%] text-[11px] font-medium text-cocoa-60">Surface</div>
                    <div className="w-[10%] text-[11px] font-medium text-cocoa-60">Ratio</div>
                    <div className="w-[10%] text-[11px] font-medium text-cocoa-60 text-right">Actions</div>
                </div>
                <div className="flex-1 overflow-y-auto flex flex-col gap-1 mt-1.5">
                    {items.map((b) => (
                        <div key={b.id} className="h-[52px] bg-white/40 rounded-[8px] flex items-center px-6 hover:bg-white/60 transition-colors border border-white/20">
                            <div className="w-[20%] text-[12px] text-cocoa font-mono">{b.code}</div>
                            <div className="w-[18%] text-[12px] text-cocoa-40">{b.farmer}</div>
                            <div className="w-[12%] text-[12px] text-cocoa-40 capitalize">{b.crop}</div>
                            <div className="w-[15%] text-[12px] text-cocoa-40">{b.quantity} Kg</div>
                            <div className="w-[15%] text-[12px] text-cocoa-40">{b.area} ha</div>
                            <div className="w-[10%] text-[12px] text-cocoa-40">{Math.round(b.quantity/b.area)} Kg/ha</div>
                            <div className="w-[10%] flex gap-1 justify-end">
                                <button onClick={() => setSelected(b)} className="h-[28px] w-[28px] rounded-[6px] bg-[#E8F5E9] flex items-center justify-center hover:bg-[#C8E6C9] cursor-pointer">
                                    <CheckIcon className="h-3.5 w-3.5 text-[#4CAF50]" />
                                </button>
                                <button onClick={() => setSelected(b)} className="h-[28px] w-[28px] rounded-[6px] bg-[#FFEBEE] flex items-center justify-center hover:bg-[#FFCDD2] cursor-pointer">
                                    <CloseIcon className="h-3.5 w-3.5 text-[#F44336]" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
                <div className="p-8 flex flex-col gap-6">
                    <h2 className="text-[20px] font-medium text-cocoa">Vérification terrain</h2>
                    <div className="flex flex-col gap-3">
                        {[
                            { label: "Code lot", value: selected?.code },
                            { label: "Agriculteur", value: selected?.farmer },
                            { label: "Quantité", value: `${selected?.quantity} Kg` },
                            { label: "Ratio", value: `${Math.round((selected?.quantity || 0) / (selected?.area || 1))} Kg/ha` },
                        ].map((f, i) => (
                            <div key={i} className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 flex items-center justify-between">
                                <span className="text-[14px] text-cocoa-40">{f.label}</span>
                                <span className="text-[14px] text-cocoa font-medium">{f.value}</span>
                            </div>
                        ))}
                    </div>
                    <textarea
                        placeholder="Commentaire (requis pour rejet)"
                        className="h-[100px] bg-cocoa-5 rounded-[12px] p-4 text-[14px] outline-none focus:ring-1 focus:ring-cocoa-20 placeholder:text-cocoa-40 resize-none"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="flex justify-end gap-3 mt-4">
                        <button onClick={() => setSelected(null)} className="h-[48px] px-8 rounded-full bg-cocoa-5 text-cocoa">Annuler</button>
                        <button className="h-[48px] px-8 rounded-full bg-[#4CAF50] text-white">Approuver</button>
                        <button className="h-[48px] px-8 rounded-full bg-[#F44336] text-white">Rejeter</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default BatchesToVerify;
