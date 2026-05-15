import React from "react";
import { StoreHistoryIcon, StoreValidationIcon } from "../stores/stores-icons";
import { FilterIcon, SearchIcon, CheckIcon, CloseIcon } from "../../../shared/components/icons";
import Modal from "../../../shared/components/atoms/Modal";

interface HistoryItem {
    id: string;
    type: 'parcel' | 'batch';
    entity: string;
    farmer: string;
    action: 'approved' | 'rejected';
    comment?: string;
    date: string;
}

const ValidationsHistory: React.FC = () => {
    const [selectedItem, setSelectedItem] = React.useState<HistoryItem | null>(null);
    const items: HistoryItem[] = [
        { id: "1", type: "parcel", entity: "Parcelle A", farmer: "Kouamé Paul", action: "approved", comment: "Documents fonciers vérifiés et validés par l'inspecteur terrain.", date: "10-03-2026" },
        { id: "2", type: "batch", entity: "TRC-2026-0001", farmer: "Konan Jules", action: "approved", comment: "Quantité estimée conforme aux prévisions de récolte.", date: "09-03-2026" },
        { id: "3", type: "parcel", entity: "Parcelle B", farmer: "N'Guessan Alice", action: "rejected", comment: "Chevauchement GPS détecté avec la parcelle P-992.", date: "08-03-2026" },
        { id: "4", type: "batch", entity: "TRC-2026-0002", farmer: "Koffi Bernard", action: "rejected", comment: "Taux d'humidité trop élevé pour le stockage.", date: "07-03-2026" },
    ];

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Historique des validations</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Consultez les décisions passées</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer hover:bg-cocoa-10 transition-colors">
                        <SearchIcon className="h-[18px] w-[18px] text-cocoa-80 rotate-y-180" />
                    </div>
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                        <FilterIcon className="h-[18px] w-[18px] text-white" />
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-4 overflow-y-auto flex flex-col gap-3">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {items.map((h) => (
                        <div key={h.id} className="bg-white rounded-[16px] p-5 flex flex-col gap-4 border border-white hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedItem(h)}>
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className={`h-10 w-10 rounded-[12px] flex items-center justify-center ${h.type === 'parcel' ? 'bg-blue-50 text-blue-500' : 'bg-green-50 text-green-500'}`}>
                                        <StoreHistoryIcon className="h-5 w-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] text-cocoa font-medium">{h.entity}</span>
                                        <span className="text-[11px] text-cocoa-40">{h.type === 'parcel' ? 'Parcelle' : 'Lot'} • {h.farmer}</span>
                                    </div>
                                </div>
                                <div className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${h.action === 'approved' ? 'bg-[#E8F5E9] text-[#4CAF50]' : 'bg-[#FFEBEE] text-[#F44336]'}`}>
                                    {h.action === 'approved' ? 'Approuvé' : 'Rejeté'}
                                </div>
                            </div>
                            <p className="text-[12px] text-cocoa-40 line-clamp-1 italic">
                                "{h.comment || "Aucun commentaire"}"
                            </p>
                            <div className="flex justify-between items-center mt-1 pt-3 border-t border-cocoa-5">
                                <span className="text-[11px] text-cocoa-40">Décidé le</span>
                                <span className="text-[11px] text-cocoa font-medium">{h.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)}>
                <div className="p-8 flex flex-col gap-6 max-w-[600px] w-full">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[20px] font-medium text-cocoa">Détails de la décision</h2>
                        <p className="text-[13px] text-cocoa-40">Archive historique de validation.</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        {[
                            { label: "Référence", value: selectedItem?.entity },
                            { label: "Type d'entité", value: selectedItem?.type === 'parcel' ? 'Parcelle agricole' : 'Lot de production' },
                            { label: "Agriculteur", value: selectedItem?.farmer },
                            { label: "Statut final", value: selectedItem?.action === 'approved' ? 'Approuvé' : 'Rejeté', color: selectedItem?.action === 'approved' ? 'text-[#4CAF50]' : 'text-[#F44336]' },
                            { label: "Date de validation", value: selectedItem?.date },
                        ].map((f, i) => (
                            <div key={i} className="bg-cocoa-5/50 rounded-[12px] px-4 py-3 flex flex-col gap-0.5">
                                <span className="text-[11px] text-cocoa-40">{f.label}</span>
                                <span className={`text-[13px] font-medium ${f.color || 'text-cocoa'}`}>{f.value}</span>
                            </div>
                        ))}
                        <div className="bg-cocoa-5 rounded-[12px] p-4 flex flex-col gap-1">
                            <span className="text-[11px] text-cocoa-40 uppercase font-bold tracking-wider">Commentaire de validation</span>
                            <p className="text-[12px] text-cocoa italic leading-relaxed">
                                "{selectedItem?.comment || "Aucun commentaire supplémentaire n'a été fourni lors de cette validation."}"
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        <button onClick={() => setSelectedItem(null)} className="h-[44px] w-full rounded-full bg-black text-white text-[13px] font-medium hover:opacity-90 transition-opacity cursor-pointer">Fermer</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ValidationsHistory;
