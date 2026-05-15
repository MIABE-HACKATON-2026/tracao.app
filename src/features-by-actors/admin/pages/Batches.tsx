import React, { useState, useEffect } from "react";
import { 
    FilterIcon, 
    SearchIcon, 
    MoreVerticalIcon, 
    EyeIcon,
    CheckCircleIcon,
    XCircleIcon,
    LockIcon,
    CalendarIcon,
    TagIcon,
    UserIcon
} from "../../../shared/components/icons";
import { useAdminStore } from "../stores/admin.store";
import { cn } from "../../../shared/lib/utils";
import { formatDate } from "../../../shared/utils/formatters";

const Batches: React.FC = () => {
    const { batches, fetchAdminBatches, isLoading, updateBatchStatus } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [activePopover, setActivePopover] = useState<string | null>(null);

    useEffect(() => {
        fetchAdminBatches();
    }, []);

    const filteredBatches = (batches || []).filter(b => 
        (b.unique_code || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (b.farmer_name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAction = async (id: string, status: 'approve' | 'reject') => {
        try {
            await updateBatchStatus(id, status);
            setActivePopover(null);
        } catch (error) {
            console.error("Failed to update batch status", error);
        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[20px] font-semibold text-cocoa tracking-tight">Gestion des Lots</h1>
                    <p className="text-[13px] text-cocoa-60">Visualisez et validez tous les lots de production</p>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-[280px]">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cocoa-20" />
                        <input 
                            type="text" 
                            placeholder="Rechercher par code ou producteur..." 
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
                                <th className="px-6 py-4 text-[11px] font-semibold text-cocoa-40 uppercase tracking-wider">Code Lot</th>
                                <th className="px-6 py-4 text-[11px] font-semibold text-cocoa-40 uppercase tracking-wider">Producteur</th>
                                <th className="px-6 py-4 text-[11px] font-semibold text-cocoa-40 uppercase tracking-wider">Culture & Qté</th>
                                <th className="px-6 py-4 text-[11px] font-semibold text-cocoa-40 uppercase tracking-wider">Statut</th>
                                <th className="px-6 py-4 text-[11px] font-semibold text-cocoa-40 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cocoa-5">
                            {isLoading ? (
                                <tr><td colSpan={5} className="px-6 py-10 text-center text-cocoa-20">Chargement...</td></tr>
                            ) : filteredBatches.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <TagIcon className="h-10 w-10 opacity-20 mx-auto mb-2" />
                                        <p className="text-[14px] text-cocoa-40">Aucun lot trouvé</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredBatches.map((batch) => (
                                    <tr key={batch.id} className="hover:bg-cocoa-[1%] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-[14px] font-semibold text-cocoa">{batch.unique_code}</span>
                                                <span className="text-[11px] text-cocoa-40 uppercase tracking-tighter">Saison {batch.season}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-[13px] text-cocoa-60">
                                            <div className="flex items-center gap-2">
                                                <UserIcon className="h-3.5 w-3.5 opacity-40" />
                                                <span>{batch.farmer_name || "N/A"}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-[13px] text-cocoa font-medium capitalize">{batch.crop_type}</span>
                                                <span className="text-[12px] text-cocoa-40">{batch.estimated_quantity} Kg estimés</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={cn(
                                                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase",
                                                batch.status === 'approved' ? "bg-green-50 text-green-700" : 
                                                batch.status === 'rejected' ? "bg-red-50 text-red-700" : 
                                                batch.status === 'locked' ? "bg-indigo-50 text-indigo-700" : "bg-orange-50 text-orange-700"
                                            )}>
                                                {batch.status === 'approved' ? "Approuvé" : 
                                                 batch.status === 'rejected' ? "Rejeté" : 
                                                 batch.status === 'locked' ? "Verrouillé" : "En attente"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right relative">
                                            <button 
                                                onClick={() => setActivePopover(activePopover === batch.id ? null : batch.id)}
                                                className="h-8 w-8 rounded-full hover:bg-cocoa-5 flex items-center justify-center ml-auto"
                                            >
                                                <MoreVerticalIcon className="h-4 w-4 text-cocoa-40" />
                                            </button>

                                            {activePopover === batch.id && (
                                                <>
                                                    <div className="fixed inset-0 z-10" onClick={() => setActivePopover(null)}></div>
                                                    <div className="absolute right-6 top-12 w-[180px] bg-white rounded-[12px] shadow-xl border border-cocoa-10 z-20 py-1">
                                                        <button className="w-full px-4 py-2 text-left text-[13px] text-cocoa hover:bg-cocoa-5 flex items-center gap-2">
                                                            <EyeIcon className="h-3.5 w-3.5 opacity-40" />
                                                            Détails
                                                        </button>
                                                        {batch.status === 'pending' && (
                                                            <>
                                                                <button 
                                                                    onClick={() => handleAction(batch.id, 'approve')}
                                                                    className="w-full px-4 py-2 text-left text-[13px] text-green-600 hover:bg-green-50 flex items-center gap-2"
                                                                >
                                                                    <CheckCircleIcon className="h-3.5 w-3.5" />
                                                                    Approuver
                                                                </button>
                                                                <button 
                                                                    onClick={() => handleAction(batch.id, 'reject')}
                                                                    className="w-full px-4 py-2 text-left text-[13px] text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                                >
                                                                    <XCircleIcon className="h-3.5 w-3.5" />
                                                                    Rejeter
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </>
                                            )}
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

export default Batches;
