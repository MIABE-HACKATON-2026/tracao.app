import React, { useState, useEffect } from "react";
import { 
    SearchIcon, 
    BoxIcon,
    CpuIcon,
    LinkIcon,
    HashIcon,
    CalendarIcon,
    ShieldCheckIcon
} from "../../../shared/components/icons";
import { useAdminStore } from "../stores/admin.store";
import { cn } from "../../../shared/lib/utils";
import { formatDate } from "../../../shared/utils/formatters";

const Blockchain: React.FC = () => {
    const { blockchain, fetchBlockchain, isLoading } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchBlockchain();
    }, []);

    const filteredRecords = (blockchain || []).filter(r => 
        (r.entity_id || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.hash || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.entity_type || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full h-full flex flex-col gap-6 animate-in fade-in duration-500 text-cocoa">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[20px] font-semibold tracking-tight">Ancrages Blockchain</h1>
                    <p className="text-[13px] text-cocoa-60">Preuves d'immuabilité et traçabilité décentralisée</p>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-[280px]">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cocoa-20" />
                        <input 
                            type="text" 
                            placeholder="Rechercher par hash ou entité..." 
                            className="w-full h-10 pl-10 pr-4 rounded-[12px] bg-white border border-cocoa-10 text-[13px] focus:outline-none focus:ring-2 focus:ring-cocoa/5 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                <div className="bg-cocoa p-5 rounded-[16px] text-white flex flex-col gap-1">
                    <span className="text-[11px] text-white/60 uppercase font-bold tracking-widest">Dernier Bloc</span>
                    <span className="text-[20px] font-mono font-medium truncate">0x{blockchain?.[0]?.hash?.substring(0, 16) || "N/A"}</span>
                </div>
                <div className="bg-white p-5 rounded-[16px] border border-cocoa-10 flex flex-col gap-1">
                    <span className="text-[11px] text-cocoa-40 uppercase font-bold tracking-widest">Total Ancrages</span>
                    <span className="text-[24px] font-semibold">{blockchain?.length || 0}</span>
                </div>
                <div className="bg-white p-5 rounded-[16px] border border-cocoa-10 flex flex-col gap-1">
                    <span className="text-[11px] text-cocoa-40 uppercase font-bold tracking-widest">Statut Réseau</span>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-[14px] font-semibold text-green-600">Connecté</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-white rounded-[20px] border border-cocoa-5 shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-cocoa-[2%] border-b border-cocoa-5">
                                <th className="px-6 py-4 text-[11px] font-bold text-cocoa-40 uppercase tracking-widest">Entité</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-cocoa-40 uppercase tracking-widest">Type</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-cocoa-40 uppercase tracking-widest">Hash de Transaction</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-cocoa-40 uppercase tracking-widest">Date d'Ancrage</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-cocoa-40 uppercase tracking-widest text-right">Preuve</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cocoa-5 font-mono text-[12px]">
                            {isLoading ? (
                                <tr><td colSpan={5} className="px-6 py-10 text-center font-sans text-cocoa-20">Exploration de la blockchain...</td></tr>
                            ) : filteredRecords.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center font-sans">
                                        <BoxIcon className="h-10 w-10 opacity-10 mx-auto mb-2" />
                                        <p className="text-cocoa-40">Aucun ancrage trouvé</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredRecords.map((record) => (
                                    <tr key={record.id} className="hover:bg-cocoa-[1%] transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="text-cocoa font-medium">#{record.entity_id.substring(0, 8)}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-0.5 rounded bg-cocoa-5 text-[10px] uppercase font-bold text-cocoa-60 font-sans tracking-wider">
                                                {record.entity_type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <LinkIcon className="h-3 w-3 text-cocoa-20" />
                                                <span className="text-cocoa-60 truncate max-w-[200px]">{record.hash}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-cocoa-40 font-sans">
                                            {formatDate(record.created_at)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a 
                                                href={`#explorer/${record.hash}`} 
                                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cocoa-5 text-cocoa-60 hover:bg-cocoa text-white transition-all font-sans text-[11px] font-bold"
                                            >
                                                <CpuIcon className="h-3.5 w-3.5" />
                                                Vérifier
                                            </a>
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

export default Blockchain;
