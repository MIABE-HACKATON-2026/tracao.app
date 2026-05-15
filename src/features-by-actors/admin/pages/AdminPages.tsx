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
import { AdminCard, AdminTableHeader, AdminTableRow, AdminTableCell, AdminFilterBtn, AdminButton } from "../components/AdminUI";
import { cn } from "../../../shared/lib/utils";

export { 
    AdminStores, 
    AdminKYC, 
    AdminBatches, 
    AdminTransactions, 
    AdminFraud, 
    AdminBlockchain, 
    AdminLogs 
};

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
                    <button onClick={onClose} className="flex-1 h-9 rounded-full bg-cocoa-5 text-[12px] font-bold text-cocoa-40">Réinitialiser</button>
                    <button onClick={onClose} className="flex-1 h-9 rounded-full bg-cocoa text-[12px] font-bold text-white shadow-lg shadow-cocoa/20">Appliquer</button>
                </div>
            </div>
        </>
    );
};

const SimpleList: React.FC<{ title: string; desc: string; headers: string[]; rows: string[][], isLoading?: boolean }> = ({ title, desc, headers, rows, isLoading }) => (
    <div className="w-full h-full flex flex-col gap-5">
        <div className="flex justify-between items-center">
            <div className="flex flex-col items-start gap-1">
                <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">{title}</h1>
                <p className="text-[12px] leading-[16px] text-cocoa-60">{desc}</p>
            </div>
            <div className="flex gap-2">
                <AdminFilterBtn onClick={() => {}} />
            </div>
        </div>
        <AdminCard>
            <AdminTableHeader headers={headers} />
            <div className="flex-1 overflow-y-auto flex flex-col gap-1 mt-1.5">
                {isLoading ? (
                    <div className="h-full w-full flex items-center justify-center text-cocoa-20 text-[12px] animate-pulse py-10">Chargement...</div>
                ) : rows.length === 0 ? (
                    <div className="h-full w-full flex items-center justify-center text-cocoa-20 text-[12px] py-10">Aucun résultat</div>
                ) : rows.map((row, ri) => (
                    <AdminTableRow key={ri}>
                        {row.map((cell, ci) => (
                            <AdminTableCell key={ci}>{cell}</AdminTableCell>
                        ))}
                    </AdminTableRow>
                ))}
            </div>
        </AdminCard>
    </div>
);

export const AdminReports: React.FC = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    return (
        <div className="w-full h-full flex flex-col gap-6 text-cocoa animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Rapports & Documents</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Exportez et gérez vos documents officiels</p>
                </div>
                <div className="relative">
                    <AdminFilterBtn active={isFilterOpen} onClick={() => setIsFilterOpen(!isFilterOpen)} />
                    <FilterPopover isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-bold text-cocoa-40 uppercase">Période</label>
                            <select className="h-10 rounded-full bg-cocoa-5 border-none text-[13px] font-medium px-4 focus:ring-0">
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
                    { label: "Volume Café", value: "840T", trend: "-3%", color: "bg-white", icon: AdminStatsIcon },
                    { label: "Surfaces EUDR", value: "12,450ha", trend: "Stable", color: "bg-white", icon: AdminEudrIcon },
                    { label: "Alertes Fraude", value: "2", trend: "-50%", color: "bg-white", icon: AdminFraudIcon, textColor: "text-red-600" }
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className={cn("p-5 rounded-[16px] flex flex-col gap-3 border border-white/20 shadow-sm", i === 0 ? "bg-cocoa text-white" : "bg-white/40")}>
                            <div className="flex items-center gap-3">
                                <div className={cn("h-9 w-9 rounded-full flex items-center justify-center", i === 0 ? "bg-white/20" : "bg-cocoa-5")}>
                                    <Icon className={cn("h-4 w-4", i === 0 ? "fill-white" : "fill-cocoa-40")} />
                                </div>
                                <span className={cn("text-[12px] font-medium", i === 0 ? "text-white" : "text-cocoa")}>{stat.label}</span>
                            </div>
                            <div className="flex items-baseline gap-2 mt-auto">
                                <span className="text-[24px] font-medium leading-none">{stat.value}</span>
                                <span className={cn("text-[11px] font-medium", i === 0 ? "text-white/60" : "text-green-600")}>{stat.trend}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white/40 rounded-[16px] border border-white/20 p-6 flex flex-col gap-6 shadow-sm">
                    <h2 className="text-[14px] font-medium text-cocoa">Téléchargements disponibles</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { name: "Rapport Production Mensuel", type: "PDF", size: "2.4 MB", date: "15 Mai 2026" },
                            { name: "Données Géospatiales EUDR", type: "CSV", size: "12.1 MB", date: "12 Mai 2026" },
                            { name: "Audit Certification Coop", type: "PDF", size: "4.5 MB", date: "10 Mai 2026" },
                            { name: "Registre Blockchain v2.4", type: "XLSX", size: "1.2 MB", date: "08 Mai 2026" }
                        ].map((doc, i) => (
                            <div key={i} className="group p-4 rounded-[12px] border border-white/40 bg-white/40 hover:bg-cocoa hover:text-white transition-all flex flex-col gap-3 cursor-pointer">
                                <div className="flex justify-between items-start">
                                    <div className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", i % 2 === 0 ? "bg-[#FFEBEE] text-[#F44336]" : "bg-[#E8F5E9] text-[#4CAF50]")}>{doc.type}</div>
                                    <span className="text-[11px] opacity-40 font-medium group-hover:text-white/60">{doc.size}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[12px] font-medium leading-tight">{doc.name}</span>
                                    <span className="text-[11px] opacity-40 font-medium mt-1 group-hover:text-white/60">{doc.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="bg-cocoa rounded-[16px] p-6 shadow-xl text-white flex flex-col gap-6">
                    <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                        <AdminReportIcon className="h-6 w-6 fill-white" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-[16px] font-medium">Générer un rapport personnalisé</h2>
                        <p className="text-[12px] text-white/60 leading-relaxed">Sélectionnez vos critères pour extraire un jeu de données spécifique au format PDF ou CSV.</p>
                    </div>
                    <div className="flex flex-col gap-3 mt-auto">
                        <div className="h-[44px] rounded-full bg-white/10 border border-white/10 flex items-center px-4 text-[12px] font-medium">Date: Ce mois</div>
                        <div className="h-[44px] rounded-full bg-white/10 border border-white/10 flex items-center px-4 text-[12px] font-medium">Type: Toutes cultures</div>
                        <AdminButton variant="outline" className="bg-white text-cocoa hover:bg-white hover:opacity-90 border-none" size="lg">Générer le rapport</AdminButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const NationalDashboard: React.FC = () => <div className="text-cocoa p-10 font-bold">National Dashboard Content</div>;
export const ProductionStats: React.FC = () => <SimpleList title="Statistiques production" desc="Par culture et région" headers={["Région", "Cacao", "Café", "Surface"]} rows={[["Abengourou", "800 Kg", "200 Kg", "20 ha"], ["Daloa", "400 Kg", "250 Kg", "15 ha"]]} />;
export const GlobalTraceability: React.FC = () => <SimpleList title="Traçabilité globale" desc="Tous les événements" headers={["Lot", "Action", "Acteur", "Date"]} rows={[["TRC-2026-0001", "Récolte", "Kouamé Paul", "10-01-2026"], ["TRC-2026-0001", "Transport", "Koné I.", "15-01-2026"]]} />;
export const EUDRCompliance: React.FC = () => <SimpleList title="Conformité EUDR" desc="Vérification" headers={["Lot", "Score", "Traçabilité", "Blockchain"]} rows={[["TRC-2026-0001", "92%", "Complete", "✓"], ["TRC-2026-0002", "65%", "Partielle", "✓"]]} />;
export const Audit: React.FC = () => <SimpleList title="Audit" desc="Journal d'audit" headers={["Date", "Action", "Utilisateur", "Détail"]} rows={[["11-03-2026", "Modification profil", "Admin", "Changement rôle"], ["10-03-2026", "Validation KYC", "Admin", "Approuvé"]]} />;
export const CertDashboard: React.FC = () => <div className="text-cocoa p-10 font-bold">Certifier Dashboard Content</div>;
export const CertList: React.FC = () => <SimpleList title="Certifications" desc="Lots à certifier" headers={["Lot", "Producteur", "Culture", "Statut"]} rows={[["TRC-2026-0001", "Kouamé Paul", "Cacao", "En attente"], ["TRC-2026-0002", "Konan Jules", "Café", "Certifié"]]} />;
export const CertifiedParcels: React.FC = () => <SimpleList title="Parcelles certifiées" desc="Liste" headers={["Nom", "Agriculteur", "Surface", "Date"]} rows={[["Parcelle A", "Kouamé Paul", "2.5 ha", "10-03-2026"]]} />;
export const CertifiedBatches: React.FC = () => <SimpleList title="Lots certifiés" desc="Liste" headers={["Code", "Culture", "Qté", "Certifié le"]} rows={[["TRC-2026-0001", "Cacao", "500 Kg", "25-03-2026"]]} />;
