import React from "react";
import { BuyerComplianceIcon } from "../components/buyer-icons";
import { DownloadIcon, FilterIcon, SearchIcon } from "../../../shared/components/icons";

const ComplianceReports: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Rapports conformité</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Indicateurs et rapports EUDR</p>
                </div>
                <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer"><FilterIcon className="h-[18px] w-[18px] fill-white" /></div>
            </div>

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-6 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-[16px] p-5 flex flex-col gap-4 border border-white hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-[10px] bg-[#E8F5E9] flex items-center justify-center">
                                <BuyerComplianceIcon className="h-5 w-5 fill-[#4CAF50]" />
                            </div>
                            <span className="text-[14px] text-cocoa font-medium">Taux de conformité</span>
                        </div>
                        <span className="text-[28px] text-cocoa font-medium">87%</span>
                        <span className="text-[11px] text-cocoa-40">12 lots vérifiés ce mois</span>
                        <button className="h-[38px] rounded-[8px] bg-cocoa-5 text-[12px] text-cocoa font-medium hover:bg-cocoa-10 flex items-center justify-center gap-2 cursor-pointer">
                            <DownloadIcon className="h-4 w-4" /> Rapport EUDR PDF
                        </button>
                    </div>

                    <div className="bg-white rounded-[16px] p-5 flex flex-col gap-4 border border-white hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-[10px] bg-[#E3F2FD] flex items-center justify-center">
                                <BuyerComplianceIcon className="h-5 w-5 fill-[#2196F3]" />
                            </div>
                            <span className="text-[14px] text-cocoa font-medium">Volume importé</span>
                        </div>
                        <span className="text-[28px] text-cocoa font-medium">1 500 <span className="text-[16px] text-cocoa-40">Kg</span></span>
                        <span className="text-[11px] text-cocoa-40">Total vérifié période</span>
                        <button className="h-[38px] rounded-[8px] bg-cocoa-5 text-[12px] text-cocoa font-medium hover:bg-cocoa-10 flex items-center justify-center gap-2 cursor-pointer">
                            <DownloadIcon className="h-4 w-4" /> Export rapport
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComplianceReports;
