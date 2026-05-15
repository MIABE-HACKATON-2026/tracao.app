import React, { useState, useEffect } from "react";
import { 
    FilterIcon, 
    SearchIcon, 
    CheckCircleIcon, 
    XCircleIcon, 
    EyeIcon,
    UserIcon,
    MailIcon,
    CalendarIcon,
    ClockIcon,
    ShieldCheckIcon
} from "../../../shared/components/icons";
import { useAdminStore } from "../stores/admin.store";
import { cn } from "../../../shared/lib/utils";
import { formatDate } from "../../../shared/utils/formatters";
import { ApiClient } from "../../../shared/api/api-client";

const KYC: React.FC = () => {
    const { kycRecords, fetchKYCRecords, isLoading } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<'pending' | 'approved' | 'rejected'>('pending');
    const [selectedKYC, setSelectedKYC] = useState<any | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isActionLoading, setIsActionLoading] = useState(false);

    useEffect(() => {
        fetchKYCRecords();
    }, []);

    const filteredRecords = kycRecords.filter(r => 
        (r.user_name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAction = async (id: string, action: 'approve' | 'reject', reason?: string) => {
        setIsActionLoading(true);
        try {
            await ApiClient.post(`/admin/kyc/${id}/${action}/`, { reason });
            await fetchKYCRecords();
            setIsDetailModalOpen(false);
        } catch (error) {
            console.error(`Failed to ${action} KYC`, error);
        } finally {
            setIsActionLoading(false);
        }
    };

    const openDetails = (record: any) => {
        setSelectedKYC(record);
        setIsDetailModalOpen(true);
    };

    return (
        <div className="w-full h-full flex flex-col gap-6 animate-in fade-in duration-500">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[20px] font-semibold text-cocoa tracking-tight">Validation KYC</h1>
                    <p className="text-[13px] text-cocoa-60">Vérifiez les identités des acteurs du système</p>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-[280px]">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cocoa-20" />
                        <input 
                            type="text" 
                            placeholder="Rechercher un utilisateur..." 
                            className="w-full h-10 pl-10 pr-4 rounded-[12px] bg-white border border-cocoa-10 text-[13px] focus:outline-none focus:ring-2 focus:ring-cocoa/5 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {/* Status Tabs */}
                    <div className="flex bg-cocoa-5 p-1 rounded-[12px]">
                        {(['pending', 'approved', 'rejected'] as const).map((s) => (
                            <button
                                key={s}
                                onClick={() => setStatusFilter(s)}
                                className={cn(
                                    "px-4 py-1.5 rounded-[9px] text-[12px] font-medium transition-all capitalize",
                                    statusFilter === s ? "bg-white text-cocoa shadow-sm" : "text-cocoa-40 hover:text-cocoa-60"
                                )}
                            >
                                {s === 'pending' ? 'En attente' : s === 'approved' ? 'Validés' : 'Rejetés'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="flex-1 bg-white rounded-[20px] border border-cocoa-5 shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-cocoa-[2%] border-b border-cocoa-5">
                                <th className="px-6 py-4 text-[11px] font-semibold text-cocoa-40 uppercase tracking-wider">Utilisateur</th>
                                <th className="px-6 py-4 text-[11px] font-semibold text-cocoa-40 uppercase tracking-wider">Rôle</th>
                                <th className="px-6 py-4 text-[11px] font-semibold text-cocoa-40 uppercase tracking-wider">Soumis le</th>
                                <th className="px-6 py-4 text-[11px] font-semibold text-cocoa-40 uppercase tracking-wider">Statut</th>
                                <th className="px-6 py-4 text-[11px] font-semibold text-cocoa-40 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cocoa-5">
                            {isLoading ? (
                                <tr><td colSpan={5} className="px-6 py-10 text-center text-cocoa-20">Chargement...</td></tr>
                            ) : filteredRecords.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-2 text-cocoa-40">
                                            <ShieldCheckIcon className="h-10 w-10 opacity-20" />
                                            <p className="text-[14px]">Aucun dossier KYC {statusFilter === 'pending' ? 'en attente' : statusFilter}</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredRecords.map((record) => (
                                    <tr key={record.id} className="hover:bg-cocoa-[1%] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-[12px] bg-cocoa-5 flex items-center justify-center text-cocoa font-bold">
                                                    {(record.user_name || "U")[0]}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[14px] font-semibold text-cocoa">{record.user_name}</span>
                                                    <span className="text-[12px] text-cocoa-40 italic">#KYC-{record.id.substring(0, 6)}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 capitalize text-[13px] text-cocoa-60">{record.role}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col text-[12px]">
                                                <span className="text-cocoa-60">{formatDate(record.submitted_at)}</span>
                                                <span className="text-cocoa-40">à {new Date(record.submitted_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={cn(
                                                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase",
                                                record.status === 'approved' ? "bg-green-50 text-green-700" : 
                                                record.status === 'rejected' ? "bg-red-50 text-red-700" : "bg-orange-50 text-orange-700"
                                            )}>
                                                {record.status === 'approved' ? "Approuvé" : 
                                                 record.status === 'rejected' ? "Rejeté" : "En attente"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => openDetails(record)}
                                                className="h-8 px-3 rounded-[8px] bg-cocoa text-white text-[12px] font-medium hover:bg-cocoa-90 transition-all active:scale-95 flex items-center gap-2 ml-auto"
                                            >
                                                <EyeIcon className="h-3.5 w-3.5" />
                                                Vérifier
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* KYC Detail Modal Placeholder (Simplified for logic) */}
            {isDetailModalOpen && selectedKYC && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-[800px] max-h-[90vh] rounded-[24px] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                        <div className="px-8 py-6 border-b border-cocoa-5 flex justify-between items-center bg-cocoa-2">
                            <h2 className="text-[18px] font-semibold text-cocoa">Dossier KYC: {selectedKYC.user_name}</h2>
                            <button onClick={() => setIsDetailModalOpen(false)} className="text-cocoa-40 hover:text-cocoa">✕</button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
                            {/* Documents Grid */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <span className="text-[12px] font-semibold text-cocoa-40 uppercase tracking-wider">CNI Recto</span>
                                    <div className="aspect-[16/10] bg-cocoa-5 rounded-[12px] border-2 border-dashed border-cocoa-10 flex items-center justify-center overflow-hidden">
                                        {selectedKYC.cni_front_image ? (
                                            <img src={selectedKYC.cni_front_image} className="w-full h-full object-contain" alt="CNI Recto" />
                                        ) : <span className="text-cocoa-20">Image non disponible</span>}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-[12px] font-semibold text-cocoa-40 uppercase tracking-wider">CNI Verso</span>
                                    <div className="aspect-[16/10] bg-cocoa-5 rounded-[12px] border-2 border-dashed border-cocoa-10 flex items-center justify-center overflow-hidden">
                                         {selectedKYC.cni_back_image ? (
                                            <img src={selectedKYC.cni_back_image} className="w-full h-full object-contain" alt="CNI Verso" />
                                        ) : <span className="text-cocoa-20">Image non disponible</span>}
                                    </div>
                                </div>
                            </div>

                            {/* Info Table */}
                            <div className="bg-cocoa-2 rounded-[16px] p-6 border border-cocoa-5 grid grid-cols-3 gap-6">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[11px] text-cocoa-40 uppercase font-bold tracking-widest">Rôle</span>
                                    <span className="text-[14px] text-cocoa font-medium capitalize">{selectedKYC.role}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[11px] text-cocoa-40 uppercase font-bold tracking-widest">Soumis le</span>
                                    <span className="text-[14px] text-cocoa font-medium">{formatDate(selectedKYC.submitted_at)}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[11px] text-cocoa-40 uppercase font-bold tracking-widest">Email</span>
                                    <span className="text-[14px] text-cocoa font-medium">{selectedKYC.email || "Non renseigné"}</span>
                                </div>
                            </div>
                        </div>

                        <div className="px-8 py-6 border-t border-cocoa-5 bg-cocoa-2 flex justify-end gap-3">
                            <button 
                                onClick={() => handleAction(selectedKYC.id, 'reject')}
                                className="h-11 px-6 rounded-[14px] border border-red-200 text-red-600 font-semibold text-[14px] hover:bg-red-50 transition-all active:scale-95 disabled:opacity-50"
                                disabled={isActionLoading}
                            >
                                Rejeter le dossier
                            </button>
                            <button 
                                onClick={() => handleAction(selectedKYC.id, 'approve')}
                                className="h-11 px-8 rounded-[14px] bg-green-600 text-white font-semibold text-[14px] hover:bg-green-700 shadow-md shadow-green-200 transition-all active:scale-95 disabled:opacity-50"
                                disabled={isActionLoading}
                            >
                                Approuver KYC
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KYC;
