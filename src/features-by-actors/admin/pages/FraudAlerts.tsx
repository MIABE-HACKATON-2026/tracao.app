import React, { useState, useEffect } from "react";
import { 
    FilterIcon, 
    SearchIcon, 
    AlertTriangleIcon,
    ShieldAlertIcon,
    UserIcon,
    TagIcon,
    ClockIcon,
    CheckCircleIcon
} from "../../../shared/components/icons";
import { useAdminStore } from "../stores/admin.store";
import { cn } from "../../../shared/lib/utils";
import { formatDate } from "../../../shared/utils/formatters";

const FraudAlerts: React.FC = () => {
    const { fraudAlerts, fetchFraudAlerts, isLoading } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchFraudAlerts();
    }, []);

    const filteredAlerts = (fraudAlerts || []).filter(a => 
        (a.type || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (a.user_name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full h-full flex flex-col gap-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[20px] font-semibold text-cocoa tracking-tight">Alertes Fraude (Lecture seule)</h1>
                    <p className="text-[13px] text-cocoa-60">Surveillance des activités suspectes détectées par le système</p>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-[280px]">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cocoa-20" />
                        <input 
                            type="text" 
                            placeholder="Rechercher par type ou utilisateur..." 
                            className="w-full h-10 pl-10 pr-4 rounded-[12px] bg-white border border-cocoa-10 text-[13px] focus:outline-none focus:ring-2 focus:ring-cocoa/5 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-white rounded-[20px] border border-cocoa-5 shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-cocoa-[2%] border-b border-cocoa-5">
                                <th className="px-6 py-4 text-[11px] font-semibold text-cocoa-40 uppercase tracking-wider">Type d'Alerte</th>
                                <th className="px-6 py-4 text-[11px] font-semibold text-cocoa-40 uppercase tracking-wider">Acteur Concerné</th>
                                <th className="px-6 py-4 text-[11px] font-semibold text-cocoa-40 uppercase tracking-wider">Score / Gravité</th>
                                <th className="px-6 py-4 text-[11px] font-semibold text-cocoa-40 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-[11px] font-semibold text-cocoa-40 uppercase tracking-wider">Statut</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cocoa-5">
                            {isLoading ? (
                                <tr><td colSpan={5} className="px-6 py-10 text-center text-cocoa-20">Chargement...</td></tr>
                            ) : filteredAlerts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <ShieldAlertIcon className="h-10 w-10 opacity-10 mx-auto mb-2 text-cocoa" />
                                        <p className="text-[14px] text-cocoa-40">Aucune alerte de fraude détectée</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredAlerts.map((alert) => (
                                    <tr key={alert.id} className="hover:bg-cocoa-[1%] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "h-8 w-8 rounded-[8px] flex items-center justify-center",
                                                    alert.score > 70 ? "bg-red-50" : "bg-orange-50"
                                                )}>
                                                    <AlertTriangleIcon className={cn("h-4 w-4", alert.score > 70 ? "text-red-500" : "text-orange-500")} />
                                                </div>
                                                <span className="text-[13px] font-medium text-cocoa capitalize">{alert.type.replace('_', ' ')}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-[13px] font-medium text-cocoa">{alert.user_name || "Utilisateur inconnu"}</span>
                                                <span className="text-[11px] text-cocoa-40">ID: {alert.user_id?.substring(0, 8)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-1.5 bg-cocoa-5 rounded-full overflow-hidden">
                                                    <div 
                                                        className={cn("h-full rounded-full", alert.score > 70 ? "bg-red-500" : "bg-orange-500")} 
                                                        style={{ width: `${alert.score}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-[12px] font-bold text-cocoa">{alert.score}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-[13px] text-cocoa-40">
                                            <div className="flex items-center gap-2">
                                                <ClockIcon className="h-3.5 w-3.5" />
                                                <span>{formatDate(alert.created_at)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={cn(
                                                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                                alert.status === 'open' ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
                                            )}>
                                                {alert.status === 'open' ? "Ouverte" : "Traitée"}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FraudAlerts;
