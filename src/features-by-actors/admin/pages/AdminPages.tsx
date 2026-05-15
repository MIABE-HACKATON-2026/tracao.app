import React, { useState } from "react";
import AdminStores from "./Stores";
import AdminKYC from "./KYC";
import AdminBatches from "./Batches";
import AdminTransactions from "./Transactions";
import AdminFraud from "./FraudAlerts";
import AdminBlockchain from "./Blockchain";
import AdminLogs from "./SystemLogs";
import { 
    AdminStatsIcon, 
    AdminReportIcon, 
    AdminUsersIcon, 
    AdminEudrIcon, 
    AdminCoopIcon, 
    AdminCertIcon,
    AdminBlockchainIcon,
    AdminFraudIcon
} from "../components/admin-icons";
import { FilterIcon, SearchIcon, ChevronDownIcon } from "../../../shared/components/icons";
import { cn } from "../../../shared/lib/utils";

// Export the newly created functional components
export { 
    AdminStores, 
    AdminKYC, 
    AdminBatches, 
    AdminTransactions, 
    AdminFraud, 
    AdminBlockchain, 
    AdminLogs 
};

const FilterBtn = ({ active, onClick }: { active?: boolean, onClick: () => void }) => (
    <div 
        onClick={onClick}
        className={cn(
            "h-[34px] px-3 rounded-[8px] flex items-center gap-2 cursor-pointer transition-all border",
            active ? "bg-cocoa text-white border-cocoa" : "bg-white text-cocoa-60 border-cocoa-10 hover:border-cocoa-20 shadow-sm"
        )}
    >
        <FilterIcon className={cn("h-[16px] w-[16px]", active ? "fill-white" : "fill-cocoa-40")} />
        <span className="text-[12px] font-semibold tracking-tight">Filtrer</span>
        <ChevronDownIcon className={cn("h-3 w-3 opacity-40", active && "rotate-180")} />
    </div>
);

const FilterPopover = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) => {
    if (!isOpen) return null;
    return (
        <>
            <div className="fixed inset-0 z-40" onClick={onClose}></div>
            <div className="absolute right-0 top-[45px] w-[280px] bg-white rounded-[20px] shadow-2xl border border-cocoa-5 z-50 p-6 animate-in fade-in zoom-in-95 duration-150">
                <h3 className="text-[14px] font-bold text-cocoa mb-4">Options de filtrage</h3>
                <div className="flex flex-col gap-4">
                    {children}
                </div>
                <div className="flex gap-2 mt-6">
                    <button onClick={onClose} className="flex-1 h-9 rounded-xl bg-cocoa-5 text-[12px] font-bold text-cocoa-40">Réinitialiser</button>
                    <button onClick={onClose} className="flex-1 h-9 rounded-xl bg-cocoa text-[12px] font-bold text-white shadow-lg shadow-cocoa/20">Appliquer</button>
                </div>
            </div>
        </>
    );
};

const SimpleList: React.FC<{ title: string; desc: string; headers: string[]; rows: string[][], isLoading?: boolean }> = ({ title, desc, headers, rows, isLoading }) => (
    <div className="w-full h-full flex flex-col gap-5">
        <div className="flex justify-between items-center">
            <div className="flex flex-col items-start gap-1"><h1 className="text-[16px] leading-[16px] font-normal text-cocoa">{title}</h1><p className="text-[12px] leading-[16px] text-cocoa-60">{desc}</p></div>
            <div className="flex gap-2"><FilterBtn onClick={() => {}} /></div>
        </div>
        <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-4 overflow-hidden flex flex-col shadow-inner">
            <div className="w-full bg-[#E5E1DE] rounded-t-[12px] flex items-center h-[44px] px-6">{headers.map((h, i) => <div key={i} className="flex-1 text-[11px] font-bold text-cocoa-40 uppercase tracking-widest">{h}</div>)}</div>
            <div className="flex-1 overflow-y-auto flex flex-col gap-1 mt-1.5">
                {isLoading ? (
                    <div className="h-full w-full flex items-center justify-center text-cocoa-20 text-sm animate-pulse">Chargement...</div>
                ) : rows.length === 0 ? (
                    <div className="h-full w-full flex items-center justify-center text-cocoa-20 text-sm">Aucun résultat</div>
                ) : rows.map((row, ri) => (
                    <div key={ri} className="h-[48px] bg-white rounded-[8px] flex items-center px-6 hover:bg-white/80 border border-white/40 transition-all hover:shadow-sm">
                        {row.map((cell, ci) => <div key={ci} className="flex-1 text-[12px] text-cocoa font-medium">{cell}</div>)}
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export const AdminReports: React.FC = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    return (
        <div className="w-full h-full flex flex-col gap-6 text-cocoa animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[20px] font-semibold tracking-tight text-cocoa">Rapports & Documents</h1>
                    <p className="text-[13px] text-cocoa-60 font-medium">Exportez et gérez vos documents officiels</p>
                </div>
                <div className="relative">
                    <FilterBtn active={isFilterOpen} onClick={() => setIsFilterOpen(!isFilterOpen)} />
                    <FilterPopover isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-bold text-cocoa-40 uppercase">Période</label>
                            <select className="h-10 rounded-xl bg-cocoa-5 border-none text-[13px] font-medium px-3 focus:ring-0">
                                <option>Ce mois</option>
                                <option>Dernier trimestre</option>
                                <option>Année en cours</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-bold text-cocoa-40 uppercase">Secteur</label>
                            <div className="flex flex-wrap gap-2">
                                {["Cacao", "Café", "EUDR", "Social"].map(s => (
                                    <div key={s} className="px-3 py-1.5 rounded-full bg-cocoa-5 text-[11px] font-bold text-cocoa-60 cursor-pointer hover:bg-cocoa hover:text-white transition-all">{s}</div>
                                ))}
                            </div>
                        </div>
                    </FilterPopover>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Production Cacao", value: "1,240T", trend: "+12%", color: "bg-cocoa", icon: AdminStatsIcon },
                    { label: "Volume Café", value: "840T", trend: "-3%", color: "bg-cocoa-5", icon: AdminStatsIcon },
                    { label: "Surfaces EUDR", value: "12,450ha", trend: "Stable", color: "bg-cocoa-5", icon: AdminEudrIcon },
                    { label: "Alertes Fraude", value: "2", trend: "-50%", color: "bg-red-50", icon: AdminFraudIcon, textColor: "text-red-600" }
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className={cn("p-5 rounded-[20px] flex flex-col gap-3 shadow-sm border border-cocoa-5", i === 0 ? "bg-cocoa text-white" : "bg-white")}>
                            <div className="flex items-center gap-3">
                                <div className={cn("h-9 w-9 rounded-[10px] flex items-center justify-center", i === 0 ? "bg-white/20" : "bg-cocoa-5")}>
                                    <Icon className={cn("h-4 w-4", i === 0 ? "fill-white" : "fill-cocoa-40")} />
                                </div>
                                <span className={cn("text-[13px] font-bold tracking-tight", i === 0 ? "text-white" : "text-cocoa")}>{stat.label}</span>
                            </div>
                            <div className="flex items-baseline gap-2 mt-auto">
                                <span className="text-[24px] font-bold">{stat.value}</span>
                                <span className={cn("text-[11px] font-bold", i === 0 ? "text-white/60" : "text-green-600")}>{stat.trend}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-[24px] border border-cocoa-5 p-6 shadow-sm flex flex-col gap-6">
                    <h2 className="text-[16px] font-bold">Téléchargements disponibles</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { name: "Rapport Production Mensuel", type: "PDF", size: "2.4 MB", date: "15 Mai 2026" },
                            { name: "Données Géospatiales EUDR", type: "CSV", size: "12.1 MB", date: "12 Mai 2026" },
                            { name: "Audit Certification Coop", type: "PDF", size: "4.5 MB", date: "10 Mai 2026" },
                            { name: "Registre Blockchain v2.4", type: "XLSX", size: "1.2 MB", date: "08 Mai 2026" }
                        ].map((doc, i) => (
                            <div key={i} className="group p-4 rounded-[16px] border border-cocoa-5 bg-cocoa-[1%] hover:bg-cocoa hover:text-white transition-all flex flex-col gap-3 cursor-pointer">
                                <div className="flex justify-between items-start">
                                    <div className={cn("px-2 py-1 rounded-md text-[10px] font-black", i % 2 === 0 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600")}>{doc.type}</div>
                                    <span className="text-[11px] opacity-40 font-medium group-hover:text-white/60">{doc.size}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[13px] font-bold leading-tight">{doc.name}</span>
                                    <span className="text-[11px] opacity-40 font-medium mt-1 group-hover:text-white/60">{doc.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="bg-cocoa rounded-[24px] p-6 shadow-xl text-white flex flex-col gap-6">
                    <div className="h-12 w-12 rounded-[16px] bg-white/20 flex items-center justify-center">
                        <AdminReportIcon className="h-6 w-6 fill-white" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-[18px] font-bold">Générer un rapport personnalisé</h2>
                        <p className="text-[13px] text-white/60 leading-relaxed">Sélectionnez vos critères pour extraire un jeu de données spécifique au format PDF ou CSV.</p>
                    </div>
                    <div className="flex flex-col gap-3 mt-auto">
                        <div className="h-[44px] rounded-[14px] bg-white/10 border border-white/10 flex items-center px-4 text-[13px] font-medium">Date: Ce mois</div>
                        <div className="h-[44px] rounded-[14px] bg-white/10 border border-white/10 flex items-center px-4 text-[13px] font-medium">Type: Toutes cultures</div>
                        <button className="h-[48px] rounded-[16px] bg-white text-cocoa font-bold text-[14px] hover:scale-[1.02] active:scale-95 transition-all mt-2">Générer le rapport</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Gov pages (Keep simple for now but clean up)
export const NationalDashboard: React.FC = () => <div className="text-cocoa p-10 font-bold">National Dashboard Content</div>;
export const ProductionStats: React.FC = () => <SimpleList title="Statistiques production" desc="Par culture et région" headers={["Région", "Cacao", "Café", "Surface"]} rows={[["Abengourou", "800 Kg", "200 Kg", "20 ha"], ["Daloa", "400 Kg", "250 Kg", "15 ha"]]} />;
export const GlobalTraceability: React.FC = () => <SimpleList title="Traçabilité globale" desc="Tous les événements" headers={["Lot", "Action", "Acteur", "Date"]} rows={[["TRC-2026-0001", "Récolte", "Kouamé Paul", "10-01-2026"], ["TRC-2026-0001", "Transport", "Koné I.", "15-01-2026"]]} />;
export const EUDRCompliance: React.FC = () => <SimpleList title="Conformité EUDR" desc="Vérification" headers={["Lot", "Score", "Traçabilité", "Blockchain"]} rows={[["TRC-2026-0001", "92%", "Complete", "✓"], ["TRC-2026-0002", "65%", "Partielle", "✓"]]} />;
export const Audit: React.FC = () => <SimpleList title="Audit" desc="Journal d'audit" headers={["Date", "Action", "Utilisateur", "Détail"]} rows={[["11-03-2026", "Modification profil", "Admin", "Changement rôle"], ["10-03-2026", "Validation KYC", "Admin", "Approuvé"]]} />;

// Certifier pages
export const CertDashboard: React.FC = () => <div className="text-cocoa p-10 font-bold">Certifier Dashboard Content</div>;
export const CertList: React.FC = () => <SimpleList title="Certifications" desc="Lots à certifier" headers={["Lot", "Producteur", "Culture", "Statut"]} rows={[["TRC-2026-0001", "Kouamé Paul", "Cacao", "En attente"], ["TRC-2026-0002", "Konan Jules", "Café", "Certifié"]]} />;
export const CertifiedParcels: React.FC = () => <SimpleList title="Parcelles certifiées" desc="Liste" headers={["Nom", "Agriculteur", "Surface", "Date"]} rows={[["Parcelle A", "Kouamé Paul", "2.5 ha", "10-03-2026"]]} />;
export const CertifiedBatches: React.FC = () => <SimpleList title="Lots certifiés" desc="Liste" headers={["Code", "Culture", "Qté", "Certifié le"]} rows={[["TRC-2026-0001", "Cacao", "500 Kg", "25-03-2026"]]} />;
