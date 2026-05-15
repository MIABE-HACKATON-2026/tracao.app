import React, { useState, useEffect } from "react";
import { 
    SearchIcon, 
    BoxIcon,
    CpuIcon,
    LinkIcon
} from "../../../shared/components/icons";
import { useAdminStore } from "../stores/admin.store";
import { AdminCard, AdminTableHeader, AdminTableRow, AdminTableCell, AdminBadge, AdminFilterBtn } from "../components/AdminUI";
import { cn } from "../../../shared/lib/utils";
import { formatDate } from "../../../shared/utils/formatters";

const Blockchain: React.FC = () => {
    const { blockchain, fetchBlockchain, isLoading } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchBlockchain();
    }, [fetchBlockchain]);

    const filteredRecords = (blockchain || []).filter(r => 
        (r.entity_id || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.hash || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.entity_type || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full h-full flex flex-col gap-5 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Ancrages Blockchain</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Preuves d'immuabilité décentralisées</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-full bg-cocoa-5 flex items-center justify-center cursor-pointer hover:bg-cocoa-10 transition-colors">
                        <SearchIcon className="h-[18px] w-[18px] fill-cocoa-80" />
                    </div>
                    <AdminFilterBtn onClick={() => {}} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-cocoa p-4 rounded-[16px] text-white flex flex-col gap-1 shadow-sm">
                    <span className="text-[11px] text-white/60 font-medium">Dernier Bloc</span>
                    <span className="text-[16px] font-mono truncate">0x{blockchain?.[0]?.hash?.substring(0, 16) || "N/A"}</span>
                </div>
                <div className="bg-white/40 p-4 rounded-[16px] border border-white/20 flex flex-col gap-1 shadow-sm">
                    <span className="text-[11px] text-cocoa-40 font-medium">Total Ancrages</span>
                    <span className="text-[24px] font-medium text-cocoa">{blockchain?.length || 0}</span>
                </div>
                <div className="bg-white/40 p-4 rounded-[16px] border border-white/20 flex flex-col gap-1 shadow-sm">
                    <span className="text-[11px] text-cocoa-40 font-medium">Statut Réseau</span>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-[14px] font-medium text-green-600">Opérationnel</span>
                    </div>
                </div>
            </div>

            <AdminCard>
                <AdminTableHeader headers={["Entité", "Type", "Hash de Transaction", "Date", ""]} />
                <div className="flex-1 overflow-y-auto flex flex-col gap-1 mt-1.5">
                    {isLoading ? (
                        <div className="p-10 text-center text-cocoa-40 text-[12px] animate-pulse">Synchronisation blockchain...</div>
                    ) : filteredRecords.length === 0 ? (
                        <div className="p-10 text-center text-cocoa-40 text-[12px]">Aucun ancrage trouvé</div>
                    ) : (
                        filteredRecords.map((record) => (
                            <AdminTableRow key={record.id}>
                                <AdminTableCell width="w-[150px]">
                                    <span className="font-mono text-cocoa">#{record.entity_id.substring(0, 8)}</span>
                                </AdminTableCell>
                                <AdminTableCell width="w-[120px]">
                                    <span className="px-2 py-0.5 rounded-full bg-cocoa-10 text-[10px] uppercase font-bold text-cocoa-60 tracking-wider">
                                        {record.entity_type}
                                    </span>
                                </AdminTableCell>
                                <AdminTableCell width="w-[300px]">
                                    <div className="flex items-center gap-2">
                                        <LinkIcon className="h-3 w-3 text-cocoa-20 shrink-0" />
                                        <span className="text-cocoa-60 font-mono truncate max-w-[250px]">{record.hash}</span>
                                    </div>
                                </AdminTableCell>
                                <AdminTableCell width="w-[150px]" className="text-cocoa-40">
                                    {formatDate(record.created_at)}
                                </AdminTableCell>
                                <AdminTableCell className="flex justify-end">
                                    <button className="h-7 px-3 rounded-full bg-cocoa text-white text-[10px] font-medium hover:opacity-90 transition-all flex items-center gap-1.5">
                                        <CpuIcon className="h-3 w-3" />
                                        Explorer
                                    </button>
                                </AdminTableCell>
                            </AdminTableRow>
                        ))
                    )}
                </div>
            </AdminCard>
        </div>
    );
};

export default Blockchain;
