import React from "react";
const PendingDeliveries: React.FC = () => (
    <div className="w-full h-full flex flex-col gap-5">
        <div className="flex justify-between items-center">
            <div className="flex flex-col items-start gap-1">
                <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Lots à transporter</h1>
                <p className="text-[12px] leading-[16px] text-cocoa-60">En attente de prise en charge</p>
            </div>
        </div>
        <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-6 flex flex-col items-center justify-center gap-4">

            <span className="text-[14px] text-cocoa-40">Aucune mission en attente pour le moment</span>
        </div>
    </div>
);
export default PendingDeliveries;
