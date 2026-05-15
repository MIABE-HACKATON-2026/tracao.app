import React, { useState, useEffect } from "react";
import { 
    SearchIcon, 
    TerminalIcon,
    UserIcon,
    ActivityIcon,
    ClockIcon,
    DatabaseIcon,
    ShieldIcon
} from "../../../shared/components/icons";
import { useAdminStore } from "../stores/admin.store";
import { cn } from "../../../shared/lib/utils";
import { formatDate } from "../../../shared/utils/formatters";

const SystemLogs: React.FC = () => {
    const { logs, fetchLogs, isLoading } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchLogs();
    }, []);

    const filteredLogs = (logs || []).filter(l => 
        (l.action || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (l.user_name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full h-full flex flex-col gap-6 animate-in fade-in duration-500 text-cocoa">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[20px] font-semibold tracking-tight">Logs Système</h1>
                    <p className="text-[13px] text-cocoa-60">Journal complet des actions et événements d'audit</p>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-[280px]">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cocoa-20" />
                        <input 
                            type="text" 
                            placeholder="Filtrer les événements..." 
                            className="w-full h-10 pl-10 pr-4 rounded-[12px] bg-white border border-cocoa-10 text-[13px] focus:outline-none focus:ring-2 focus:ring-cocoa/5 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-white rounded-[20px] border border-cocoa-5 shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-cocoa-[2%] border-b border-cocoa-5">
                                <th className="px-6 py-4 text-[11px] font-bold text-cocoa-40 uppercase tracking-widest">Événement</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-cocoa-40 uppercase tracking-widest">Utilisateur</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-cocoa-40 uppercase tracking-widest">Date & Heure</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-cocoa-40 uppercase tracking-widest">Détails / Métadonnées</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cocoa-5 text-[12px]">
                            {isLoading ? (
                                <tr><td colSpan={4} className="px-6 py-10 text-center text-cocoa-20">Lecture du journal...</td></tr>
                            ) : filteredLogs.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-20 text-center">
                                        <DatabaseIcon className="h-10 w-10 opacity-10 mx-auto mb-2" />
                                        <p className="text-cocoa-40">Aucun log enregistré</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredLogs.map((log) => (
                                    <tr key={log.id} className="hover:bg-cocoa-[1%] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-[8px] bg-cocoa-5 flex items-center justify-center">
                                                    <ActivityIcon className="h-4 w-4 text-cocoa-40" />
                                                </div>
                                                <span className="text-[13px] font-semibold text-cocoa">{log.action}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <UserIcon className="h-3.5 w-3.5 text-cocoa-20" />
                                                <span className="text-cocoa-60">{log.user_name || "Système"}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-cocoa-40">
                                            <div className="flex flex-col">
                                                <span>{formatDate(log.created_at)}</span>
                                                <span className="text-[10px] uppercase font-bold tracking-tighter opacity-60">
                                                    {new Date(log.created_at).toLocaleTimeString()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="max-w-[400px]">
                                                <code className="text-[11px] text-cocoa-40 bg-cocoa-5/50 px-2 py-1 rounded block truncate font-mono">
                                                    {typeof log.metadata === 'string' ? log.metadata : JSON.stringify(log.metadata)}
                                                </code>
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

export default SystemLogs;
