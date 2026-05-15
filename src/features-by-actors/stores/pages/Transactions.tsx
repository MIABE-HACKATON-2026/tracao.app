import React, { useState, useEffect } from "react";
import { 
    FilterIcon, 
    SearchIcon, 
    CreditCardIcon,
    ArrowRightIcon,
    TagIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon
} from "../../../shared/components/icons";
import { ApiClient } from "../../../shared/api/api-client";
import { cn } from "../../../shared/lib/utils";
import { formatDate } from "../../../shared/utils/formatters";

const Transactions: React.FC = () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchTransactions = async () => {
        setIsLoading(true);
        try {
            const data = await ApiClient.get<any[]>("/transactions/");
            setTransactions(data);
        } catch (error) {
            console.error("Erreur chargement transactions", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const filteredTransactions = transactions.filter(t => 
        (t.batch_code || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.buyer_name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full h-full flex flex-col gap-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[20px] font-bold text-cocoa tracking-tight">Registre des Transactions</h1>
                    <p className="text-[13px] text-cocoa-60">Historique des ventes et achats de la coopérative</p>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-[280px]">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cocoa-20" />
                        <input 
                            type="text" 
                            placeholder="Rechercher par lot ou acheteur..." 
                            className="w-full h-10 pl-10 pr-4 rounded-[12px] bg-white border border-cocoa-10 text-[13px] focus:outline-none focus:ring-2 focus:ring-cocoa/5 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-white rounded-[24px] border border-cocoa-5 shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-cocoa-[2%] border-b border-cocoa-5">
                                <th className="px-6 py-4 text-[11px] font-bold text-cocoa-40 uppercase tracking-widest">Transaction / Lot</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-cocoa-40 uppercase tracking-widest">Acheteur</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-cocoa-40 uppercase tracking-widest">Volume & Prix</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-cocoa-40 uppercase tracking-widest">Date</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-cocoa-40 uppercase tracking-widest text-right">Statut</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cocoa-5">
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={5} className="px-6 py-6"><div className="h-4 bg-cocoa-5 rounded w-full"></div></td>
                                    </tr>
                                ))
                            ) : filteredTransactions.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3 opacity-20">
                                            <CreditCardIcon className="h-12 w-12" />
                                            <p className="text-[14px] font-medium">Aucune transaction enregistrée</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredTransactions.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-cocoa-[1%] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-[14px] font-bold text-cocoa">#{tx.id.substring(0, 8)}</span>
                                                <span className="text-[11px] text-cocoa-40 flex items-center gap-1">
                                                    <TagIcon className="h-2.5 w-2.5" />
                                                    {tx.batch_code || "Lot #---"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[13px] font-medium text-cocoa">{tx.buyer_name || "Acheteur inconnu"}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-[14px] font-bold text-cocoa">{tx.price?.toLocaleString()} FCFA</span>
                                                <span className="text-[11px] text-cocoa-40 font-bold uppercase">{tx.quantity} Kg</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-cocoa-40 text-[12px]">
                                                <ClockIcon className="h-3.5 w-3.5" />
                                                <span>{formatDate(tx.created_at)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className={cn(
                                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                                                tx.status === 'completed' ? "bg-green-100 text-green-700" : 
                                                tx.status === 'cancelled' ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                                            )}>
                                                {tx.status === 'completed' ? <CheckCircleIcon className="h-3 w-3" /> : 
                                                 tx.status === 'cancelled' ? <XCircleIcon className="h-3 w-3" /> : null}
                                                {tx.status === 'completed' ? "Validée" : 
                                                 tx.status === 'cancelled' ? "Annulée" : "En attente"}
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

export default Transactions;
