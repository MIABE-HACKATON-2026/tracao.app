import React from "react";
import { OpDeliveryIcon, OpMapIcon, OpScanIcon, OpHistoryIcon } from "../components/transporter-icons";
import { ArrowRightIcon, EyeIcon } from "../../../shared/components/icons";
import { Link } from "react-router-dom";
import { useTransporterTransportsStore } from "../stores/transporter-stores";

const TransporterDashboard: React.FC = () => {
    const { deliveries, fetchDeliveries } = useTransporterTransportsStore();

    React.useEffect(() => { fetchDeliveries(); }, [fetchDeliveries]);

    const inProgress = deliveries.filter(d => d.status === 'in_progress').length;
    const pending = deliveries.filter(d => d.status === 'pending').length;
    const completed = deliveries.filter(d => d.status === 'completed').length;

    return (
        <div className="w-full h-full flex flex-col gap-6">
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[20px] font-medium text-cocoa">Espace Transporteur</h1>
                    <p className="text-[14px] text-cocoa-60">Gérez vos livraisons</p>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-cocoa rounded-[24px] p-5 flex flex-col gap-4 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-all">
                    <OpDeliveryIcon className="h-20 w-20 absolute top-0 right-0 p-4 opacity-10" />
                    <div className="h-9 w-9 rounded-[10px] bg-white/10 flex items-center justify-center relative z-10"><OpDeliveryIcon className="h-4 w-4" /></div>
                    <div className="relative z-10"><span className="text-white text-[24px] font-medium">{inProgress}</span><div className="text-white/60 text-[12px]">En cours</div></div>
                    <div className="pt-3 border-t border-white/10 flex justify-between relative z-10"><span className="text-[11px] text-white/50">Voir</span><ArrowRightIcon className="h-3.5 w-3.5 text-white/50" /></div>
                </div>
                <div className="bg-cocoa-5 rounded-[24px] p-5 flex flex-col gap-4 border border-white shadow-sm hover:shadow-md transition-all group cursor-pointer">
                    <div className="h-9 w-9 rounded-[10px] bg-white flex items-center justify-center shadow-sm"><OpMapIcon className="h-4 w-4 fill-cocoa-40" /></div>
                    <div><span className="text-cocoa text-[24px] font-medium">{pending}</span><div className="text-cocoa-40 text-[12px]">En attente</div></div>
                    <div className="pt-3 border-t border-cocoa-10 flex justify-between"><span className="text-[11px] text-cocoa-40">Voir</span><ArrowRightIcon className="h-3.5 w-3.5 text-cocoa-40" /></div>
                </div>
                <div className="bg-cocoa-5 rounded-[24px] p-5 flex flex-col gap-4 border border-white shadow-sm hover:shadow-md transition-all group cursor-pointer">
                    <div className="h-9 w-9 rounded-[10px] bg-white flex items-center justify-center shadow-sm"><OpScanIcon className="h-4 w-4 fill-cocoa-40" /></div>
                    <div><span className="text-cocoa text-[24px] font-medium">{completed}</span><div className="text-cocoa-40 text-[12px]">Livrés</div></div>
                    <div className="pt-3 border-t border-cocoa-10 flex justify-between"><span className="text-[11px] text-cocoa-40">Historique</span><ArrowRightIcon className="h-3.5 w-3.5 text-cocoa-40" /></div>
                </div>
            </div>
            <div className="flex-1 bg-white rounded-[24px] border border-cocoa-5 overflow-hidden flex flex-col shadow-sm">
                <div className="grid grid-cols-2 flex-1">
                    <div className="p-5 border-r border-b border-cocoa-5 flex flex-col items-center justify-center gap-3 text-center">
                        <OpDeliveryIcon className="h-6 w-6 text-cocoa-20" /><span className="text-[14px] text-cocoa font-medium">Mes transports</span>
                        <Link to="/transporters/deliveries" className="px-5 py-1.5 rounded-full bg-cocoa-5 text-[12px] text-cocoa font-medium hover:bg-cocoa-10 transition-colors">Voir</Link>
                    </div>
                    <div className="p-5 border-b border-cocoa-5 flex flex-col items-center justify-center gap-3 text-center">
                        <OpMapIcon className="h-6 w-6 text-cocoa-20" /><span className="text-[14px] text-cocoa font-medium">Suivi</span>
                        <Link to="/transporters/deliveries" className="px-5 py-1.5 rounded-full bg-cocoa-5 text-[12px] text-cocoa font-medium hover:bg-cocoa-10 transition-colors">Voir</Link>
                    </div>
                    <div className="p-5 border-r border-cocoa-5 flex flex-col items-center justify-center gap-3 text-center">
                        <OpScanIcon className="h-6 w-6 text-cocoa-20" /><span className="text-[14px] text-cocoa font-medium">Scanner QR</span>
                        <Link to="/transporters/scan" className="px-5 py-1.5 rounded-full bg-cocoa-5 text-[12px] text-cocoa font-medium hover:bg-cocoa-10 transition-colors">Voir</Link>
                    </div>
                    <div className="p-5 flex flex-col items-center justify-center gap-3 text-center">
                        <OpHistoryIcon className="h-6 w-6 text-cocoa-20" /><span className="text-[14px] text-cocoa font-medium">Historique</span>
                        <Link to="/transporters/history" className="px-5 py-1.5 rounded-full bg-cocoa text-white text-[12px] font-medium hover:opacity-90">Voir</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TransporterDashboard;
