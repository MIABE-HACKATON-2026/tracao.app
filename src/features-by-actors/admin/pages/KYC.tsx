import React, { useState, useEffect } from "react";
import { 
    FilterIcon, 
    SearchIcon, 
    CheckCircleIcon, 
    XCircleIcon, 
    EyeIcon,
    ShieldCheckIcon
} from "../../../shared/components/icons";
import { useAdminStore } from "../stores/admin.store";
import { AdminCard, AdminTableHeader, AdminTableRow, AdminTableCell, AdminBadge, AdminButton, AdminFilterBtn } from "../components/AdminUI";
import Modal from "../../../shared/components/atoms/Modal";
import { cn } from "../../../shared/lib/utils";
import { formatDate } from "../../../shared/utils/formatters";
import { ApiClient } from "../../../shared/api/api-client";

const KYC: React.FC = () => {
    const { kycRecords, fetchKYCRecords, isLoading } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<'pending' | 'approved' | 'rejected'>('pending');
    const [selectedKYC, setSelectedKYC] = useState<any | null>(null);
    const [isActionLoading, setIsActionLoading] = useState(false);

    useEffect(() => {
        fetchKYCRecords();
    }, [fetchKYCRecords]);

    const filteredRecords = kycRecords.filter(r => 
        (r.user_name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAction = async (id: string, action: 'approve' | 'reject', reason?: string) => {
        setIsActionLoading(true);
        try {
            await ApiClient.post(`/admin/kyc/${id}/${action}/`, { reason });
            await fetchKYCRecords();
            setSelectedKYC(null);
        } catch (error) {
            console.error(`Failed to ${action} KYC`, error);
        } finally {
            setIsActionLoading(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-5 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Validation KYC</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Vérification des identités</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-full bg-cocoa-5 flex items-center justify-center cursor-pointer hover:bg-cocoa-10 transition-colors">
                        <SearchIcon className="h-[18px] w-[18px] fill-cocoa-80" />
                    </div>
                    <div className="flex bg-cocoa-5 p-1 rounded-full">
                        {(['pending', 'approved', 'rejected'] as const).map((s) => (
                            <button
                                key={s}
                                onClick={() => setStatusFilter(s)}
                                className={cn(
                                    "px-4 py-1 rounded-full text-[11px] font-medium transition-all capitalize",
                                    statusFilter === s ? "bg-white text-cocoa shadow-sm" : "text-cocoa-40 hover:text-cocoa-60"
                                )}
                            >
                                {s === 'pending' ? 'Attente' : s === 'approved' ? 'Validés' : 'Rejetés'}
                            </button>
                        ))}
                    </div>
                    <AdminFilterBtn onClick={() => {}} />
                </div>
            </div>

            <AdminCard>
                <AdminTableHeader headers={["Utilisateur", "Rôle", "Soumis le", "Statut", ""]} />
                <div className="flex-1 overflow-y-auto flex flex-col gap-1 mt-1.5">
                    {isLoading ? (
                        <div className="p-10 text-center text-cocoa-40 text-[12px] animate-pulse">Chargement des dossiers...</div>
                    ) : filteredRecords.length === 0 ? (
                        <div className="p-10 text-center text-cocoa-40 text-[12px]">Aucun dossier KYC {statusFilter}</div>
                    ) : (
                        filteredRecords.map((record) => (
                            <AdminTableRow key={record.id} onClick={() => setSelectedKYC(record)}>
                                <AdminTableCell width="w-[250px]">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-cocoa-10 flex items-center justify-center text-cocoa font-bold text-[12px]">
                                            {(record.user_name || "U")[0]}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-medium text-cocoa">{record.user_name}</span>
                                            <span className="text-[10px] text-cocoa-40 uppercase tracking-tight">#KYC-{record.id.substring(0, 6)}</span>
                                        </div>
                                    </div>
                                </AdminTableCell>
                                <AdminTableCell width="w-[150px]" className="capitalize">{record.role}</AdminTableCell>
                                <AdminTableCell width="w-[180px]">
                                    <div className="flex flex-col">
                                        <span>{formatDate(record.submitted_at)}</span>
                                        <span className="text-[10px] text-cocoa-40">à {new Date(record.submitted_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                    </div>
                                </AdminTableCell>
                                <AdminTableCell width="w-[120px]">
                                    <AdminBadge 
                                        variant={record.status === 'approved' ? 'success' : record.status === 'rejected' ? 'error' : 'warning'} 
                                        label={record.status === 'approved' ? 'Approuvé' : record.status === 'rejected' ? 'Rejeté' : 'En attente'} 
                                    />
                                </AdminTableCell>
                                <AdminTableCell className="flex justify-end">
                                    <AdminButton size="sm" variant="secondary" onClick={() => setSelectedKYC(record)} className="gap-2">
                                        <EyeIcon className="h-3.5 w-3.5" />
                                        <span>Détails</span>
                                    </AdminButton>
                                </AdminTableCell>
                            </AdminTableRow>
                        ))
                    )}
                </div>
            </AdminCard>

            <Modal isOpen={!!selectedKYC} onClose={() => setSelectedKYC(null)}>
                <div className="p-8 flex flex-col gap-6 w-full max-w-[700px]">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[20px] font-medium text-cocoa">Dossier KYC: {selectedKYC?.user_name}</h2>
                        <AdminBadge 
                            variant={selectedKYC?.status === 'approved' ? 'success' : selectedKYC?.status === 'rejected' ? 'error' : 'warning'} 
                            label={selectedKYC?.status === 'approved' ? 'Vérifié' : selectedKYC?.status === 'rejected' ? 'Rejeté' : 'En attente'} 
                        />
                    </div>
                    
                    {selectedKYC && (
                        <div className="flex flex-col gap-6 max-h-[70vh] overflow-y-auto pr-2">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <span className="text-[11px] font-medium text-cocoa-40 ml-1">Pièce d'identité (Recto)</span>
                                    <div className="aspect-video bg-cocoa-5 rounded-[12px] border border-cocoa-10 flex items-center justify-center overflow-hidden">
                                        {selectedKYC.cni_front_image ? (
                                            <img src={selectedKYC.cni_front_image} className="w-full h-full object-contain" alt="Recto" />
                                        ) : <span className="text-[12px] text-cocoa-20">Indisponible</span>}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-[11px] font-medium text-cocoa-40 ml-1">Pièce d'identité (Verso)</span>
                                    <div className="aspect-video bg-cocoa-5 rounded-[12px] border border-cocoa-10 flex items-center justify-center overflow-hidden">
                                        {selectedKYC.cni_back_image ? (
                                            <img src={selectedKYC.cni_back_image} className="w-full h-full object-contain" alt="Verso" />
                                        ) : <span className="text-[12px] text-cocoa-20">Indisponible</span>}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex flex-col gap-1 px-4 py-3 bg-cocoa-5 rounded-[12px]">
                                    <span className="text-[11px] text-cocoa-40">Rôle</span>
                                    <span className="text-[13px] text-cocoa font-medium capitalize">{selectedKYC.role}</span>
                                </div>
                                <div className="flex flex-col gap-1 px-4 py-3 bg-cocoa-5 rounded-[12px]">
                                    <span className="text-[11px] text-cocoa-40">Email</span>
                                    <span className="text-[13px] text-cocoa font-medium truncate">{selectedKYC.email || "—"}</span>
                                </div>
                                <div className="flex flex-col gap-1 px-4 py-3 bg-cocoa-5 rounded-[12px]">
                                    <span className="text-[11px] text-cocoa-40">Date de soumission</span>
                                    <span className="text-[13px] text-cocoa font-medium">{formatDate(selectedKYC.submitted_at)}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 mt-2">
                        <AdminButton variant="secondary" onClick={() => setSelectedKYC(null)}>Fermer</AdminButton>
                        <AdminButton 
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleAction(selectedKYC.id, 'reject')}
                            disabled={isActionLoading || selectedKYC?.status === 'rejected'}
                        >
                            Rejeter
                        </AdminButton>
                        <AdminButton 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleAction(selectedKYC.id, 'approve')}
                            disabled={isActionLoading || selectedKYC?.status === 'approved'}
                        >
                            Approuver
                        </AdminButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default KYC;
