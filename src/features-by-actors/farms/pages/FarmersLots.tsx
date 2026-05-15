import React from "react";
import { AddIcon, ArrowDownIcon, FarmersLotsIcon, FilterIcon, FarmersQrIcon, SearchIcon, CalendarIcon, ShareIcon, DownloadIcon, CheckIcon, UsersIcon } from "../../../shared/components/icons";
import { useLotsStore } from "../stores/lots.store";
import { useFarmsStore } from "../stores/farms.store";
import Modal from "../../../shared/components/atoms/Modal";
import type { Batch } from "../types/batch";

const FarmersLots: React.FC = () => {
    const { lots, isLoading, error, fetchLots } = useLotsStore();
    const { parcels, fetchParcels } = useFarmsStore();
    
    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
    const [selectedLot, setSelectedLot] = React.useState<Batch | null>(null);

    React.useEffect(() => {
        fetchLots();
        fetchParcels();
    }, [fetchLots, fetchParcels]);

    const getParcelName = (id: string) => {
        return parcels.find(p => p.id === id)?.name || "Parcelle inconnue";
    };

    return (
        <div className="w-full h-full flex flex-col gap-5 relative">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Gestion des lots</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Gérer efficacement vos lots</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer hover:bg-cocoa-10 transition-colors">
                        <SearchIcon className="h-[18px] w-[18px] fill-cocoa-80 rotate-y-180" />
                    </div>
                    
                    <div className="h-[34px] bg-cocoa-5 rounded-[8px] flex items-center overflow-hidden">
                        <div 
                            className="flex items-center px-4 gap-2 h-full cursor-pointer hover:bg-cocoa-10 transition-colors"
                            onClick={() => setIsCreateModalOpen(true)}
                        >
                            <FarmersLotsIcon className="h-[18px] w-[18px] fill-cocoa-80" />
                            <span className="text-[12px] text-cocoa-80">Créer un lot</span>
                        </div>
                        <div className="h-[34px] w-[34px] border-l border-l-[0.4px] border-l-cocoa-20 flex items-center justify-center cursor-pointer hover:bg-cocoa-10 transition-colors">
                            <ArrowDownIcon className="h-[18px] w-[18px] fill-cocoa-80" />
                        </div>
                    </div>

                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                        <FilterIcon className="h-[18px] w-[18px] fill-white" />
                    </div>
                </div>
            </div>

            <div className="p-4 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-max h-full w-full rounded-[16px] bg-cocoa-5 overflow-y-auto">
                {isLoading ? (
                    <div className="col-span-full h-40 flex items-center justify-center text-cocoa-40 text-[12px]">
                        Chargement des lots...
                    </div>
                ) : error ? (
                    <div className="col-span-full h-40 flex items-center justify-center text-red-500 text-[12px]">
                        {error}
                    </div>
                ) : (
                    <>
                        {(lots || []).map((lot, index) => (
                            <div 
                                key={lot.id} 
                                onClick={() => setSelectedLot(lot)}
                                className="p-3 bg-white/50 rounded-[12px] flex flex-col gap-3 border border-white hover:bg-white hover:shadow-sm transition-all cursor-pointer"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <FarmersLotsIcon className="h-4 w-4 fill-cocoa-40" />
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[14px] text-cocoa font-medium">Lot {(index + 1).toString().padStart(2, '0')}</span>
                                            <div className="h-1 w-1 rounded-full bg-cocoa-20"></div>
                                            <span className="text-[12px] text-cocoa-40">{getParcelName(lot.parcel_id)}</span>
                                        </div>
                                    </div>
                                    <div className="p-1 rounded-md transition-colors">
                                        <FarmersQrIcon className="h-4 w-4 fill-cocoa-40" />
                                    </div>
                                </div>

                                <div className="bg-cocoa rounded-[8px] p-4 flex flex-col gap-4 relative overflow-hidden">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[14px] text-white font-medium capitalize">{lot.crop_type}</span>
                                            <div className="h-1 w-1 rounded-full bg-white/20"></div>
                                            <span className="text-[12px] text-white/40">{lot.season}</span>
                                        </div>
                                        <div className="px-2 py-0.5 rounded-full bg-white/10 border border-white/5 text-[10px] text-white/60 capitalize">
                                            {lot.status === 'draft' ? 'Brouillon' : lot.status}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-[6px] overflow-hidden">
                                        <div className="p-2 flex flex-col gap-2">
                                            <span className="text-[10px] text-white/40 font-normal">Qte éstimé</span>
                                            <span className="text-[16px] text-white font-medium">{lot.estimated_quantity} <span className="text-[12px] text-white/40">Kg</span></span>
                                        </div>
                                        <div className="p-2 flex flex-col gap-2 border-l border-white/5">
                                            <span className="text-[10px] text-white/40 font-normal">Qte recolté</span>
                                            <span className="text-[16px] text-white/40 font-medium">--- <span className="text-[12px]">Kg</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div 
                            className="rounded-[12px] h-[190px] border border-dashed border-cocoa-20 flex items-center justify-center cursor-pointer hover:bg-white/40 transition-colors"
                            onClick={() => setIsCreateModalOpen(true)}
                        >
                             <div className="h-8 w-8 rounded-[8px] bg-cocoa-5 flex items-center justify-center">
                                <AddIcon className="h-4 w-4 fill-cocoa-20" />
                             </div>
                        </div>
                    </>
                )}
            </div>

            {/* Modal de création */}
            <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
                <div className="p-8 flex flex-col gap-6">
                    <h2 className="text-[20px] font-medium text-cocoa">Création d’un nouveau lot</h2>
                    
                    <div className="flex flex-col gap-4">
                        <div className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 flex items-center">
                            <span className="text-[14px] text-cocoa-20">TRC-YYYY-XXXX-aytevrje123</span>
                        </div>
                        <input type="text" placeholder="Entrer le libellé du lot" className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none focus:ring-1 focus:ring-cocoa-20 placeholder:text-cocoa-40" />
                        <div className="flex flex-col gap-3">
                            <span className="text-[12px] text-cocoa-60">Choix de culture</span>
                            <div className="flex gap-4">
                                <div className="flex-1 h-[48px] bg-cocoa-5 rounded-[12px] px-4 flex items-center justify-between cursor-pointer border border-transparent hover:border-cocoa-10 transition-all">
                                    <span className="text-[14px] text-cocoa-40">Cacao</span>
                                    <div className="h-4 w-4 rounded-full border border-cocoa-20"></div>
                                </div>
                                <div className="flex-1 h-[48px] bg-cocoa-5 rounded-[12px] px-4 flex items-center justify-between cursor-pointer border border-transparent hover:border-cocoa-10 transition-all">
                                    <span className="text-[14px] text-cocoa-40">Café</span>
                                    <div className="h-4 w-4 rounded-full border border-cocoa-20"></div>
                                </div>
                            </div>
                        </div>
                        <div className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 flex items-center justify-between cursor-pointer border border-transparent hover:border-cocoa-10 transition-all">
                            <span className="text-[14px] text-cocoa-40">Sélectionnez la parcelle correspondante</span>
                            <ArrowDownIcon className="h-4 w-4 fill-cocoa-40" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="text-[12px] text-cocoa-60">Définisser la saison</span>
                            <div className="flex gap-4">
                                <div className="flex-1 h-[48px] bg-cocoa-5 rounded-[12px] px-4 flex items-center justify-between">
                                    <span className="text-[14px] text-cocoa-40">Année de début</span>
                                    <CalendarIcon className="h-4 w-4 text-cocoa-40" />
                                </div>
                                <div className="flex-1 h-[48px] bg-cocoa-5 rounded-[12px] px-4 flex items-center justify-between">
                                    <span className="text-[14px] text-cocoa-40">Année de fin</span>
                                    <CalendarIcon className="h-4 w-4 text-cocoa-40" />
                                </div>
                            </div>
                        </div>
                        <input type="text" placeholder="Quantité estimé en kilogramme (kg)" className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none focus:ring-1 focus:ring-cocoa-20 placeholder:text-cocoa-40" />
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button onClick={() => setIsCreateModalOpen(false)} className="h-[48px] px-8 rounded-full bg-cocoa-5 text-cocoa text-[14px] font-medium hover:bg-cocoa-10 transition-colors">Annuler</button>
                        <button className="h-[48px] px-8 rounded-full bg-black text-white text-[14px] font-medium hover:opacity-90 transition-opacity">Créer le lot</button>
                    </div>
                </div>
            </Modal>

            {/* Modal de détails */}
            <Modal isOpen={!!selectedLot} onClose={() => setSelectedLot(null)} transparentContainer>
                <div className="flex gap-5 items-start">
                    {/* Bloc principal (Gauche) */}
                    <div className="bg-white rounded-[24px] p-8 flex flex-col gap-6 flex-1">
                        <div className="flex justify-between items-center">
                            <h2 className="text-[20px] font-medium text-cocoa">Détails d’un lot</h2>
                            <div className="h-4 w-4 text-cocoa-20 border border-cocoa-10 rounded-[4px] flex items-center justify-center cursor-pointer hover:bg-cocoa-5">
                                <span className="text-[10px]">□</span>
                            </div>
                        </div>

                        {/* Section QR Code */}
                        <div className="bg-cocoa-5 rounded-[16px] p-4 flex gap-4 items-center">
                            <div className="bg-white p-3 rounded-[12px] shadow-sm">
                                <FarmersQrIcon className="h-16 w-16 fill-cocoa" />
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <div className="px-2 py-0.5 rounded-full bg-[#E8F5E9] border border-[#C8E6C9] flex items-center gap-1.5">
                                        <CheckIcon className="h-3 w-3 fill-[#4CAF50]" />
                                        <span className="text-[10px] text-[#4CAF50] font-medium">Accepté</span>
                                    </div>
                                </div>
                                <span className="text-[14px] text-cocoa font-medium">TRC-YYYY-XXXX-jduhygzfg123</span>
                                <span className="text-[10px] text-cocoa-20">Généré le 11 Janvier 2026</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button className="h-[34px] w-[34px] bg-white rounded-[8px] flex items-center justify-center hover:bg-cocoa-5 transition-colors border border-cocoa-5">
                                    <ShareIcon className="h-[18px] w-[18px] text-cocoa-40" />
                                </button>
                                <button className="h-[34px] w-[34px] bg-white rounded-[8px] flex items-center justify-center hover:bg-cocoa-5 transition-colors border border-cocoa-5">
                                    <DownloadIcon className="h-[18px] w-[18px] text-cocoa-40" />
                                </button>
                            </div>
                        </div>

                        {/* Liste des champs */}
                        <div className="flex flex-col gap-3">
                            {[
                                { label: "Libellé :", value: "Lot 01" },
                                { label: "Parcelle :", value: "Parcelle A" },
                                { label: "Choix culture :", value: "Cacao" },
                                { label: "Saison :", value: "2025 - 2026" },
                                { label: "Quantité estimé :", value: "104 Kg" }
                            ].map((field, i) => (
                                <div key={i} className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 flex items-center justify-between">
                                    <span className="text-[14px] text-cocoa-40">{field.label}</span>
                                    <span className="text-[14px] text-cocoa font-medium">{field.value}</span>
                                </div>
                            ))}
                        </div>

                        <button 
                            onClick={() => setSelectedLot(null)}
                            className="h-[48px] px-8 rounded-full bg-cocoa-5 text-cocoa text-[14px] font-medium hover:bg-cocoa-10 transition-colors self-end mt-2"
                        >
                            Fermer
                        </button>
                    </div>

                    {/* Blocs de droite */}
                    <div className="flex flex-col gap-5 w-[320px]">
                        {/* Historique des récoltes */}
                        <div className="bg-white rounded-[24px] p-6 flex flex-col gap-4">
                            <h3 className="text-[16px] font-medium text-cocoa">Historique des recoltes</h3>
                            <div className="flex flex-col gap-2">
                                {[
                                    { date: "11-01-2025", weight: "53Kg" },
                                    { date: "11-12-2025", weight: "673Kg" },
                                    { date: "11-12-2025", weight: "673Kg" }
                                ].map((h, i) => (
                                    <div key={i} className="h-[44px] bg-cocoa-5 rounded-[10px] px-4 flex items-center justify-between">
                                        <span className="text-[12px] text-cocoa-40">{h.date}</span>
                                        <span className="text-[12px] text-cocoa font-medium">{h.weight}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Transactions associées */}
                        <div className="bg-white rounded-[24px] p-6 flex flex-col gap-4 h-[240px]">
                            <h3 className="text-[16px] font-medium text-cocoa">Transactions associés</h3>
                            <div className="flex-1 flex flex-col items-center justify-center gap-3 opacity-30">
                                <UsersIcon className="h-10 w-10 fill-cocoa" />
                                <span className="text-[12px] text-cocoa">Aucune transaction</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default FarmersLots;
