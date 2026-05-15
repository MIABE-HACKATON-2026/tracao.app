import React from "react";
import { StoreValidationIcon, StorePendingIcon } from "../stores/stores-icons";
import { FilterIcon, SearchIcon, CheckIcon, CloseIcon } from "../../../shared/components/icons";
import type { Batch } from "../../farms/types/batch";

interface PendingBatch extends Batch {
    farmer?: { first_name: string; last_name: string };
    parcel_area?: number;
}

import { useValidationsStore } from "../stores/validations.store";
import Modal from "../../../shared/components/atoms/Modal";

import FilterPopover from "../../../shared/components/molecules/FilterPopover";

const BatchesValidation: React.FC = () => {
    const { pendingBatches: batches, isLoading, fetchPendingBatches, validateBatch } = useValidationsStore();
    const [viewingBatch, setViewingBatch] = React.useState<any | null>(null);
    const [rejectingBatch, setRejectingBatch] = React.useState<any | null>(null);
    const [comment, setComment] = React.useState("");
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isFilterOpen, setIsFilterOpen] = React.useState(false);
    const [activeFilters, setActiveFilters] = React.useState<Record<string, string>>({
        crop_type: 'all'
    });

    React.useEffect(() => {
        fetchPendingBatches();
    }, [fetchPendingBatches]);

    const handleValidate = async (id: string, status: 'approved' | 'rejected', comment?: string) => {
        await validateBatch(id, { status, comment });
        setViewingBatch(null);
        setRejectingBatch(null);
        setComment("");
    };

    const handleFilterChange = (key: string, value: string) => {
        setActiveFilters(prev => ({ ...prev, [key]: value }));
    };

    const filteredBatches = (batches || []).filter(b => {
        const matchesSearch = 
            b.unique_code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.crop_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.farmer_name?.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCrop = activeFilters.crop_type === 'all' || b.crop_type?.toLowerCase() === activeFilters.crop_type.toLowerCase();
        
        return matchesSearch && matchesCrop;
    });

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Lots à vérifier</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Vérifiez et validez les lots déclarés</p>
                </div>
                <div className="flex gap-2 items-center relative">
                    <div className={`h-[34px] flex items-center bg-cocoa-5 rounded-[8px] transition-all duration-300 overflow-hidden ${isSearchOpen ? 'w-[200px] px-3' : 'w-[34px] justify-center cursor-pointer hover:bg-cocoa-10'}`} onClick={() => !isSearchOpen && setIsSearchOpen(true)}>
                        <SearchIcon className="h-[18px] w-[18px] text-cocoa-80 shrink-0 rotate-y-180" />
                        {isSearchOpen && (
                            <input 
                                autoFocus
                                type="text" 
                                placeholder="Rechercher..." 
                                className="bg-transparent border-none outline-none text-[12px] text-cocoa ml-2 w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onBlur={() => !searchQuery && setIsSearchOpen(false)}
                            />
                        )}
                    </div>
                    <div 
                        className={`h-[34px] w-[34px] rounded-[8px] flex items-center justify-center cursor-pointer transition-colors ${isFilterOpen ? 'bg-cocoa' : 'bg-cocoa-5 hover:bg-cocoa-10'}`}
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                        <FilterIcon className={`h-[18px] w-[18px] ${isFilterOpen ? 'text-white' : 'text-cocoa-80'}`} />
                    </div>

                    <FilterPopover 
                        isOpen={isFilterOpen}
                        onClose={() => setIsFilterOpen(false)}
                        filters={[
                            {
                                label: "Culture",
                                key: "crop_type",
                                options: [
                                    { label: "Toutes", value: "all" },
                                    { label: "Cacao", value: "cacao" },
                                    { label: "Café", value: "café" },
                                ]
                            }
                        ]}
                        activeFilters={activeFilters}
                        onFilterChange={handleFilterChange}
                    />
                </div>
            </div>

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-4 overflow-y-auto flex flex-col gap-3">
                {isLoading ? (
                    <div className="flex items-center justify-center h-40 text-cocoa-40 text-[12px]">Chargement...</div>
                ) : filteredBatches.length === 0 ? (
                    <div className="flex items-center justify-center h-40 text-cocoa-40 text-[12px]">Aucun lot trouvé</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredBatches.map((b) => (
                            <div key={b.id} className="bg-white rounded-[16px] p-6 flex flex-col gap-5 hover:shadow-md transition-shadow border border-white cursor-pointer" onClick={() => setViewingBatch(b)}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-[12px] bg-[#E3F2FD] flex items-center justify-center">
                                            <StorePendingIcon className="h-5 w-5 text-[#2196F3]" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[14px] text-cocoa font-medium font-mono">{b.unique_code}</span>
                                            <span className="text-[11px] text-cocoa-40">Culture: <span className="capitalize">{b.crop_type}</span></span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[12px] text-cocoa font-medium">{b.farmer_name || "—"}</span>
                                        <span className="text-[11px] text-cocoa-40">{b.estimated_quantity} Kg</span>
                                    </div>
                                </div>
                                
                                <div className="flex gap-3 mt-2" onClick={e => e.stopPropagation()}>
                                    <button onClick={() => handleValidate(b.id, 'approved')} className="flex-1 h-[40px] rounded-[12px] bg-[#E8F5E9] border border-[#C8E6C9] text-[13px] text-[#4CAF50] font-medium hover:bg-[#C8E6C9] transition-colors cursor-pointer flex items-center justify-center gap-2">
                                        <CheckIcon className="h-4 w-4" /> Valider
                                    </button>
                                    <button onClick={() => setRejectingBatch(b)} className="flex-1 h-[40px] rounded-[12px] bg-[#FFEBEE] border border-[#FFCDD2] text-[13px] text-[#F44336] font-medium hover:bg-[#FFCDD2] transition-colors cursor-pointer flex items-center justify-center gap-2">
                                        <CloseIcon className="h-4 w-4" /> Rejeter
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Modal isOpen={!!viewingBatch} onClose={() => setViewingBatch(null)}>
                <div className="p-8 flex flex-col gap-6 max-w-[450px] w-full">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[20px] font-medium text-cocoa">Détails du lot</h2>
                        <p className="text-[13px] text-cocoa-40">Informations de production soumises.</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        {[
                            { label: "Code unique", value: viewingBatch?.unique_code },
                            { label: "Producteur", value: viewingBatch?.farmer_name },
                            { label: "Culture", value: viewingBatch?.crop_type },
                            { label: "Quantité estimée", value: `${viewingBatch?.estimated_quantity} Kg` },
                            { label: "Date de récolte", value: viewingBatch?.harvest_date ? new Date(viewingBatch.harvest_date).toLocaleDateString("fr-FR") : "—" },
                            { label: "Parcelle d'origine", value: viewingBatch?.parcel_name || "—" },
                        ].map((f, i) => (
                            <div key={i} className="bg-cocoa-5/50 rounded-[12px] px-4 py-3 flex flex-col gap-0.5">
                                <span className="text-[11px] text-cocoa-40">{f.label}</span>
                                <span className="text-[13px] text-cocoa font-medium line-clamp-1">{f.value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        <button onClick={() => handleValidate(viewingBatch.id, 'approved')} className="h-[44px] w-full rounded-full bg-black text-white text-[13px] font-medium hover:opacity-90 transition-opacity cursor-pointer">Confirmer la validation</button>
                        <button onClick={() => { setRejectingBatch(viewingBatch); setViewingBatch(null); }} className="h-[44px] w-full rounded-full border border-red-100 text-red-500 text-[13px] font-medium hover:bg-red-50 transition-colors cursor-pointer">Rejeter le lot</button>
                        <button onClick={() => setViewingBatch(null)} className="h-[44px] w-full rounded-full bg-cocoa-5 text-cocoa-40 text-[13px] font-medium hover:bg-cocoa-10 transition-colors cursor-pointer">Fermer</button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={!!rejectingBatch} onClose={() => setRejectingBatch(null)}>
                <div className="p-8 flex flex-col gap-6 max-w-[400px] w-full">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[20px] font-medium text-cocoa">Motif du rejet</h2>
                        <p className="text-[13px] text-cocoa-40">Précisez la raison du rejet de ce lot.</p>
                    </div>
                    <textarea placeholder="Ex: Qualité non conforme, Quantité suspecte..." className="h-[120px] bg-cocoa-5 rounded-[16px] p-4 text-[14px] outline-none focus:ring-1 focus:ring-cocoa-20 placeholder:text-cocoa-40 resize-none" value={comment} onChange={e => setComment(e.target.value)} />
                    <div className="flex flex-col gap-2">
                        <button onClick={() => handleValidate(rejectingBatch.id, 'rejected', comment)} disabled={!comment.trim()} className="h-[48px] w-full rounded-full bg-[#F44336] text-white text-[14px] font-medium hover:opacity-90 disabled:opacity-50 cursor-pointer">Confirmer le rejet</button>
                        <button onClick={() => { setRejectingBatch(null); setComment(""); }} className="h-[48px] w-full rounded-full bg-cocoa-5 text-cocoa text-[14px] font-medium hover:bg-cocoa-10 cursor-pointer">Annuler</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default BatchesValidation;
