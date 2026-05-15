import React, { useState, useEffect } from "react";
import { 
    SearchIcon, 
    ActivityIcon,
    UserIcon,
    ClockIcon
} from "../../../shared/components/icons";
import { useAdminStore } from "../stores/admin.store";
import { AdminCard, AdminTableHeader, AdminTableRow, AdminTableCell, AdminFilterBtn } from "../components/AdminUI";
import { cn } from "../../../shared/lib/utils";
import { formatDate } from "../../../shared/utils/formatters";

const SystemLogs: React.FC = () => {
    const { logs, fetchLogs, isLoading } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    const filteredLogs = (logs || []).filter(l => 
        (l.action || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (l.user_name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full h-full flex flex-col gap-5 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Logs Système</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Journal d'audit des actions</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-full bg-cocoa-5 flex items-center justify-center cursor-pointer hover:bg-cocoa-10 transition-colors">
                        <SearchIcon className="h-[18px] w-[18px] fill-cocoa-80" />
                    </div>
                    <AdminFilterBtn onClick={() => {}} />
                </div>
            </div>

            <AdminCard>
                <AdminTableHeader headers={["Événement", "Utilisateur", "Date & Heure", "Détails"]} />
                <div className="flex-1 overflow-y-auto flex flex-col gap-1 mt-1.5">
                    {isLoading ? (
                        <div className="p-10 text-center text-cocoa-40 text-[12px] animate-pulse">Lecture du journal...</div>
                    ) : filteredLogs.length === 0 ? (
                        <div className="p-10 text-center text-cocoa-40 text-[12px]">Aucun log enregistré</div>
                    ) : (
                        filteredLogs.map((log) => (
                            <AdminTableRow key={log.id}>
                                <AdminTableCell width="w-[220px]">
                                    <div className="flex items-center gap-3">
                                        <div className="h-7 w-7 rounded-full bg-cocoa-5 flex items-center justify-center">
                                            <ActivityIcon className="h-4 w-4 text-cocoa-40" />
                                        </div>
                                        <span className="font-medium text-cocoa">{log.action || "Action"}</span>
                                    </div>
                                </AdminTableCell>
                                <AdminTableCell width="w-[180px]">
                                    <div className="flex items-center gap-2">
                                        <UserIcon className="h-3.5 w-3.5 text-cocoa-20 shrink-0" />
                                        <span className="text-cocoa-60 truncate">{log.user_name || "Système"}</span>
                                    </div>
                                </AdminTableCell>
                                <AdminTableCell width="w-[180px]" className="text-cocoa-40">
                                    <div className="flex flex-col">
                                        <span>{formatDate(log.created_at)}</span>
                                        <span className="text-[10px] text-cocoa-20 font-mono">
                                            {new Date(log.created_at).toLocaleTimeString()}
                                        </span>
                                    </div>
                                </AdminTableCell>
                                <AdminTableCell className="flex-1">
                                    <code className="text-[10px] text-cocoa-40 bg-white/20 px-2 py-0.5 rounded truncate block font-mono border border-white/40">
                                        {typeof log.metadata === 'string' ? log.metadata : JSON.stringify(log.metadata)}
                                    </code>
                                </AdminTableCell>
                            </AdminTableRow>
                        ))
                    )}
                </div>
            </AdminCard>
        </div>
    );
};

export default SystemLogs;
