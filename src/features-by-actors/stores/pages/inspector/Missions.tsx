import React from "react";
import { StoreMissionIcon } from "../../stores/stores-icons";
import { MapIcon, SearchIcon, FilterIcon } from "../../../../shared/components/icons";
import Modal from "../../../../shared/components/atoms/Modal";

interface Mission {
    id: string;
    parcelName: string;
    farmer: string;
    farmerPhone: string;
    location: string;
    type: 'inspection' | 'verification';
    dueDate: string;
}

const Missions: React.FC = () => {
    const [selectedMission, setSelectedMission] = React.useState<Mission | null>(null);

    const missions: Mission[] = [
        { id: "1", parcelName: "Parcelle A", farmer: "Kouamé Paul", farmerPhone: "+225 01 02 03 04", location: "Abengourou", type: "inspection", dueDate: "15-03-2026" },
        { id: "2", parcelName: "Parcelle B", farmer: "Konan Jules", farmerPhone: "+225 05 06 07 08", location: "Agnibilékrou", type: "verification", dueDate: "16-03-2026" },
        { id: "3", parcelName: "Parcelle C", farmer: "N'Guessan Alice", farmerPhone: "+225 09 10 11 12", location: "Bongouanou", type: "inspection", dueDate: "17-03-2026" },
    ];

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Missions terrain</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Vos missions d'inspection et de vérification</p>
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
                {missions.map((m) => (
                    <div key={m.id} className="bg-white/50 rounded-[16px] p-4 flex flex-col gap-3 border border-white hover:bg-white hover:shadow-sm transition-all cursor-pointer" onClick={() => setSelectedMission(m)}>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <StoreMissionIcon className="h-5 w-5 fill-cocoa-40" />
                                <span className="text-[14px] text-cocoa font-medium">{m.parcelName}</span>
                            </div>
                            <div className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${m.type === 'inspection' ? 'bg-[#E3F2FD] text-[#2196F3] border border-[#BBDEFB]' : 'bg-[#FFF3E0] text-[#FF9800] border border-[#FFE0B2]'}`}>
                                {m.type === 'inspection' ? 'Inspection' : 'Vérification'}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 text-[12px] text-cocoa-40">
                            <span>Agriculteur: {m.farmer} · {m.farmerPhone}</span>
                            <span>Lieu: {m.location}</span>
                            <span>Date limite: {m.dueDate}</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <button className="flex-1 h-[34px] rounded-[8px] bg-cocoa-5 text-[12px] text-cocoa font-medium hover:bg-cocoa-10 transition-colors cursor-pointer">
                                Démarrer inspection
                            </button>
                            <button className="h-[34px] w-[34px] rounded-[8px] bg-cocoa-5 flex items-center justify-center hover:bg-cocoa-10 transition-colors cursor-pointer">
                                <MapIcon className="h-4 w-4 text-cocoa-40" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={!!selectedMission} onClose={() => setSelectedMission(null)}>
                <div className="p-8 flex flex-col gap-6">
                    <h2 className="text-[20px] font-medium text-cocoa">Détails de la mission</h2>
                    <div className="flex flex-col gap-3">
                        {[
                            { label: "Parcelle", value: selectedMission?.parcelName },
                            { label: "Agriculteur", value: selectedMission?.farmer },
                            { label: "Contact", value: selectedMission?.farmerPhone },
                            { label: "Localisation", value: selectedMission?.location },
                            { label: "Date limite", value: selectedMission?.dueDate },
                        ].map((f, i) => (
                            <div key={i} className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 flex items-center justify-between">
                                <span className="text-[14px] text-cocoa-40">{f.label}</span>
                                <span className="text-[14px] text-cocoa font-medium">{f.value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button onClick={() => setSelectedMission(null)} className="h-[48px] px-8 rounded-full bg-cocoa-5 text-cocoa text-[14px] font-medium hover:bg-cocoa-10">Fermer</button>
                        <button className="h-[48px] px-8 rounded-full bg-cocoa text-white text-[14px] font-medium hover:opacity-90">Démarrer l'inspection</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Missions;
