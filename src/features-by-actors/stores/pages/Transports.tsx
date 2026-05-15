import transportersService, { type Transporter } from "../services/transporters.service";
import { useValidationsStore } from "../stores/validations.store";
import { ApiClient } from "../../../shared/api/api-client";
import React from "react";
import type { Transport } from "../types/transport";
import { useTransportsStore } from "../stores/transports.store";
import { AddIcon, ArrowDownIcon, FilterIcon, SearchIcon, StoreTransportIcon } from "../../../shared/components/icons";
import FilterPopover from "../../../shared/components/molecules/FilterPopover";
import Modal from "../../../shared/components/atoms/Modal";
import { useStoresStore } from "../stores/stores.store";

const Transports: React.FC = () => {
    const { transports, isLoading, error, fetchTransports, createTransport } = useTransportsStore();
    const { store, fetchStore } = useStoresStore();
    const [selectedTransport, setSelectedTransport] = React.useState<Transport | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isFilterOpen, setIsFilterOpen] = React.useState(false);
    const [activeFilters, setActiveFilters] = React.useState<Record<string, string>>({
        status: 'all'
    });

    const [batches, setBatches] = React.useState<any[]>([]);
    const [transporters, setTransporters] = React.useState<Transporter[]>([]);
    const [formData, setFormData] = React.useState({
        batch: "",
        transporter_registry: "",
        from_location: "",
        to_location: ""
    });

    React.useEffect(() => { 
        fetchTransports(); 
        if (!store) fetchStore();
        ApiClient.get<any[]>("/batches/").then(data => setBatches(data.filter(b => b.status === 'approved')));
        transportersService.getTransporters().then(setTransporters);
    }, [fetchTransports]);

    React.useEffect(() => {
        if (store) {
            setFormData(prev => ({ ...prev, from_location: store.name }));
        }
    }, [store]);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createTransport(formData);
            setIsCreateModalOpen(false);
            setFormData({ batch: "", transporter_registry: "", from_location: store?.name || "", to_location: "" });
        } catch (err) {}
    };

    const handleFilterChange = (key: string, value: string) => {
        setActiveFilters(prev => ({ ...prev, [key]: value }));
    };

    const filteredTransports = (transports || []).filter(t => {
        const matchesSearch = 
            t.batch_details?.unique_code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.from_location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.to_location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.transporter_registry_details?.phone?.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = activeFilters.status === 'all' || t.status === activeFilters.status;
        
        return matchesSearch && matchesStatus;
    });

    const statusStyles: Record<string, string> = {
        pending: "bg-cocoa-10 text-cocoa-60 border-cocoa-10",
        in_progress: "bg-[#E3F2FD] text-[#2196F3] border-[#BBDEFB]",
        completed: "bg-[#E8F5E9] text-[#4CAF50] border-[#C8E6C9]",
    };
    const statusLabels: Record<string, string> = { pending: "En attente", in_progress: "En cours", completed: "Livré" };

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Transports en cours</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Suivez les transports de lots</p>
                </div>
                <div className="flex gap-2 items-center relative">
                    <div className={`h-[34px] flex items-center bg-cocoa-5 rounded-[8px] transition-all duration-300 overflow-hidden ${isSearchOpen ? 'w-[200px] px-3' : 'w-[34px] justify-center cursor-pointer hover:bg-cocoa-10'}`} onClick={() => !isSearchOpen && setIsSearchOpen(true)}>
                        <SearchIcon className="h-[18px] w-[18px] fill-cocoa-80 shrink-0 rotate-y-180" />
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
                    <div onClick={() => setIsCreateModalOpen(true)} className="h-[34px] bg-cocoa-5 rounded-[8px] flex items-center overflow-hidden cursor-pointer hover:bg-cocoa-10 transition-colors">
                        <div className="flex items-center px-4 gap-2 h-full"><AddIcon className="h-[18px] w-[18px] fill-cocoa-80" /><span className="text-[12px] text-cocoa-80">Créer</span></div>
                        <div className="h-[34px] w-[34px] border-l border-l-cocoa-20 flex items-center justify-center"><ArrowDownIcon className="h-[18px] w-[18px] fill-cocoa-80" /></div>
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
                                label: "Statut",
                                key: "status",
                                options: [
                                    { label: "Tous", value: "all" },
                                    { label: "En attente", value: "pending" },
                                    { label: "En cours", value: "in_progress" },
                                    { label: "Livré", value: "completed" },
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
                ) : error ? (
                    <div className="flex items-center justify-center h-40 text-red-500 text-[12px]">{error}</div>
                ) : filteredTransports.length === 0 ? (
                    <div className="flex items-center justify-center h-40 text-cocoa-40 text-[12px]">Aucun transport trouvé</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredTransports.map((t) => (
                            <div key={t.id} className="bg-white rounded-[16px] p-5 flex flex-col gap-4 border border-white hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedTransport(t)}>
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-[12px] bg-cocoa-5 flex items-center justify-center">
                                            <StoreTransportIcon className="h-5 w-5 text-cocoa-40" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[14px] text-cocoa font-medium font-mono">{t.batch_details?.unique_code || "N/A"}</span>
                                            <span className={`text-[10px] font-medium ${t.status === 'completed' ? 'text-[#4CAF50]' : 'text-cocoa-40'}`}>
                                                {statusLabels[t.status]}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`h-2 w-2 rounded-full ${t.status === 'completed' ? 'bg-[#4CAF50]' : 'bg-[#2196F3]'}`}></div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-cocoa-20"></div>
                                        <span className="text-[12px] text-cocoa-60 line-clamp-1">{t.from_location}</span>
                                    </div>
                                    <div className="h-3 w-[1px] bg-cocoa-10 ml-[2.5px]"></div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-cocoa"></div>
                                        <span className="text-[12px] text-cocoa line-clamp-1">{t.to_location}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-1 pt-3 border-t border-cocoa-5">
                                    <span className="text-[11px] text-cocoa-40">Tél: {t.transporter_registry_details?.phone || "Inconnu"}</span>
                                    <span className="text-[11px] text-cocoa-40">{t.departure_date ? new Date(t.departure_date).toLocaleDateString("fr-FR") : "—"}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal de création */}
            <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
                <form onSubmit={handleCreate} className="p-8 flex flex-col gap-6 max-w-[450px] w-full">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[20px] font-medium text-cocoa">Assigner un transport</h2>
                        <p className="text-[13px] text-cocoa-40">Créez un nouveau transport pour un lot approuvé.</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] text-cocoa-40 ml-1">Sélectionner le lot</label>
                            <select 
                                required
                                value={formData.batch}
                                onChange={e => setFormData({...formData, batch: e.target.value})}
                                className="h-[44px] bg-cocoa-5 rounded-[12px] px-3 text-[13px] outline-none border-none"
                            >
                                <option value="">Choisir un lot...</option>
                                {batches.map(b => (
                                    <option key={b.id} value={b.id}>{b.unique_code} ({b.crop_type})</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] text-cocoa-40 ml-1">Transporteur</label>
                            <select 
                                required
                                value={formData.transporter_registry}
                                onChange={e => setFormData({...formData, transporter_registry: e.target.value})}
                                className="h-[44px] bg-cocoa-5 rounded-[12px] px-3 text-[13px] outline-none border-none"
                            >
                                <option value="">Choisir un transporteur...</option>
                                {transporters.map(t => (
                                    <option key={t.id} value={t.id}>{t.user_details?.first_name} {t.user_details?.last_name} ({t.phone})</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] text-cocoa-40 ml-1">Lieu de départ</label>
                                <input 
                                    readOnly
                                    required
                                    type="text" 
                                    placeholder="Ex: Magasin A"
                                    value={formData.from_location}
                                    className="h-[44px] bg-cocoa-5 rounded-[12px] px-4 text-[13px] outline-none opacity-60 cursor-not-allowed"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] text-cocoa-40 ml-1">Destination</label>
                                <input 
                                    required
                                    type="text" 
                                    placeholder="Ex: Port"
                                    value={formData.to_location}
                                    onChange={e => setFormData({...formData, to_location: e.target.value})}
                                    className="h-[44px] bg-cocoa-5 rounded-[12px] px-4 text-[13px] outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-2">
                        <button type="button" onClick={() => setIsCreateModalOpen(false)} className="flex-1 h-[44px] rounded-full bg-cocoa-5 text-cocoa text-[13px] font-medium hover:bg-cocoa-10 transition-colors">Annuler</button>
                        <button type="submit" className="flex-1 h-[44px] rounded-full bg-black text-white text-[13px] font-medium hover:opacity-90 transition-opacity">Créer le transport</button>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={!!selectedTransport} onClose={() => setSelectedTransport(null)}>
                <div className="p-8 flex flex-col gap-6 max-w-[450px] w-full">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[20px] font-medium text-cocoa">Détails du transport</h2>
                        <p className="text-[13px] text-cocoa-40">Informations logistiques du lot.</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        {[
                            { label: "Code du lot", value: selectedTransport?.batch_details?.unique_code },
                            { label: "Point de départ", value: selectedTransport?.from_location },
                            { label: "Destination", value: selectedTransport?.to_location },
                            { label: "Transporteur (Tél)", value: selectedTransport?.transporter_registry_details?.phone || "—" },
                            { label: "Statut actuel", value: statusLabels[selectedTransport?.status || ""] },
                            { label: "Date de départ", value: selectedTransport?.departure_date ? new Date(selectedTransport.departure_date).toLocaleString("fr-FR") : "—" },
                            { label: "Estimation arrivée", value: selectedTransport?.arrival_date ? new Date(selectedTransport.arrival_date).toLocaleString("fr-FR") : "Bientôt" },
                        ].map((f, i) => (
                            <div key={i} className="bg-cocoa-5/50 rounded-[12px] px-4 py-3 flex flex-col gap-0.5">
                                <span className="text-[11px] text-cocoa-40">{f.label}</span>
                                <span className="text-[13px] text-cocoa font-medium line-clamp-1">{f.value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        {selectedTransport?.status === 'in_progress' && (
                            <button onClick={() => { useTransportsStore.getState().confirmDelivery(selectedTransport.id); setSelectedTransport(null); }} className="h-[44px] w-full rounded-full bg-black text-white text-[13px] font-medium hover:opacity-90 transition-opacity cursor-pointer">Confirmer la réception</button>
                        )}
                        <button onClick={() => setSelectedTransport(null)} className="h-[44px] w-full rounded-full bg-cocoa-5 text-cocoa-40 text-[13px] font-medium hover:bg-cocoa-10 transition-colors cursor-pointer">Fermer</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Transports;
