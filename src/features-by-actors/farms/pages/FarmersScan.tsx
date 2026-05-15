import React from "react";
import { FarmersQrIcon } from "../../../shared/components/icons";
import { CheckIcon } from "../../../shared/components/icons";

const FarmersScan: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Scanner QR Code</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Scannez un QR code pour voir les détails d'un lot</p>
                </div>
            </div>

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-6 flex flex-col items-center justify-center gap-6">
                <div className="w-[280px] h-[280px] rounded-[24px] bg-white border-2 border-dashed border-cocoa-20 flex items-center justify-center">
                    <FarmersQrIcon className="h-32 w-32 fill-cocoa-10" />
                </div>
                <p className="text-[14px] text-cocoa-40 text-center max-w-md">
                    Positionnez le QR code du lot dans le cadre pour voir sa traçabilité
                </p>
                <button className="h-[48px] px-8 rounded-full bg-cocoa text-white text-[14px] font-medium hover:opacity-90 transition-opacity cursor-pointer">
                    Activer la caméra
                </button>

                <div className="w-full max-w-md bg-white rounded-[16px] p-4 flex items-center gap-3 border border-[#C8E6C9]">
                    <div className="h-8 w-8 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                        <CheckIcon className="h-4 w-4 fill-[#4CAF50]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[14px] text-cocoa font-medium">TRC-2026-0001</span>
                        <span className="text-[12px] text-cocoa-40">Lot de Cacao · 500 Kg · Approuvé</span>
                    </div>
                    <button className="ml-auto h-[34px] px-4 rounded-[8px] bg-cocoa-5 text-[12px] text-cocoa font-medium hover:bg-cocoa-10 transition-colors cursor-pointer">
                        Voir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FarmersScan;
