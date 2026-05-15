import React from "react";
import { StoreFraudIcon } from "../stores/stores-icons";
import { FilterIcon, SearchIcon } from "../../../shared/components/icons";
import Modal from "../../../shared/components/atoms/Modal";
import { useFraudStore } from "../stores/fraud.store";
import type { FraudAlert } from "../../../shared/types";

import FilterPopover from "../../../shared/components/molecules/FilterPopover";

const FraudAlerts: React.FC = () => {
    const { alerts, isLoading, error, fetchAlerts, resolveAlert } = useFraudStore();
    const [selectedAlert, setSelectedAlert] = React.useState<FraudAlert | null>(null);
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isFilterOpen, setIsFilterOpen] = React.useState(false);
    const [activeFilters, setActiveFilters] = React.useState<Record<string, string>>({
        status: 'all'
    });

    React.useEffect(() => { fetchAlerts(); }, [fetchAlerts]);

    const handleFilterChange = (key: string, value: string) => {
        setActiveFilters(prev => ({ ...prev, [key]: value }));
    };

    const filteredAlerts = (alerts || []).filter(a => {
        const matchesSearch = 
            a.type?.toLowerCase().replace(/_/g, ' ').includes(searchQuery.toLowerCase()) ||
            a.status?.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = activeFilters.status === 'all' || a.status === activeFilters.status;
        
        return matchesSearch && matchesStatus;
    });

    const scoreColor = (score: number) =>
        score >= 70 ? "text-red-500" : score >= 40 ? "text-orange-500" : "text-cocoa-40";

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Alertes fraude</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Surveillez les activités suspectes</p>
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
                                    { label: "Ouvert", value: "open" },
                                    { label: "Résolu", value: "resolved" },
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
                ) : filteredAlerts.length === 0 ? (
                    <div className="flex items-center justify-center h-40 text-cocoa-40 text-[12px]">Aucune alerte trouvée</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredAlerts.map((a) => (
                            <div key={a.id} className="bg-white rounded-[16px] p-5 flex flex-col gap-4 border border-white hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden" onClick={() => setSelectedAlert(a)}>
                                <div className={`absolute top-0 right-0 h-1 w-full ${a.score >= 70 ? 'bg-red-500' : a.score >= 40 ? 'bg-orange-500' : 'bg-cocoa-20'}`}></div>
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className={`h-10 w-10 rounded-[12px] flex items-center justify-center ${a.score >= 70 ? 'bg-red-50' : a.score >= 40 ? 'bg-orange-50' : 'bg-cocoa-5'}`}>
                                            <StoreFraudIcon className={`h-5 w-5 ${scoreColor(a.score)}`} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[14px] text-cocoa font-medium capitalize">{a.type.replace(/_/g, ' ')}</span>
                                            <span className="text-[11px] text-cocoa-40">{new Date(a.created_at).toLocaleDateString("fr-FR")}</span>
                                        </div>
                                    </div>
                                    <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${scoreColor(a.score)} bg-current/10`}>
                                        {a.score}%
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-1 pt-3 border-t border-cocoa-5">
                                    <span className="text-[11px] text-cocoa-40 truncate flex-1 mr-2">{a.status === 'open' ? 'Action requise' : 'Traité'}</span>
                                    <div className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${a.status === 'open' ? 'bg-cocoa-10 text-cocoa-60' : 'bg-[#E8F5E9] text-[#4CAF50]'}`}>
                                        {a.status === 'open' ? 'Ouvert' : 'Résolu'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Modal isOpen={!!selectedAlert} onClose={() => setSelectedAlert(null)}>
                <div className="p-8 flex flex-col gap-6 max-w-[450px] w-full">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[20px] font-medium text-cocoa">Détails de l'alerte</h2>
                        <p className="text-[13px] text-cocoa-40">Analyse de suspicion de fraude.</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        {[
                            { label: "Type d'anomalie", value: selectedAlert?.type?.replace(/_/g, ' ') },
                            { label: "Score de risque", value: `${selectedAlert?.score}%`, color: scoreColor(selectedAlert?.score || 0) },
                            { label: "Date de détection", value: selectedAlert?.created_at ? new Date(selectedAlert.created_at).toLocaleString("fr-FR") : "—" },
                            { label: "Statut", value: selectedAlert?.status === 'open' ? 'Ouvert' : 'Résolu' },
                        ].map((f, i) => (
                            <div key={i} className="bg-cocoa-5/50 rounded-[12px] px-4 py-3 flex flex-col gap-0.5">
                                <span className="text-[11px] text-cocoa-40">{f.label}</span>
                                <span className={`text-[13px] font-medium capitalize ${f.color || 'text-cocoa'}`}>{f.value}</span>
                            </div>
                        ))}
                        <div className="bg-red-50 border border-red-100 rounded-[12px] p-4 flex flex-col gap-1">
                            <span className="text-[11px] text-red-500 font-bold uppercase tracking-wider">Description du risque</span>
                            <p className="text-[12px] text-red-600 leading-relaxed">
                                {selectedAlert?.type === 'gps_conflict' ? "Cette parcelle semble avoir des coordonnées GPS identiques à une parcelle déjà enregistrée." : 
                                 selectedAlert?.type === 'production_excess' ? "La quantité déclarée dépasse les capacités de production estimées pour cette surface." :
                                 "Activité suspecte détectée nécessitant une vérification manuelle par un inspecteur."}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        {selectedAlert?.status === 'open' ? (
                            <>
                                <button onClick={() => { resolveAlert(selectedAlert.id); setSelectedAlert(null); }} className="h-[44px] w-full rounded-full bg-black text-white text-[13px] font-medium hover:opacity-90 transition-opacity cursor-pointer">Marquer comme résolu</button>
                                <button className="h-[44px] w-full rounded-full border border-red-100 text-red-500 text-[13px] font-medium hover:bg-red-50 transition-colors cursor-pointer">Rejeter définitivement</button>
                            </>
                        ) : (
                            <button onClick={() => setSelectedAlert(null)} className="h-[44px] w-full rounded-full bg-black text-white text-[13px] font-medium hover:opacity-90 transition-opacity cursor-pointer">Fermer</button>
                        )}
                        <button onClick={() => setSelectedAlert(null)} className="h-[44px] w-full rounded-full bg-cocoa-5 text-cocoa-40 text-[13px] font-medium hover:bg-cocoa-10 transition-colors cursor-pointer">Annuler</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default FraudAlerts;
