import React from "react";
import { OpAgentIcon, OpSyncIcon, OpMissionIcon, OpFarmerIcon, OpKycIcon } from "../components/agent-icons";
import { ArrowRightIcon, EyeIcon } from "../../../shared/components/icons";
import { Link } from "react-router-dom";
import { useAgentSyncStore } from "../stores/agent-stores";

const AgentDashboard: React.FC = () => {
    const { items, fetchSync } = useAgentSyncStore();

    React.useEffect(() => { fetchSync(); }, [fetchSync]);

    const pending = items.filter(i => i.status === 'pending').length;
    const conflicts = items.filter(i => i.status === 'conflict').length;
    const synced = items.filter(i => i.status === 'synced').length;

    return (
        <div className="w-full h-full flex flex-col gap-6">
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1"><h1 className="text-[20px] font-medium text-cocoa">Espace Agent terrain</h1><p className="text-[14px] text-cocoa-60">Collecte de données offline</p></div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-cocoa rounded-[24px] p-5 flex flex-col gap-4 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-all">
                    <OpSyncIcon className="h-20 w-20 absolute top-0 right-0 p-4 opacity-10" />
                    <div className="h-9 w-9 rounded-[10px] bg-white/10 flex items-center justify-center relative z-10"><OpSyncIcon className="h-4 w-4" /></div>
                    <div className="relative z-10"><span className="text-white text-[24px] font-medium">{pending}</span><div className="text-white/60 text-[12px]">En attente sync</div></div>
                    <div className="pt-3 border-t border-white/10 flex justify-between relative z-10"><span className="text-[11px] text-white/50">Sync</span><ArrowRightIcon className="h-3.5 w-3.5 text-white/50" /></div>
                </div>
                <div className="bg-cocoa-5 rounded-[24px] p-5 flex flex-col gap-4 border border-white shadow-sm hover:shadow-md transition-all group cursor-pointer">
                    <div className="h-9 w-9 rounded-[10px] bg-white flex items-center justify-center shadow-sm"><OpFarmerIcon className="h-4 w-4 fill-cocoa-40" /></div>
                    <div><span className="text-cocoa text-[24px] font-medium">{synced}</span><div className="text-cocoa-40 text-[12px]">Synchronisés</div></div>
                    <div className="pt-3 border-t border-cocoa-10 flex justify-between"><span className="text-[11px] text-cocoa-40">Voir</span><ArrowRightIcon className="h-3.5 w-3.5 text-cocoa-40" /></div>
                </div>
                <div className="bg-cocoa-5 rounded-[24px] p-5 flex flex-col gap-4 border border-white shadow-sm hover:shadow-md transition-all group cursor-pointer">
                    <div className="h-9 w-9 rounded-[10px] bg-white flex items-center justify-center shadow-sm"><OpMissionIcon className="h-4 w-4 fill-cocoa-40" /></div>
                    <div><span className="text-cocoa text-[24px] font-medium">—</span><div className="text-cocoa-40 text-[12px]">Missions</div></div>
                    <div className="pt-3 border-t border-cocoa-10 flex justify-between"><span className="text-[11px] text-cocoa-40">Voir</span><ArrowRightIcon className="h-3.5 w-3.5 text-cocoa-40" /></div>
                </div>
                <div className="bg-cocoa-5 rounded-[24px] p-5 flex flex-col gap-4 border border-white shadow-sm hover:shadow-md transition-all group cursor-pointer">
                    <div className="h-9 w-9 rounded-[10px] bg-white flex items-center justify-center shadow-sm"><OpSyncIcon className="h-4 w-4 fill-cocoa-40" /></div>
                    <div><span className="text-cocoa text-[24px] font-medium">{conflicts}</span><div className="text-cocoa-40 text-[12px]">Conflits</div></div>
                    <div className="pt-3 border-t border-cocoa-10 flex justify-between"><span className="text-[11px] text-cocoa-40">Résoudre</span><ArrowRightIcon className="h-3.5 w-3.5 text-cocoa-40" /></div>
                </div>
            </div>
            <div className="flex-1 bg-white rounded-[24px] border border-cocoa-5 overflow-hidden flex flex-col shadow-sm">
                <div className="grid grid-cols-2 flex-1">
                    <div className="p-5 border-r border-b border-cocoa-5 flex flex-col items-center justify-center gap-3 text-center">
                        <OpFarmerIcon className="h-6 w-6 text-cocoa-20" /><span className="text-[14px] text-cocoa font-medium">Créer farmer</span>
                        <Link to="/agents/create-farmer" className="px-5 py-1.5 rounded-full bg-cocoa-5 text-[12px] text-cocoa font-medium hover:bg-cocoa-10">Ouvrir</Link>
                    </div>
                    <div className="p-5 border-b border-cocoa-5 flex flex-col items-center justify-center gap-3 text-center">
                        <OpKycIcon className="h-6 w-6 text-cocoa-20" /><span className="text-[14px] text-cocoa font-medium">Capture KYC</span>
                        <Link to="/agents/kyc" className="px-5 py-1.5 rounded-full bg-cocoa-5 text-[12px] text-cocoa font-medium hover:bg-cocoa-10">Ouvrir</Link>
                    </div>
                    <div className="p-5 border-r border-cocoa-5 flex flex-col items-center justify-center gap-3 text-center">
                        <OpMissionIcon className="h-6 w-6 text-cocoa-20" /><span className="text-[14px] text-cocoa font-medium">Missions</span>
                        <Link to="/agents/missions" className="px-5 py-1.5 rounded-full bg-cocoa-5 text-[12px] text-cocoa font-medium hover:bg-cocoa-10">Voir</Link>
                    </div>
                    <div className="p-5 flex flex-col items-center justify-center gap-3 text-center">
                        <OpSyncIcon className="h-6 w-6 text-cocoa-20" /><span className="text-[14px] text-cocoa font-medium">Sync</span>
                        <Link to="/agents/sync" className="px-5 py-1.5 rounded-full bg-cocoa text-white text-[12px] font-medium hover:opacity-90">Voir</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AgentDashboard;
