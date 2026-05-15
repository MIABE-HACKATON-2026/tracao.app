import React from "react";
import { OpMapIcon } from "../components/transporter-icons";
const DeliveryTracking: React.FC = () => (
    <div className="w-full h-full flex flex-col gap-5">
        <div className="flex justify-between items-center">
            <div className="flex flex-col items-start gap-1">
                <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Suivi livraison</h1>
                <p className="text-[12px] leading-[16px] text-cocoa-60">Position en temps réel</p>
            </div>
        </div>
        <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-6 flex flex-col items-center justify-center gap-4">
            <OpMapIcon className="h-24 w-24 text-cocoa-20" />
            <span className="text-[14px] text-cocoa-40">Carte de suivi GPS (intégration à venir)</span>
            <span className="text-[12px] text-cocoa-20">TRC-2026-0001 · Abengourou → Abidjan</span>
            <button className="h-[38px] px-6 rounded-[8px] bg-cocoa text-white text-[12px] font-medium hover:opacity-90 cursor-pointer">Envoyer ma position</button>
        </div>
    </div>
);
export default DeliveryTracking;
