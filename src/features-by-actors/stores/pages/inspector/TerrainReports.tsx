import React from "react";
import { StoreReportIcon, StoreValidationIcon, StoreMissionIcon } from "../../stores/stores-icons";
import { DownloadIcon } from "../../../../shared/components/icons";

const TerrainReports: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Rapports terrain</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Statistiques de vos inspections</p>
                </div>
            </div>

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-6 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-[16px] p-5 flex flex-col gap-4 border border-white hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-[10px] bg-[#E8F5E9] flex items-center justify-center">
                                <StoreValidationIcon className="h-5 w-5 fill-[#4CAF50]" />
                            </div>
                            <span className="text-[14px] text-cocoa font-medium">Approuvées</span>
                        </div>
                        <span className="text-[28px] text-cocoa font-medium">12</span>
                        <span className="text-[11px] text-cocoa-40">Parcelles et lots</span>
                    </div>

                    <div className="bg-white rounded-[16px] p-5 flex flex-col gap-4 border border-white hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-[10px] bg-[#FFEBEE] flex items-center justify-center">
                                <StoreValidationIcon className="h-5 w-5 fill-[#F44336]" />
                            </div>
                            <span className="text-[14px] text-cocoa font-medium">Rejetées</span>
                        </div>
                        <span className="text-[28px] text-cocoa font-medium">3</span>
                        <span className="text-[11px] text-cocoa-40">Avec motifs</span>
                    </div>

                    <div className="bg-white rounded-[16px] p-5 flex flex-col gap-4 border border-white hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-[10px] bg-[#E3F2FD] flex items-center justify-center">
                                <StoreMissionIcon className="h-5 w-5 fill-[#2196F3]" />
                            </div>
                            <span className="text-[14px] text-cocoa font-medium">Missions</span>
                        </div>
                        <span className="text-[28px] text-cocoa font-medium">8</span>
                        <span className="text-[11px] text-cocoa-40">Ce mois-ci</span>
                    </div>
                </div>

                <button className="mt-6 h-[48px] px-6 rounded-[12px] bg-cocoa text-white text-[14px] font-medium hover:opacity-90 flex items-center justify-center gap-2 transition-opacity cursor-pointer">
                    <DownloadIcon className="h-4 w-4" /> Exporter mon rapport d'activité
                </button>
            </div>
        </div>
    );
};

export default TerrainReports;
