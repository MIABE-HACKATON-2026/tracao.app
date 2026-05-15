import React from "react";
import { StoreValidationIcon } from "../../stores/stores-icons";
import { FilterIcon, SearchIcon, CheckIcon, CloseIcon, MapIcon } from "../../../../shared/components/icons";
import Modal from "../../../../shared/components/atoms/Modal";

interface ParcelItem {
    id: string;
    name: string;
    farmer: string;
    phone: string;
    area: number;
    submitted: string;
}

const ParcelsToInspect: React.FC = () => {
    const [selected, setSelected] = React.useState<ParcelItem | null>(null);
    const [comment, setComment] = React.useState("");

    const items: ParcelItem[] = [
        { id: "1", name: "Parcelle A", farmer: "Kouamé Paul", phone: "+225 01 02 03 04", area: 2.5, submitted: "11-03-2026" },
        { id: "2", name: "Parcelle B", farmer: "Konan Jules", phone: "+225 05 06 07 08", area: 1.8, submitted: "10-03-2026" },
        { id: "3", name: "Parcelle C", farmer: "N'Guessan Alice", phone: "+225 09 10 11 12", area: 3.2, submitted: "09-03-2026" },
    ];

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Parcelles à inspecter</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Inspectez les parcelles sur le terrain</p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((p) => (
                    <div key={p.id} className="bg-white/50 rounded-[16px] p-4 flex flex-col gap-3 border border-white hover:bg-white hover:shadow-sm transition-all">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <StoreValidationIcon className="h-5 w-5 fill-cocoa-40" />
                                <span className="text-[14px] text-cocoa font-medium">{p.name}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 text-[12px] text-cocoa-40">
                            <span>Agriculteur: {p.farmer} · {p.phone}</span>
                            <span>Surface: {p.area} ha · Soumis le {p.submitted}</span>
                        </div>
                        <div className="h-[100px] bg-cocoa-5 rounded-[8px] flex items-center justify-center gap-2">
                            <MapIcon className="h-5 w-5 text-cocoa-20" />
                            <span className="text-[11px] text-cocoa-20">Aperçu carte</span>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setSelected(p)} className="flex-1 h-[34px] rounded-[8px] bg-[#E8F5E9] border border-[#C8E6C9] text-[12px] text-[#4CAF50] font-medium hover:bg-[#C8E6C9] transition-colors cursor-pointer">
                                Approuver
                            </button>
                            <button onClick={() => setSelected(p)} className="flex-1 h-[34px] rounded-[8px] bg-[#FFEBEE] border border-[#FFCDD2] text-[12px] text-[#F44336] font-medium hover:bg-[#FFCDD2] transition-colors cursor-pointer">
                                Rejeter
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
                <div className="p-8 flex flex-col gap-6">
                    <h2 className="text-[20px] font-medium text-cocoa">Validation terrain</h2>
                    <div className="flex flex-col gap-3">
                        {[
                            { label: "Parcelle", value: selected?.name },
                            { label: "Agriculteur", value: selected?.farmer },
                            { label: "Contact", value: selected?.phone },
                            { label: "Surface", value: `${selected?.area} ha` },
                        ].map((f, i) => (
                            <div key={i} className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 flex items-center justify-between">
                                <span className="text-[14px] text-cocoa-40">{f.label}</span>
                                <span className="text-[14px] text-cocoa font-medium">{f.value}</span>
                            </div>
                        ))}
                    </div>
                    <textarea
                        placeholder="Commentaire d'inspection"
                        className="h-[100px] bg-cocoa-5 rounded-[12px] p-4 text-[14px] outline-none focus:ring-1 focus:ring-cocoa-20 placeholder:text-cocoa-40 resize-none"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="flex justify-end gap-3 mt-4">
                        <button onClick={() => setSelected(null)} className="h-[48px] px-8 rounded-full bg-cocoa-5 text-cocoa text-[14px] font-medium hover:bg-cocoa-10">Annuler</button>
                        <button className="h-[48px] px-8 rounded-full bg-[#4CAF50] text-white text-[14px] font-medium hover:opacity-90">Approuver</button>
                        <button className="h-[48px] px-8 rounded-full bg-[#F44336] text-white text-[14px] font-medium hover:opacity-90">Rejeter</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ParcelsToInspect;
