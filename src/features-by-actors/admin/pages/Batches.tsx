import React, { useState, useEffect } from "react";
import { 
    FilterIcon, 
    SearchIcon, 
    OptionIcon, 
    EyeIcon,
    CheckCircleIcon,
    XCircleIcon,
    TagIcon,
    UserIcon
} from "../../../shared/components/icons";
import { useAdminStore } from "../stores/admin.store";
import { AdminCard, AdminTableHeader, AdminTableRow, AdminTableCell, AdminBadge, AdminButton, AdminFilterBtn } from "../components/AdminUI";
import { cn } from "../../../shared/lib/utils";
import { formatDate } from "../../../shared/utils/formatters";

const Batches: React.FC = () => {
    const { batches, fetchAdminBatches, isLoading, updateBatchStatus } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [activePopover, setActivePopover] = useState<string | null>(null);

    useEffect(() => {
        fetchAdminBatches();
    }, [fetchAdminBatches]);

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
        <div className="w-full h-full flex flex-col gap-5 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Gestion des Lots</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Suivi et validation des récoltes</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-full bg-cocoa-5 flex items-center justify-center cursor-pointer hover:bg-cocoa-10 transition-colors">
                        <SearchIcon className="h-[18px] w-[18px] fill-cocoa-80" />
                    </div>
                    <AdminFilterBtn onClick={() => {}} />
                </div>
            </div>

            <AdminCard>
                <AdminTableHeader headers={["Code Lot", "Producteur", "Culture & Qté", "Statut", ""]} />
                <div className="flex-1 overflow-y-auto flex flex-col gap-1 mt-1.5">
                    {isLoading ? (
                        <div className="p-10 text-center text-cocoa-40 text-[12px] animate-pulse">Chargement des lots...</div>
                    ) : filteredBatches.length === 0 ? (
                        <div className="p-10 text-center text-cocoa-40 text-[12px]">Aucun lot trouvé</div>
                    ) : (
                        filteredBatches.map((batch) => (
                            <AdminTableRow key={batch.id}>
                                <AdminTableCell width="w-[200px]">
                                    <div className="flex flex-col">
                                        <span className="text-[12px] font-medium text-cocoa">{batch.unique_code}</span>
                                        <span className="text-[10px] text-cocoa-40 uppercase tracking-tight">Saison {batch.season}</span>
                                    </div>
                                </AdminTableCell>
                                <AdminTableCell width="w-[220px]">
                                    <div className="flex items-center gap-2">
                                        <UserIcon className="h-3.5 w-3.5 opacity-40" />
                                        <span>{batch.farmer_name || "—"}</span>
                                    </div>
                                </AdminTableCell>
                                <AdminTableCell width="w-[180px]">
                                    <div className="flex flex-col">
                                        <span className="capitalize">{batch.crop_type}</span>
                                        <span className="text-[10px] text-cocoa-40">{batch.estimated_quantity} Kg estimés</span>
                                    </div>
                                </AdminTableCell>
                                <AdminTableCell width="w-[120px]">
                                    <AdminBadge 
                                        variant={batch.status === 'approved' ? 'success' : batch.status === 'rejected' ? 'error' : 'warning'} 
                                        label={batch.status === 'approved' ? 'Approuvé' : batch.status === 'rejected' ? 'Rejeté' : 'En attente'} 
                                    />
                                </AdminTableCell>
                                <AdminTableCell className="flex justify-end gap-3">
                                    <button className="text-[10px] font-medium px-3 py-1 rounded-full border border-cocoa-10 text-cocoa-60 hover:bg-cocoa-5 cursor-pointer">
                                        Voir détails
                                    </button>
                                    <div className="relative">
                                        <div 
                                            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-cocoa-10 transition-colors cursor-pointer" 
                                            onClick={(e) => { e.stopPropagation(); setActivePopover(activePopover === batch.id ? null : batch.id); }}
                                        >
                                            <OptionIcon className="h-4 w-4 text-cocoa-40" />
                                        </div>
                                        {activePopover === batch.id && (
                                            <div className="absolute right-0 top-10 w-48 bg-white rounded-[12px] shadow-lg border border-cocoa-10 py-2 z-10 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                                                <button className="w-full text-left px-4 py-2 text-[12px] text-cocoa hover:bg-cocoa-5 transition-colors flex items-center gap-2 cursor-pointer">
                                                    <EyeIcon className="h-3.5 w-3.5" />
                                                    Voir historique
                                                </button>
                                                {batch.status === 'pending' && (
                                                    <>
                                                        <button 
                                                            onClick={() => handleAction(batch.id, 'approve')}
                                                            className="w-full text-left px-4 py-2 text-[12px] text-green-600 hover:bg-green-50 transition-colors flex items-center gap-2 cursor-pointer"
                                                        >
                                                            <CheckCircleIcon className="h-3.5 w-3.5" />
                                                            Approuver le lot
                                                        </button>
                                                        <button 
                                                            onClick={() => handleAction(batch.id, 'reject')}
                                                            className="w-full text-left px-4 py-2 text-[12px] text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2 cursor-pointer"
                                                        >
                                                            <XCircleIcon className="h-3.5 w-3.5" />
                                                            Rejeter le lot
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </AdminTableCell>
                            </AdminTableRow>
                        ))
                    )}
                </div>
            </AdminCard>
        </div>
    );
};

export default Batches;
