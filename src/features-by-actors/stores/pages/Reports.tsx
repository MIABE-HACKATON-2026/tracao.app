import React from "react";
import { StoreReportIcon } from "../stores/stores-icons";
import { DownloadIcon, FilterIcon, DocIcon, DatabaseIcon } from "../../../shared/components/icons";
import { useMembersStore } from "../stores/members.store";
import { useValidationsStore } from "../stores/validations.store";
import reportsService, { type StoreDashboardStats } from "../services/reports.service";
import { cn } from "../../../shared/lib/utils";

const Reports: React.FC = () => {
    const { members, fetchMembers } = useMembersStore();
    const { pendingParcels, fetchPendingParcels } = useValidationsStore();
    const [stats, setStats] = React.useState<StoreDashboardStats | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        fetchMembers();
        fetchPendingParcels();
        reportsService.getStoreDashboardStats()
            .then(setStats)
            .finally(() => setIsLoading(false));
    }, [fetchMembers, fetchPendingParcels]);

    const activeMembers = stats?.counts.active_members ?? 0;
    const cacaoProduction = stats?.production_by_crop['cacao'] ?? 0;
    const cafeProduction = stats?.production_by_crop['café'] ?? 0;
    const totalArea = stats?.total_area ?? 0;
    const totalVolume = stats?.total_volume ?? 0;

    return (
        <div className="w-full h-full flex flex-col gap-6 animate-in fade-in duration-500 text-cocoa">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[20px] font-bold tracking-tight">Rapports & Documents</h1>
                    <p className="text-[13px] text-cocoa-60">Gérez les données et documents de votre coopérative</p>
                </div>
                <div className="h-10 w-10 rounded-[12px] bg-cocoa flex items-center justify-center cursor-pointer shadow-lg shadow-cocoa/20">
                    <FilterIcon className="h-5 w-5 fill-white" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Production Cacao", value: `${cacaoProduction.toLocaleString()} Kg`, icon: StoreReportIcon, color: "bg-cocoa", iconColor: "text-white" },
                    { label: "Production Café", value: `${cafeProduction.toLocaleString()} Kg`, icon: StoreReportIcon, color: "bg-white", iconColor: "text-cocoa-40" },
                    { label: "Surface Totale", value: `${totalArea.toFixed(1)} ha`, icon: DatabaseIcon, color: "bg-white", iconColor: "text-cocoa-40" },
                    { label: "Membres Actifs", value: activeMembers, icon: DocIcon, color: "bg-white", iconColor: "text-cocoa-40" }
                ].map((stat, i) => (
                    <div key={i} className={cn("p-5 rounded-[20px] border border-cocoa-5 flex flex-col gap-3 shadow-sm", stat.color === 'bg-cocoa' ? "bg-cocoa text-white" : "bg-white")}>
                         <div className="flex items-center gap-3">
                            <div className={cn("h-9 w-9 rounded-[10px] flex items-center justify-center", stat.color === 'bg-cocoa' ? "bg-white/20" : "bg-cocoa-5")}>
                                <stat.icon className={cn("h-4 w-4", stat.iconColor)} />
                            </div>
                            <span className="text-[12px] font-bold uppercase tracking-widest opacity-60">{stat.label}</span>
                        </div>
                        <span className="text-[24px] font-bold mt-1">{stat.value}</span>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="bg-white rounded-[24px] border border-cocoa-5 p-6 shadow-sm flex flex-col gap-6">
                        <h2 className="text-[16px] font-bold">Documents & Exports</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { name: "Liste des membres actifs", type: "XLSX", size: "1.2 MB", date: "Aujourd'hui" },
                                { name: "Rapport de collecte hebdomadaire", type: "PDF", size: "3.4 MB", date: "Hier" },
                                { name: "Certificat de conformité globale", type: "PDF", size: "5.1 MB", date: "10 Mai 2026" },
                                { name: "Historique des parcelles", type: "CSV", size: "8.9 MB", date: "05 Mai 2026" }
                            ].map((doc, i) => (
                                <div key={i} className="group p-4 rounded-[16px] border border-cocoa-5 bg-cocoa-[1%] hover:bg-cocoa hover:text-white transition-all flex items-center gap-4 cursor-pointer">
                                    <div className="h-10 w-10 rounded-xl bg-cocoa-5 flex items-center justify-center group-hover:bg-white/20">
                                        <DownloadIcon className="h-5 w-5 text-cocoa-40 group-hover:text-white" />
                                    </div>
                                    <div className="flex flex-col flex-1 overflow-hidden">
                                        <span className="text-[13px] font-bold truncate">{doc.name}</span>
                                        <div className="flex items-center gap-2 text-[10px] opacity-40 font-bold group-hover:text-white/60">
                                            <span>{doc.type}</span>
                                            <span>•</span>
                                            <span>{doc.size}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-cocoa rounded-[24px] p-6 shadow-xl text-white flex flex-col gap-6">
                    <div className="h-12 w-12 rounded-[16px] bg-white/20 flex items-center justify-center">
                        <StoreReportIcon className="h-6 w-6 fill-white" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-[18px] font-bold">Extraction de données</h2>
                        <p className="text-[13px] text-white/60 leading-relaxed">Générez des rapports détaillés sur vos activités pour vos partenaires ou pour l'audit.</p>
                    </div>
                    <div className="flex flex-col gap-3 mt-auto">
                        <div className="h-[44px] rounded-[14px] bg-white/10 border border-white/10 flex items-center px-4 text-[13px] font-medium cursor-pointer hover:bg-white/20 transition-all">Format: Excel (XLSX)</div>
                        <div className="h-[44px] rounded-[14px] bg-white/10 border border-white/10 flex items-center px-4 text-[13px] font-medium cursor-pointer hover:bg-white/20 transition-all">Portée: Année 2026</div>
                        <button className="h-[48px] rounded-[16px] bg-white text-cocoa font-bold text-[14px] hover:scale-[1.02] active:scale-95 transition-all mt-2">Générer le rapport</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
