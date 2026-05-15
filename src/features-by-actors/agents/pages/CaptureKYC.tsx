import React from "react";
import { OpKycIcon } from "../components/agent-icons";
import { UploadImageIcon } from "../../../shared/components/icons";

const CaptureKYC: React.FC = () => (
    <div className="w-full h-full flex flex-col gap-5">
        <div className="flex justify-between items-center">
            <div className="flex flex-col items-start gap-1"><h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Capture KYC</h1><p className="text-[12px] leading-[16px] text-cocoa-60">Prendre les photos CNI d'un agriculteur</p></div>
        </div>
        <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-6 flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-[16px] p-6 flex flex-col items-center justify-center gap-4 border-2 border-dashed border-cocoa-20">
                    <UploadImageIcon className="h-12 w-12 text-cocoa-20" />
                    <span className="text-[13px] text-cocoa-40">CNI Recto</span>
                    <button className="h-[38px] px-5 rounded-[8px] bg-cocoa-5 text-[12px] text-cocoa font-medium hover:bg-cocoa-10 cursor-pointer">Prendre une photo</button>
                </div>
                <div className="bg-white rounded-[16px] p-6 flex flex-col items-center justify-center gap-4 border-2 border-dashed border-cocoa-20">
                    <UploadImageIcon className="h-12 w-12 text-cocoa-20" />
                    <span className="text-[13px] text-cocoa-40">CNI Verso</span>
                    <button className="h-[38px] px-5 rounded-[8px] bg-cocoa-5 text-[12px] text-cocoa font-medium hover:bg-cocoa-10 cursor-pointer">Prendre une photo</button>
                </div>
            </div>
            <button className="h-[48px] rounded-[12px] bg-cocoa text-white text-[14px] font-medium hover:opacity-90 cursor-pointer">Enregistrer KYC (offline)</button>
        </div>
    </div>
);
export default CaptureKYC;
