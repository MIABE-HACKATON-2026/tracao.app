import React from "react";
import { Link } from "react-router-dom";
import { StoreValidationIcon, StoreMissionIcon, StorePendingIcon, StoreQrIcon } from "../../stores/stores-icons";
import { ArrowRightIcon, EyeIcon, MapIcon } from "../../../../shared/components/icons";

const InspectorDashboard: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col gap-6">
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[20px] font-medium text-cocoa">Tableau de bord Inspecteur</h1>
                    <p className="text-[14px] text-cocoa-60">Gérez vos missions terrain et validations</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-cocoa rounded-[24px] p-5 flex flex-col gap-4 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <StoreValidationIcon className="h-20 w-20" />
                    </div>
                    <div className="h-9 w-9 rounded-[10px] bg-white/10 flex items-center justify-center relative z-10">
                        <StorePendingIcon className="h-4 w-4" />
                    </div>
                    <div className="relative z-10">
                        <span className="text-white text-[24px] font-medium">4</span>
                        <div className="text-white/60 text-[12px]">Parcelles à inspecter</div>
                    </div>
                    <div className="pt-3 border-t border-white/10 flex justify-between items-center relative z-10">
                        <span className="text-[11px] text-white/50">Voir les missions</span>
                        <ArrowRightIcon className="h-3.5 w-3.5 text-white/50" />
                    </div>
                </div>

                <div className="bg-cocoa-5 rounded-[24px] p-5 flex flex-col gap-4 border border-white shadow-sm hover:shadow-md transition-all group cursor-pointer">
                    <div className="h-9 w-9 rounded-[10px] bg-white flex items-center justify-center shadow-sm">
                        <StoreMissionIcon className="h-4 w-4 fill-cocoa-40" />
                    </div>
                    <div>
                        <span className="text-cocoa text-[24px] font-medium">3</span>
                        <div className="text-cocoa-40 text-[12px]">Lots à vérifier</div>
                    </div>
                    <div className="pt-3 border-t border-cocoa-10 flex justify-between items-center">
                        <span className="text-[11px] text-cocoa-40">Voir les lots</span>
                        <ArrowRightIcon className="h-3.5 w-3.5 text-cocoa-40" />
                    </div>
                </div>

                <div className="bg-cocoa-5 rounded-[24px] p-5 flex flex-col gap-4 border border-white shadow-sm hover:shadow-md transition-all group cursor-pointer">
                    <div className="h-9 w-9 rounded-[10px] bg-white flex items-center justify-center shadow-sm">
                        <StoreQrIcon className="h-4 w-4 fill-cocoa-40" />
                    </div>
                    <div>
                        <span className="text-cocoa text-[24px] font-medium">8</span>
                        <div className="text-cocoa-40 text-[12px]">Validations ce mois</div>
                    </div>
                    <div className="pt-3 border-t border-cocoa-10 flex justify-between items-center">
                        <span className="text-[11px] text-cocoa-40">Mon historique</span>
                        <ArrowRightIcon className="h-3.5 w-3.5 text-cocoa-40" />
                    </div>
                </div>
            </div>

            <div className="flex gap-5 flex-1 min-h-0">
                <div className="flex-1 bg-white rounded-[24px] border border-cocoa-5 overflow-hidden flex flex-col shadow-sm">
                    <div className="grid grid-cols-2 flex-1">
                        <div className="p-5 border-r border-b border-cocoa-5 flex flex-col items-center justify-center gap-3 text-center">
                            <MapIcon className="h-6 w-6 text-cocoa-20" />
                            <div className="flex flex-col items-center">
                                <span className="text-[12px] text-cocoa-20">Terrain</span>
                                <span className="text-[14px] text-cocoa font-medium">Missions du jour</span>
                            </div>
                            <Link to="/stores/inspector/missions" className="px-5 py-1.5 rounded-full bg-cocoa-5 text-[12px] text-cocoa font-medium hover:bg-cocoa-10 flex items-center gap-2 transition-colors">
                                <EyeIcon className="h-3.5 w-3.5" />
                                Voir
                            </Link>
                        </div>
                        <div className="p-5 border-b border-cocoa-5 flex flex-col items-center justify-center gap-3 text-center">
                            <StoreValidationIcon className="h-6 w-6 fill-cocoa-20" />
                            <div className="flex flex-col items-center">
                                <span className="text-[12px] text-cocoa-20">En attente</span>
                                <span className="text-[14px] text-cocoa font-medium">Parcelles à inspecter</span>
                            </div>
                            <Link to="/stores/inspector/parcels" className="px-5 py-1.5 rounded-full bg-cocoa-5 text-[12px] text-cocoa font-medium hover:bg-cocoa-10 flex items-center gap-2 transition-colors">
                                <EyeIcon className="h-3.5 w-3.5" />
                                Voir
                            </Link>
                        </div>
                        <div className="p-5 border-r border-cocoa-5 flex flex-col items-center justify-center gap-3 text-center">
                            <StoreQrIcon className="h-6 w-6 fill-cocoa-20" />
                            <div className="flex flex-col items-center">
                                <span className="text-[12px] text-cocoa-20">Scanner</span>
                                <span className="text-[14px] text-cocoa font-medium">QR code terrain</span>
                            </div>
                            <Link to="/stores/inspector/scan" className="px-5 py-1.5 rounded-full bg-cocoa-5 text-[12px] text-cocoa font-medium hover:bg-cocoa-10 flex items-center gap-2 transition-colors">
                                <EyeIcon className="h-3.5 w-3.5" />
                                Ouvrir
                            </Link>
                        </div>
                        <div className="p-5 flex flex-col items-center justify-center gap-3 text-center">
                            <StoreMissionIcon className="h-6 w-6 fill-cocoa-20" />
                            <div className="flex flex-col items-center">
                                <span className="text-[12px] text-cocoa-20">Historique</span>
                                <span className="text-[14px] text-cocoa font-medium">Mes validations</span>
                            </div>
                            <Link to="/stores/inspector/history" className="px-5 py-1.5 rounded-full bg-cocoa text-white text-[12px] font-medium hover:opacity-90 flex items-center gap-2 transition-opacity">
                                <EyeIcon className="h-3.5 w-3.5" />
                                Voir
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InspectorDashboard;
