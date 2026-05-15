import React, { useState, useEffect } from "react";
import { 
    FilterIcon, 
    SearchIcon, 
    OptionIcon, 
    CheckCircleIcon,
    XCircleIcon,
    CreditCardIcon,
    ArrowRightIcon,
    TagIcon
} from "../../../shared/components/icons";
import { useAdminStore } from "../stores/admin.store";
import { AdminCard, AdminTableHeader, AdminTableRow, AdminTableCell, AdminBadge, AdminButton, AdminFilterBtn } from "../components/AdminUI";
import { cn } from "../../../shared/lib/utils";
import { formatDate } from "../../../shared/utils/formatters";

const Transactions: React.FC = () => {
    const { transactions, fetchAdminTransactions, isLoading, completeTransaction } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [activePopover, setActivePopover] = useState<string | null>(null);

    useEffect(() => {
        fetchAdminTransactions();
    }, [fetchAdminTransactions]);

    const filteredTransactions = (transactions || []).filter(t => 
        (t.buyer_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.batch_code || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleComplete = async (id: string) => {
        try {
            await completeTransaction(id);
            setActivePopover(null);
        } catch (error) {
            console.error("Failed to complete transaction", error);
        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-5 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Transactions Commerciales</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Suivi des flux financiers</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-full bg-cocoa-5 flex items-center justify-center cursor-pointer hover:bg-cocoa-10 transition-colors">
                        <SearchIcon className="h-[18px] w-[18px] fill-cocoa-80" />
                    </div>
                    <AdminFilterBtn onClick={() => {}} />
                </div>
            </div>

            <AdminCard>
                <AdminTableHeader headers={["Transaction / Lot", "Acteurs", "Qté & Prix", "Statut", ""]} />
                <div className="flex-1 overflow-y-auto flex flex-col gap-1 mt-1.5">
                    {isLoading ? (
                        <div className="p-10 text-center text-cocoa-40 text-[12px] animate-pulse">Chargement des transactions...</div>
                    ) : filteredTransactions.length === 0 ? (
                        <div className="p-10 text-center text-cocoa-40 text-[12px]">Aucune transaction trouvée</div>
                    ) : (
                        filteredTransactions.map((tx) => (
                            <AdminTableRow key={tx.id}>
                                <AdminTableCell width="w-[200px]">
                                    <div className="flex flex-col">
                                        <span className="text-[12px] font-medium text-cocoa">TX-{tx.id.substring(0, 8)}</span>
                                        <span className="text-[10px] text-cocoa-40 flex items-center gap-1 uppercase tracking-tight">
                                            <TagIcon className="h-2.5 w-2.5" />
                                            {tx.batch_code || "Inconnu"}
                                        </span>
                                    </div>
                                </AdminTableCell>
                                <AdminTableCell width="w-[250px]">
                                    <div className="flex items-center gap-2 text-[11px]">
                                        <span className="font-medium text-cocoa truncate max-w-[100px]">{tx.seller_name || "Vendeur"}</span>
                                        <ArrowRightIcon className="h-3 w-3 opacity-20 shrink-0" />
                                        <span className="font-medium text-cocoa truncate max-w-[100px]">{tx.buyer_name || "Acheteur"}</span>
                                    </div>
                                </AdminTableCell>
                                <AdminTableCell width="w-[150px]">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-cocoa">{tx.price.toLocaleString()} FCFA</span>
                                        <span className="text-[10px] text-cocoa-40">{tx.quantity} Kg</span>
                                    </div>
                                </AdminTableCell>
                                <AdminTableCell width="w-[120px]">
                                    <AdminBadge 
                                        variant={tx.status === 'completed' ? 'success' : tx.status === 'cancelled' ? 'error' : 'warning'} 
                                        label={tx.status === 'completed' ? 'Validée' : tx.status === 'cancelled' ? 'Annulée' : 'Attente'} 
                                    />
                                </AdminTableCell>
                                <AdminTableCell className="flex justify-end gap-3">
                                    <button className="text-[10px] font-medium px-3 py-1 rounded-full border border-cocoa-10 text-cocoa-60 hover:bg-cocoa-5 cursor-pointer">
                                        Facture
                                    </button>
                                    <div className="relative">
                                        <div 
                                            className={cn(
                                                "h-8 w-8 rounded-full flex items-center justify-center transition-colors cursor-pointer",
                                                tx.status === 'completed' ? "opacity-30 cursor-not-allowed" : "hover:bg-cocoa-10"
                                            )} 
                                            onClick={(e) => { 
                                                if(tx.status !== 'completed') {
                                                    e.stopPropagation(); 
                                                    setActivePopover(activePopover === tx.id ? null : tx.id); 
                                                }
                                            }}
                                        >
                                            <OptionIcon className="h-4 w-4 text-cocoa-40" />
                                        </div>
                                        {activePopover === tx.id && (
                                            <div className="absolute right-0 top-10 w-48 bg-white rounded-[12px] shadow-lg border border-cocoa-10 py-2 z-10 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                                                <button 
                                                    onClick={() => handleComplete(tx.id)}
                                                    className="w-full text-left px-4 py-2 text-[12px] text-green-600 hover:bg-green-50 transition-colors flex items-center gap-2 cursor-pointer"
                                                >
                                                    <CheckCircleIcon className="h-3.5 w-3.5" />
                                                    Valider la vente
                                                </button>
                                                <button className="w-full text-left px-4 py-2 text-[12px] text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2 cursor-pointer">
                                                    <XCircleIcon className="h-3.5 w-3.5" />
                                                    Annuler la vente
                                                </button>
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

export default Transactions;
