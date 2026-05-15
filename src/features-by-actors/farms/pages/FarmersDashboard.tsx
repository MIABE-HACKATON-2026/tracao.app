import React from "react";
import { 
    FlashIcon, 
    CheckIcon, 
    FarmersLotsIcon, 
    FarmersParcelsIcon, 
    FarmersHarvestIcon, 
    ArrowRightIcon, 
    MapIcon,
    EyeIcon
} from "../../../shared/components/icons";
import { Link } from "react-router-dom";

const FarmersDashboard: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[20px] font-medium text-cocoa">Bonjour, Ibrahim KONDO</h1>
                    <p className="text-[14px] text-cocoa-60">Bienvenue sur votre espace de gestion</p>
                </div>
                <div className="flex gap-2">
                    <Link to="/farmers/kyc" className="h-[36px] px-4 rounded-[8px] bg-cocoa-5 flex items-center gap-2 hover:bg-cocoa-10 transition-colors">
                        <CheckIcon className="h-3.5 w-3.5 text-cocoa-40" />
                        <span className="text-[12px] text-cocoa font-medium">Compléter mon KYC</span>
                    </Link>
                    <button className="h-[36px] w-[36px] rounded-[8px] bg-cocoa-10 flex items-center justify-center hover:bg-cocoa-20 transition-colors">
                        <FlashIcon className="h-4 w-4 text-cocoa-60" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-cocoa-80 rounded-[16px] p-5 flex flex-col gap-4 relative overflow-hidden group cursor-pointer transition-all">
                    <div className="flex items-start justify-between relative z-10">
                        <div className="h-9 w-9 rounded-[8px] bg-white/10 flex items-center justify-center">
                            <FarmersLotsIcon className="h-4 w-4" />
                        </div>
                        <span className="text-white/40 text-[12px]">...</span>
                    </div>
                    <div className="relative z-10">
                        <span className="text-[28px] text-white font-medium">27 Lots</span>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[12px] text-white/60">10 lots validés</span>
                        </div>
                    </div>
                    <div className="pt-3 border-t border-white/10 flex justify-between items-center relative z-10">
                        <span className="text-[11px] text-white/50">Voir les détails</span>
                        <ArrowRightIcon className="h-3.5 w-3.5 text-white/50 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                </div>

                <div className="bg-cocoa-5 rounded-[16px] p-5 flex flex-col gap-4 border border-cocoa-5 transition-all group cursor-pointer">
                    <div className="flex items-start justify-between">
                        <div className="h-9 w-9 rounded-[8px] bg-white flex items-center justify-center">
                            <FarmersParcelsIcon className="h-4 w-4 fill-cocoa-40" />
                        </div>
                        <span className="text-cocoa-10 text-[12px]">...</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-[28px] text-cocoa font-medium">14</span>
                        <span className="text-[14px] text-cocoa-40 font-normal">parcelles / 200 Ha</span>
                    </div>
                    <div className="pt-3 border-t border-cocoa-10 flex justify-between items-center">
                        <span className="text-[11px] text-cocoa-40">Visiter sur la carte</span>
                        <MapIcon className="h-3.5 w-3.5 text-cocoa-30 group-hover:scale-105 transition-transform" />
                    </div>
                </div>

                <div className="bg-cocoa-5 rounded-[16px] p-5 flex flex-col gap-4 border border-cocoa-5 transition-all group cursor-pointer">
                    <div className="flex items-start justify-between">
                        <div className="h-9 w-9 rounded-[8px] bg-white flex items-center justify-center">
                            <FarmersHarvestIcon className="h-4 w-4 fill-cocoa-40" />
                        </div>
                        <span className="text-cocoa-10 text-[12px]">...</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-[28px] text-cocoa font-medium">1200</span>
                        <span className="text-[14px] text-cocoa-40 font-normal">Kg</span>
                    </div>
                    <div className="pt-3 border-t border-cocoa-10 flex justify-between items-center">
                        <span className="text-[11px] text-cocoa-40">Voir les récoltes</span>
                        <ArrowRightIcon className="h-3.5 w-3.5 text-cocoa-30 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 flex-1 min-h-0">
                <div className="flex-1 bg-white rounded-[16px] border border-cocoa-5 overflow-hidden flex flex-col">
                    <div className="grid grid-cols-3 flex-1">
                        <div className="p-5 border-r border-b border-cocoa-5 flex flex-col items-center justify-center gap-3 text-center">
                            <FarmersLotsIcon className="h-5 w-5 fill-cocoa-20" />
                            <div className="flex flex-col items-center">
                                <span className="text-[11px] text-cocoa-20">Lots 3</span>
                                <span className="text-[13px] text-cocoa font-medium">Prêt pour la récolte</span>
                            </div>
                            <button className="px-5 py-1 rounded-[6px] bg-cocoa-5 text-[11px] text-cocoa font-medium hover:bg-cocoa-10 flex items-center gap-1.5 transition-colors">
                                <EyeIcon className="h-3 w-3" />
                                Voir
                            </button>
                        </div>
                        <div className="p-5 border-r border-b border-cocoa-5 flex flex-col items-center justify-center gap-3 text-center">
                            <FarmersLotsIcon className="h-5 w-5 fill-cocoa-20" />
                            <div className="flex flex-col items-center">
                                <span className="text-[11px] text-cocoa-20">Lots 3</span>
                                <span className="text-[13px] text-cocoa font-medium">Lot non validé</span>
                            </div>
                            <button className="px-5 py-1 rounded-[6px] bg-cocoa-5 text-[11px] text-cocoa-40 font-medium hover:bg-cocoa-10 flex items-center gap-1.5 transition-colors">
                                <EyeIcon className="h-3 w-3" />
                                Revérifier
                            </button>
                        </div>
                        <div className="p-5 border-b border-cocoa-5 flex items-center justify-center">
                            <Link to="/farmers/lots" className="px-5 py-1.5 rounded-[6px] bg-cocoa-80 text-white text-[11px] font-medium hover:opacity-90 flex items-center gap-1.5 transition-opacity">
                                <EyeIcon className="h-3 w-3" />
                                Voir tous les lots
                            </Link>
                        </div>

                        <div className="p-5 border-r border-cocoa-5 flex items-center">
                            <span className="text-[13px] text-cocoa font-medium uppercase tracking-wider">L001</span>
                        </div>
                        <div className="p-5 border-r border-cocoa-5 flex items-center">
                            <span className="text-[12px] text-cocoa-40">En attente</span>
                        </div>
                        <div className="p-5 flex items-center">
                            <span className="text-[12px] text-cocoa font-medium underline underline-offset-2 decoration-cocoa-20 cursor-pointer hover:decoration-cocoa transition-all">Voir</span>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex w-[360px] bg-white rounded-[16px] border border-cocoa-5 p-5 relative overflow-hidden items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
                        <path d="M50,100 L150,50 L300,100 L350,200 L200,280 L50,250 Z" className="fill-cocoa" />
                    </svg>
                    <div className="relative flex flex-col items-center gap-2">
                        <svg width="200" height="160" viewBox="0 0 200 160">
                            <path d="M30,50 L150,30 L180,120 L80,140 L15,110 Z" className="fill-cocoa-60" />
                            <text x="80" y="95" fill="white" className="text-[10px] font-medium pointer-events-none">Parcelle 1</text>
                        </svg>
                        <span className="text-[11px] text-cocoa-20">Aperçu de vos parcelles</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FarmersDashboard;
