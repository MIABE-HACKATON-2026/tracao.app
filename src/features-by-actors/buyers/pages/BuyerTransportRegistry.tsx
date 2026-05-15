import React from "react";
import { BuyerTransportIcon } from "../components/buyer-icons";
import { AddIcon, FilterIcon, SearchIcon } from "../../../shared/components/icons";
import Modal from "../../../shared/components/atoms/Modal";

const TransportRegistry: React.FC = () => {
    const [isInviteOpen, setIsInviteOpen] = React.useState(false);
    const entries = [
        { phone: "+225 01 02 03 04", name: "Koné Ibrahim", status: "active" as const, date: "Jan 2025" },
        { phone: "+225 05 06 07 08", name: null, status: "invited" as const, date: "Fév 2025" },
        { phone: "+225 09 10 11 12", name: "Traoré Moussa", status: "active" as const, date: "Mar 2025" },
    ];

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Registre Transporteurs</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Gérez vos transporteurs partenaires</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer"><SearchIcon className="h-[18px] w-[18px] fill-cocoa-80 rotate-y-180" /></div>
                    <div className="h-[34px] px-4 rounded-[8px] bg-cocoa-5 text-[12px] text-cocoa-80 font-medium hover:bg-cocoa-10 flex items-center gap-2 cursor-pointer" onClick={() => setIsInviteOpen(true)}>
                        <AddIcon className="h-[18px] w-[18px] fill-cocoa-80" /> Inviter
                    </div>
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer"><FilterIcon className="h-[18px] w-[18px] fill-white" /></div>
                </div>
            </div>

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-4 overflow-hidden flex flex-col">
                <div className="w-full bg-[#E5E1DE] rounded-t-[12px] flex items-center h-[44px] px-6">
                    <div className="w-[30%] text-[11px] font-medium text-cocoa-60">Téléphone</div>
                    <div className="w-[30%] text-[11px] font-medium text-cocoa-60">Nom</div>
                    <div className="w-[20%] text-[11px] font-medium text-cocoa-60">Statut</div>
                    <div className="w-[20%] text-[11px] font-medium text-cocoa-60">Date</div>
                </div>
                <div className="flex-1 overflow-y-auto flex flex-col gap-1 mt-1.5">
                    {entries.map((e, i) => (
                        <div key={i} className="h-[52px] bg-white/40 rounded-[8px] flex items-center px-6 hover:bg-white/60 border border-white/20">
                            <div className="w-[30%] text-[12px] text-cocoa font-mono">{e.phone}</div>
                            <div className="w-[30%] text-[12px] text-cocoa-40">{e.name || "—"}</div>
                            <div className="w-[20%]">
                                <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${e.status === 'active' ? 'bg-[#E8F5E9] border border-[#C8E6C9]' : 'bg-[#FFF3E0] border border-[#FFE0B2]'}`}>
                                    <div className={`h-1.5 w-1.5 rounded-full ${e.status === 'active' ? 'bg-[#4CAF50]' : 'bg-[#FF9800]'}`}></div>
                                    <span className="text-[10px] font-medium">{e.status === 'active' ? 'Actif' : 'Invité'}</span>
                                </div>
                            </div>
                            <div className="w-[20%] text-[12px] text-cocoa-40">{e.date}</div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)}>
                <div className="p-8 flex flex-col gap-6">
                    <h2 className="text-[20px] font-medium text-cocoa">Inviter un transporteur</h2>
                    <input type="tel" placeholder="Téléphone du transporteur" className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none focus:ring-1 focus:ring-cocoa-20 placeholder:text-cocoa-40" />
                    <div className="flex justify-end gap-3">
                        <button onClick={() => setIsInviteOpen(false)} className="h-[48px] px-8 rounded-full bg-cocoa-5 text-cocoa text-[14px] font-medium hover:bg-cocoa-10">Annuler</button>
                        <button className="h-[48px] px-8 rounded-full bg-black text-white text-[14px] font-medium hover:opacity-90">Inviter</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default TransportRegistry;
