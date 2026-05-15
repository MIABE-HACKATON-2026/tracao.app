import React from "react";
import { AddIcon, ArrowDownIcon, FarmersParcelsIcon, FilterIcon, OptionIcon, SearchIcon } from "../../../shared/components/icons";
import { useFarmsStore } from "../stores/farms.store";
import { Link } from "react-router";

const FarmersParcels: React.FC = () => {
    const { parcels, isLoading, error, fetchParcels } = useFarmsStore();
    
    // États indépendants pour les popovers
    const [isTopPopoverOpen, setIsTopPopoverOpen] = React.useState(false);
    const [isCardPopoverOpen, setIsCardPopoverOpen] = React.useState(false);
    
    const topPopoverRef = React.useRef<HTMLDivElement>(null);
    const cardPopoverRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        fetchParcels();
    }, [fetchParcels]);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Fermeture du popover du haut
            if (topPopoverRef.current && !topPopoverRef.current.contains(event.target as Node)) {
                setIsTopPopoverOpen(false);
            }
            // Fermeture du popover de la carte
            if (cardPopoverRef.current && !cardPopoverRef.current.contains(event.target as Node)) {
                setIsCardPopoverOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Gestion des parcelles</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Gérez vos exploitations et parcelles agricoles ici.</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer">
                        <SearchIcon className="h-[18px] w-[18px] fill-cocoa-80 rotate-y-180" />
                    </div>
                    <div className="relative" ref={topPopoverRef}>
                        <div className="w-[204px] h-[34px] bg-cocoa-5 rounded-[8px] flex items-center pl-4 gap-3 justify-end overflow-hidden">
                            <FarmersParcelsIcon className="h-[18px] w-[18px] fill-cocoa-80" />
                            <p className="text-[12px] leading-[16px] font-normal text-cocoa-80">Créer une parcelle</p>
                            <div 
                                className="h-[34px] w-[34px] border-l border-l-[0.4px] border-l-cocoa-20 flex items-center justify-center cursor-pointer hover:bg-cocoa-10 transition-colors"
                                onClick={() => setIsTopPopoverOpen(!isTopPopoverOpen)}
                            >
                                <ArrowDownIcon className="h-[18px] w-[18px] fill-cocoa-80" />
                            </div>
                        </div>

                        {isTopPopoverOpen && (
                            <div className="absolute top-[40px] right-0 w-[204px] bg-white rounded-[8px] shadow-[4px_4px_16px_0px_#0000000D] border border-cocoa-5 p-2 z-50 flex flex-col gap-3">
                                <button className="w-full flex items-center justify-between gap-3 px-3 py-2 text-[12px] h-[34px] bg-cocoa-5 px-3 rounded-[8px] text-cocoa-80 hover:bg-cocoa-5 rounded-[4px] transition-colors cursor-not-allowed">
                                    <div className="text-cocoa-40 text-[12px] leading-[16px]">GPS Marche</div>
                                    <div className="text-cocoa-40 text-[8px] leading-[16px]">Mobile only</div>
                                </button>
                                <Link to="/farmers/parcels/new" className="w-full flex items-center justify-between gap-3 px-3 py-2 text-[12px] h-[34px] bg-cocoa-5 px-3 rounded-[8px] text-cocoa-80 hover:bg-cocoa-5 rounded-[4px] transition-colors cursor-pointer">
                                    <div className="text-cocoa-40 text-[12px] leading-[16px]">Dessin Carte</div>
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer">
                        <FilterIcon className="h-[18px] w-[18px] fill-white" />
                    </div>
                </div>
            </div>

            <div className="p-4 gap-4 grid grid-cols-3 auto-rows-max h-full w-full rounded-[16px] bg-cocoa-5 overflow-y-auto">
                {isLoading ? (
                    <div className="col-span-full h-40 flex items-center justify-center text-cocoa-40 text-[12px]">
                        Chargement des parcelles...
                    </div>
                ) : error ? (
                    <div className="col-span-full h-40 flex items-center justify-center text-red-500 text-[12px]">
                        {error}
                    </div>
                ) : (
                    <>
                        {parcels.map((parcel) => (
                            <div key={parcel.id} className="p-3 bg-cocoa-5 h-[210px] grow rounded-[8px] flex flex-col items-center justify-between">
                                <div className="w-full h-5 flex items-center justify-between">
                                    <div className="flex items-center justify-start gap-2">
                                        <div className="h-5 w-5 rounded-[2px] bg-cocoa-10"></div>
                                        <div className="text-cocoa text-[14px] leading-[16px]">{parcel.name}</div>
                                    </div>
                                     <div className="h-5 w-5 rounded-[2px] bg-cocoa-5 flex items-center justify-center cursor-pointer hover:bg-cocoa-10">
                                        <OptionIcon className="fill-cocoa-80" />
                                     </div>
                                </div>
                                <div className=""><img src="/minimap.png" alt="" /></div>
                                <div className="h-6 flex items-end justify-between w-full">
                                    <div className="min-w-[157px] px-2 py-1 bg-cocoa-10 rounded-[4px] h-6 text-cocoa-40 text-[12px] leading-[16px] flex items-center gap-3">
                                        <div className="text-[11px] leading-[16px] text-cocoa capitalize">
                                            {parcel.status === 'approved' ? 'Actif' : parcel.status}
                                        </div>
                                        <div className="w-[1px] h-[12px] bg-cocoa-20"></div>
                                        <div className="text-[11px] leading-[16px] text-cocoa">0 Lots</div>
                                        <div className="w-[1px] h-[12px] bg-cocoa-20"></div>
                                        <div className="text-[11px] leading-[16px] text-cocoa">0 Kg</div>
                                    </div>
                                    <div className="text-cocoa-80 text-[16px] leading-[16px]">
                                        {parcel.area}<span className="text-cocoa-20">ha</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="rounded-[8px] h-[210px] border border-dashed border-cocoa-20 flex items-center justify-center">
                            <div className="relative" ref={cardPopoverRef}>
                                <div className="h-[34px] bg-cocoa-5 rounded-[8px] flex items-center justify-end overflow-hidden">
                                    <div className="h-[34px] w-[34px] flex items-center justify-center">
                                        <AddIcon className="h-[18px] w-[18px] fill-cocoa-20" />
                                    </div>
                                    <div 
                                        className="h-[34px] w-[34px] border-l border-l-[0.4px] border-l-cocoa-20 flex items-center justify-center cursor-pointer hover:bg-cocoa-10 transition-colors"
                                        onClick={() => setIsCardPopoverOpen(!isCardPopoverOpen)}
                                    >
                                        <ArrowDownIcon className="h-[18px] w-[18px] fill-cocoa-80" />
                                    </div>
                                </div>

                                {isCardPopoverOpen && (
                                    <div className="absolute top-[40px] right-0 w-[204px] bg-white rounded-[8px] shadow-[4px_4px_16px_0px_#0000000D] border border-cocoa-5 p-2 z-50 flex flex-col gap-3">
                                        <Link to="/farmers/parcels/new" className="w-full flex items-center justify-between gap-3 px-3 py-2 text-[12px] h-[34px] bg-cocoa-5 px-3 rounded-[8px] text-cocoa-80 hover:bg-cocoa-5 rounded-[4px] transition-colors cursor-pointer">
                                            <div className="text-cocoa-40 text-[12px] leading-[16px]">Dessin Carte</div>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default FarmersParcels;
