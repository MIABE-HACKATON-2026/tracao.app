import React, { useState, useEffect } from "react";
import { 
    FilterIcon, 
    SearchIcon, 
    AlertTriangleIcon,
    ShieldAlertIcon,
    ClockIcon
} from "../../../shared/components/icons";
import { useAdminStore } from "../stores/admin.store";
import { AdminCard, AdminTableHeader, AdminTableRow, AdminTableCell, AdminBadge, AdminButton, AdminFilterBtn } from "../components/AdminUI";
import { cn } from "../../../shared/lib/utils";
import { formatDate } from "../../../shared/utils/formatters";

const FraudAlerts: React.FC = () => {
    const { fraudAlerts, fetchFraudAlerts, isLoading } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchFraudAlerts();
    }, [fetchFraudAlerts]);

    const filteredAlerts = (fraudAlerts || []).filter(a => 
        (a.type || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (a.user_name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full h-full flex flex-col gap-5 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Alertes Fraude (Lecture seule)</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Surveillance des risques système</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-full bg-cocoa-5 flex items-center justify-center cursor-pointer hover:bg-cocoa-10 transition-colors">
                        <SearchIcon className="h-[18px] w-[18px] fill-cocoa-80" />
                    </div>
                    <AdminFilterBtn onClick={() => {}} />
                </div>
            </div>

            <AdminCard>
                <AdminTableHeader headers={["Type d'Alerte", "Acteur Concerné", "Score / Gravité", "Date", "Statut"]} />
                <div className="flex-1 overflow-y-auto flex flex-col gap-1 mt-1.5">
                    {isLoading ? (
                        <div className="p-10 text-center text-cocoa-40 text-[12px] animate-pulse">Chargement des alertes...</div>
                    ) : filteredAlerts.length === 0 ? (
                        <div className="p-10 text-center text-cocoa-40 text-[12px]">Aucune alerte détectée</div>
                    ) : (
                        filteredAlerts.map((alert) => (
                            <AdminTableRow key={alert.id}>
                                <AdminTableCell width="w-[220px]">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "h-7 w-7 rounded-full flex items-center justify-center",
                                            alert.score > 70 ? "bg-[#FFEBEE]" : "bg-[#FFF3E0]"
                                        )}>
                                            <AlertTriangleIcon className={cn("h-4 w-4", alert.score > 70 ? "text-[#F44336]" : "text-[#FF9800]")} />
                                        </div>
                                        <span className="capitalize">{alert.type?.replace('_', ' ')}</span>
                                    </div>
                                </AdminTableCell>
                                <AdminTableCell width="w-[200px]">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-cocoa">{alert.user_name || "—"}</span>
                                        <span className="text-[10px] text-cocoa-40">ID: {alert.user_id?.substring(0, 8)}</span>
                                    </div>
                                </AdminTableCell>
                                <AdminTableCell width="w-[150px]">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-1 bg-cocoa-10 rounded-full overflow-hidden">
                                            <div 
                                                className={cn("h-full rounded-full", alert.score > 70 ? "bg-[#F44336]" : "bg-[#FF9800]")} 
                                                style={{ width: `${alert.score}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-[11px] font-bold">{alert.score}%</span>
                                    </div>
                                </AdminTableCell>
                                <AdminTableCell width="w-[180px]">
                                    <div className="flex items-center gap-2 text-cocoa-60">
                                        <ClockIcon className="h-3.5 w-3.5 opacity-40" />
                                        <span>{formatDate(alert.created_at)}</span>
                                    </div>
                                </AdminTableCell>
                                <AdminTableCell className="flex-1 flex justify-end">
                                    <AdminBadge 
                                        variant={alert.status === 'open' ? 'error' : 'success'} 
                                        label={alert.status === 'open' ? 'Ouverte' : 'Traitée'} 
                                    />
                                </AdminTableCell>
                            </AdminTableRow>
                        ))
                    )}
                </div>
            </AdminCard>
        </div>
    );
};

export default FraudAlerts;
