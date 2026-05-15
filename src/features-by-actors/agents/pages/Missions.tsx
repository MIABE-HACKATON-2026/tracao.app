import React from "react";
import { OpMissionIcon, OpMapIcon } from "../components/agent-icons";
import { SearchIcon, FilterIcon } from "../../../shared/components/icons";
const AgentMissions: React.FC = () => {
    const missions = [
        { parcel: "Parcelle A", farmer: "Kouamé Paul", location: "Abengourou", type: "inspection" as const, due: "15-03-2026" },
        { parcel: "Parcelle B", farmer: "Konan Jules", location: "Agnibilékrou", type: "creation" as const, due: "16-03-2026" },
    ];
    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1"><h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Missions</h1><p className="text-[12px] leading-[16px] text-cocoa-60">Missions assignées</p></div>
                <div className="flex gap-2"><div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer"><SearchIcon className="h-[18px] w-[18px] fill-cocoa-80 rotate-y-180" /></div><div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer"><FilterIcon className="h-[18px] w-[18px] fill-white" /></div></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {missions.map((m, i) => (
                    <div key={i} className="bg-white/50 rounded-[16px] p-4 flex flex-col gap-3 border border-white hover:bg-white hover:shadow-sm transition-all">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2"><OpMissionIcon className="h-5 w-5 fill-cocoa-40" /><span className="text-[14px] text-cocoa font-medium">{m.parcel}</span></div>
                            <div className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${m.type === 'inspection' ? 'bg-[#E3F2FD] text-[#2196F3] border border-[#BBDEFB]' : 'bg-[#F1F8E9] text-[#8BC34A] border border-[#DCEDC8]'}`}>
                                {m.type === 'inspection' ? 'Inspection' : 'Création'}
                            </div>
                        </div>
                        <div className="text-[12px] text-cocoa-40"><span>Agriculteur: {m.farmer} · Lieu: {m.location}</span></div>
                        <div className="flex gap-2">
                            <button className="flex-1 h-[34px] rounded-[8px] bg-cocoa-5 text-[12px] text-cocoa font-medium hover:bg-cocoa-10 cursor-pointer">Démarrer</button>
                            <button className="h-[34px] w-[34px] rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer"><OpMapIcon className="h-4 w-4 text-cocoa-40" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default AgentMissions;
