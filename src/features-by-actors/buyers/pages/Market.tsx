import React from "react";
import { BuyerMarketIcon, BuyerBlockchainIcon } from "../components/buyer-icons";
import { FilterIcon, SearchIcon } from "../../../shared/components/icons";
import Modal from "../../../shared/components/atoms/Modal";
import { useMarketStore } from "../stores/market.store";
import type { Batch } from "../../farms/types/batch";

const Market: React.FC = () => {
    const { batches, isLoading, error, fetchBatches } = useMarketStore();
    const [selectedLot, setSelectedLot] = React.useState<Batch | null>(null);

    React.useEffect(() => { fetchBatches(); }, [fetchBatches]);

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Explorer les lots</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Parcourez les lots disponibles à l'achat</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer"><SearchIcon className="h-[18px] w-[18px] fill-cocoa-80 rotate-y-180" /></div>
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer"><FilterIcon className="h-[18px] w-[18px] fill-white" /></div>
                </div>
            </div>

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-4 overflow-y-auto">
                {isLoading ? (
                    <div className="flex items-center justify-center h-40 text-cocoa-40 text-[12px]">Chargement...</div>
                ) : error ? (
                    <div className="flex items-center justify-center h-40 text-red-500 text-[12px]">{error}</div>
                ) : batches.length === 0 ? (
                    <div className="flex items-center justify-center h-40 text-cocoa-40 text-[12px]">Aucun lot disponible</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {batches.map((lot) => (
                            <div key={lot.id} className="bg-white/50 rounded-[16px] p-4 flex flex-col gap-3 border border-white hover:bg-white hover:shadow-sm transition-all cursor-pointer" onClick={() => setSelectedLot(lot)}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-[14px] text-cocoa font-mono font-medium">{lot.unique_code}</span>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[11px] text-cocoa-40 capitalize">{lot.crop_type}</span>
                                            <span className="text-cocoa-20">·</span>
                                            <span className="text-[11px] text-cocoa-40">{lot.season}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-cocoa rounded-[10px] p-3 flex flex-col gap-2">
                                    <div className="flex justify-between">
                                        <span className="text-[12px] text-white/60">Disponible</span>
                                        <span className="text-[16px] text-white font-medium">{lot.estimated_quantity} <span className="text-[11px] text-white/60">Kg</span></span>
                                    </div>
                                </div>
                                <button className="h-[34px] rounded-[8px] bg-cocoa text-white text-[12px] font-medium hover:opacity-90 transition-opacity cursor-pointer" onClick={(e) => { e.stopPropagation(); setSelectedLot(lot); }}>
                                    Initier un achat
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Modal isOpen={!!selectedLot} onClose={() => setSelectedLot(null)}>
                <div className="p-8 flex flex-col gap-6">
                    <h2 className="text-[20px] font-medium text-cocoa">Acheter le lot</h2>
                    {[
                        { label: "Code", value: selectedLot?.unique_code },
                        { label: "Culture", value: selectedLot?.crop_type },
                        { label: "Saison", value: selectedLot?.season },
                        { label: "Quantité", value: `${selectedLot?.estimated_quantity} Kg` },
                    ].map((f, i) => (
                        <div key={i} className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 flex items-center justify-between"><span className="text-[14px] text-cocoa-40">{f.label}</span><span className="text-[14px] text-cocoa font-medium">{f.value}</span></div>
                    ))}
                    <input type="number" placeholder="Quantité à acheter (Kg)" className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none focus:ring-1 focus:ring-cocoa-20 placeholder:text-cocoa-40" />
                    <div className="flex justify-end gap-3 mt-4">
                        <button onClick={() => setSelectedLot(null)} className="h-[48px] px-8 rounded-full bg-cocoa-5 text-cocoa text-[14px] font-medium hover:bg-cocoa-10 cursor-pointer">Annuler</button>
                        <button className="h-[48px] px-8 rounded-full bg-black text-white text-[14px] font-medium hover:opacity-90 cursor-pointer">Confirmer l'achat</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Market;
