import React from "react";
import { ArrowDownIcon, FarmersLotsIcon, EditIcon, ArrowLeftIcon, CheckIcon } from "../../../shared/components/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useFarmsStore } from "../stores/farms.store";

const FarmersParcelsDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { parcels } = useFarmsStore();
    
    // Pour la démo, on cherche la parcelle ou on utilise des données mockées si non trouvée
    const parcel = parcels.find(p => p.id === id) || {
        name: "Parcelle B",
        area: 20,
        status: "approved"
    };

    return (
        <div className="w-full h-full flex flex-col gap-5">
            {/* Header de la page */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="h-[34px] w-[34px] rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer hover:bg-cocoa-10 transition-colors"
                    >
                        <ArrowLeftIcon className="h-[18px] w-[18px] fill-cocoa-80" />
                    </button>
                    <div className="flex flex-col items-start gap-1">
                        <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Détails parcelle</h1>
                        <p className="text-[12px] leading-[16px] text-cocoa-60">Détails de votre parcelle</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                        <EditIcon className="h-[18px] w-[18px] text-white" />
                    </button>
                    
                    <div className="h-[34px] bg-cocoa-5 rounded-[8px] flex items-center overflow-hidden">
                        <div className="flex items-center px-4 gap-2 h-full cursor-pointer hover:bg-cocoa-10 transition-colors">
                            <FarmersLotsIcon className="h-[18px] w-[18px] fill-cocoa-80" />
                            <span className="text-[12px] text-cocoa-80">Créer un lot</span>
                        </div>
                        <div className="h-[34px] w-[34px] border-l border-l-[0.4px] border-l-cocoa-20 flex items-center justify-center cursor-pointer hover:bg-cocoa-10 transition-colors">
                            <ArrowDownIcon className="h-[18px] w-[18px] fill-cocoa-80" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Zone de visualisation (Carte) */}
            <div className="flex-1 w-full rounded-[16px] bg-[#F7F6F5] relative overflow-hidden border border-cocoa-5" style={{ backgroundImage: 'radial-gradient(#D9D9D9 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                
                {/* Infos sur la parcelle (Overlay haut) */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-none z-10">
                    <span className="text-[14px] leading-[16px] text-cocoa-20 font-normal">Enregistré</span>
                    <div className="flex flex-col items-end">
                        <span className="text-[14px] leading-[16px] text-cocoa-80 font-normal mb-2">{parcel.name}</span>
                        <span className="text-[32px] leading-[32px] text-cocoa-40 font-medium">{parcel.area} <span className="text-[20px]">ha</span></span>
                    </div>
                </div>

                {/* Stats latérales (Milieu droite) */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-end gap-6 pointer-events-none z-10">
                    <div className="flex flex-col items-end">
                        <span className="text-[12px] text-cocoa-80 font-normal">2 Lots</span>
                        <span className="text-[28px] leading-[32px] text-cocoa-40 font-medium">105 <span className="text-[18px]">Kg</span></span>
                        <span className="text-[12px] text-cocoa-20 mt-1">11 Jan</span>
                    </div>
                </div>

                {/* Simulation de polygone (SVG) */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="600" height="400" viewBox="0 0 600 400" className="drop-shadow-sm opacity-60">
                        <path 
                            d="M200 200 L250 250 L240 350 L300 340 L310 300 L350 300 L360 250 L400 200 L450 150 L430 80 L350 120 L300 130 L250 110 Z" 
                            fill="white" 
                            fillOpacity="0.3"
                            stroke="#D1C7BD" 
                            strokeWidth="1"
                            strokeDasharray="4 2"
                        />
                        {[
                            {x: 200, y: 200, n: "01"}, {x: 250, y: 250, n: "02"}, {x: 240, y: 350, n: "03"},
                            {x: 300, y: 340, n: "04"}, {x: 290, y: 310, n: "05"}, {x: 330, y: 310, n: "06"},
                            {x: 325, y: 280, n: "07"}, {x: 400, y: 265, n: "08"}, {x: 410, y: 215, n: "09"},
                            {x: 495, y: 185, n: "10"}, {x: 500, y: 110, n: "11"}, {x: 450, y: 65, n: "12"},
                            {x: 330, y: 125, n: "13"}, {x: 280, y: 115, n: "14"}
                        ].map((p, i) => (
                            <g key={i}>
                                <circle cx={p.x} cy={p.y} r="3" fill="#D1C7BD" />
                                <text x={p.x - 12} y={p.y - 8} className="text-[12px] fill-cocoa select-none font-medium opacity-50">{p.n}</text>
                            </g>
                        ))}
                    </svg>
                </div>

                {/* Badge de statut bas gauche */}
                <div className="absolute bottom-6 left-6">
                    <div className="h-[34px] bg-cocoa-5 rounded-[8px] flex items-center overflow-hidden border border-cocoa-10 shadow-sm">
                        <div className="px-3 text-[12px] text-cocoa-80 font-medium">Actif</div>
                        <div className="h-[34px] w-[34px] bg-cocoa flex items-center justify-center">
                            <CheckIcon className="h-[16px] w-[16px] fill-white" />
                        </div>
                    </div>
                </div>

                {/* Image preview bas droite */}
                <div className="absolute bottom-6 right-6">
                    <div className="h-[60px] w-[60px] rounded-[12px] overflow-hidden border-[3px] border-white shadow-md">
                        <img 
                            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                            alt="Parcel view" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FarmersParcelsDetails;
