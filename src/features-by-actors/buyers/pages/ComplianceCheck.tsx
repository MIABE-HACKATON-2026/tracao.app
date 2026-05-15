import React from "react";
import { BuyerComplianceIcon, BuyerBlockchainIcon } from "../components/buyer-icons";
import { FilterIcon, SearchIcon, CheckIcon, CloseIcon } from "../../../shared/components/icons";
import Modal from "../../../shared/components/atoms/Modal";

const ComplianceCheck: React.FC = () => {
    const [selected, setSelected] = React.useState<any>(null);
    const items = [
        { id: "1", lot: "TRC-2026-0001", crop: "Cacao", origin: "Côte d'Ivoire", status: "compliant", score: 92, blockchain: true },
        { id: "2", lot: "TRC-2026-0002", crop: "Café", origin: "Côte d'Ivoire", status: "partial", score: 65, blockchain: true },
        { id: "3", lot: "TRC-2026-0003", crop: "Cacao", origin: "Côte d'Ivoire", status: "non_compliant", score: 35, blockchain: false },
    ];

    const statusMap: Record<string, { bg: string; border: string; text: string; label: string }> = {
        compliant: { bg: "bg-[#E8F5E9]", border: "border-[#C8E6C9]", text: "text-[#4CAF50]", label: "Conforme" },
        partial: { bg: "bg-[#FFF3E0]", border: "border-[#FFE0B2]", text: "text-[#FF9800]", label: "Partiel" },
        non_compliant: { bg: "bg-[#FFEBEE]", border: "border-[#FFCDD2]", text: "text-[#F44336]", label: "Non conforme" },
    };

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Vérification conformité EUDR</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Conformité Règlement Européen contre la Déforestation</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer"><SearchIcon className="h-[18px] w-[18px] fill-cocoa-80 rotate-y-180" /></div>
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer"><FilterIcon className="h-[18px] w-[18px] fill-white" /></div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {items.map((i) => {
                    const s = statusMap[i.status];
                    return (
                        <div key={i.id} className="bg-white/50 rounded-[12px] p-4 flex items-center gap-4 border border-white hover:bg-white hover:shadow-sm transition-all cursor-pointer" onClick={() => setSelected(i)}>
                            <BuyerComplianceIcon className={`h-8 w-8 ${i.status === 'compliant' ? 'fill-[#4CAF50]' : i.status === 'partial' ? 'fill-[#FF9800]' : 'fill-[#F44336]'}`} />
                            <div className="flex-1 flex flex-col gap-0.5">
                                <div className="flex items-center gap-2">
                                    <span className="text-[14px] text-cocoa font-mono font-medium">{i.lot}</span>
                                    <div className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${s.bg} ${s.border} ${s.text}`}>{s.label}</div>
                                </div>
                                <span className="text-[12px] text-cocoa-40">{i.crop} · {i.origin}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`text-[14px] font-mono font-bold ${i.score >= 70 ? 'text-[#4CAF50]' : i.score >= 50 ? 'text-[#FF9800]' : 'text-[#F44336]'}`}>{i.score}%</span>
                                <span className="text-[10px] text-cocoa-20">EUDR</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
                <div className="p-8 flex flex-col gap-6">
                    <h2 className="text-[20px] font-medium text-cocoa">Rapport conformité EUDR</h2>
                    <div className="flex flex-col gap-4">
                        {[{ label: "Lot", value: selected?.lot }, { label: "Score EUDR", value: `${selected?.score}%` }, { label: "Blockchain", value: selected?.blockchain ? '✓ Certifié' : '✗ Non certifié' }].map((f, i) => (
                            <div key={i} className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 flex items-center justify-between">
                                <span className="text-[14px] text-cocoa-40">{f.label}</span>
                                <span className="text-[14px] text-cocoa font-medium">{f.value}</span>
                            </div>
                        ))}
                        <div className="bg-cocoa-5 rounded-[12px] p-4 flex flex-col gap-2">
                            <span className="text-[12px] text-cocoa-20 font-medium uppercase">Critères vérifiés</span>
                            {[
                                { label: "Traçabilité complète", ok: selected?.status === 'compliant' || selected?.status === 'partial' },
                                { label: "Parcelle hors zone déforestation", ok: selected?.status === 'compliant' },
                                { label: "Ancrage blockchain", ok: selected?.blockchain },
                                { label: "Validation coopérative", ok: true },
                            ].map((c, i) => (
                                <div key={i} className="flex items-center gap-2 text-[12px]">
                                    {c.ok ? <CheckIcon className="h-4 w-4 fill-[#4CAF50]" /> : <CloseIcon className="h-4 w-4 fill-[#F44336]" />}
                                    <span className={c.ok ? 'text-cocoa' : 'text-cocoa-40'}>{c.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button onClick={() => setSelected(null)} className="h-[48px] px-8 rounded-full bg-cocoa-5 text-cocoa text-[14px] font-medium hover:bg-cocoa-10">Fermer</button>
                        <button className="h-[48px] px-8 rounded-full bg-cocoa text-white text-[14px] font-medium hover:opacity-90">Télécharger rapport</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ComplianceCheck;
