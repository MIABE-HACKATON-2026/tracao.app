import React from "react";
import { BuyerTransactionIcon } from "../components/buyer-icons";
import { DownloadIcon, FilterIcon, SearchIcon, LinkIcon } from "../../../shared/components/icons";
import Modal from "../../../shared/components/atoms/Modal";
import { useBuyerTxStore } from "../stores/transactions.store";
import type { Transaction } from "../../../shared/types";

const Transactions: React.FC = () => {
    const { transactions, isLoading, error, fetchTransactions } = useBuyerTxStore();
    const [selected, setSelected] = React.useState<Transaction | null>(null);

    React.useEffect(() => { fetchTransactions(); }, [fetchTransactions]);

    const statusStyles: Record<string, string> = {
        pending: "bg-cocoa-10 text-cocoa-60 border-cocoa-10",
        completed: "bg-[#E8F5E9] text-[#4CAF50] border-[#C8E6C9]",
        cancelled: "bg-[#FFEBEE] text-[#F44336] border-[#FFCDD2]",
    };
    const statusLabels: Record<string, string> = { pending: "En attente", completed: "Complété", cancelled: "Annulé" };

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Mes transactions</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Historique de vos achats</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer"><SearchIcon className="h-[18px] w-[18px] fill-cocoa-80 rotate-y-180" /></div>
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer"><FilterIcon className="h-[18px] w-[18px] fill-white" /></div>
                </div>
            </div>

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-4 overflow-hidden flex flex-col">
                <div className="w-full bg-[#E5E1DE] rounded-t-[12px] flex items-center h-[44px] px-6">
                    <div className="flex-1 text-[11px] font-medium text-cocoa-60">Date</div>
                    <div className="flex-1 text-[11px] font-medium text-cocoa-60">Statut</div>
                    <div className="flex-1 text-[11px] font-medium text-cocoa-60">Lot</div>
                    <div className="w-28 text-[11px] font-medium text-cocoa-60">Quantité</div>
                    <div className="w-10"></div>
                </div>
                <div className="flex-1 overflow-y-auto flex flex-col gap-1 mt-1.5">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-40 text-cocoa-40">Chargement...</div>
                    ) : error ? (
                        <div className="flex items-center justify-center h-40 text-red-500">{error}</div>
                    ) : (
                        transactions.map((t) => (
                            <div key={t.id} className="h-[48px] bg-white/40 rounded-[8px] flex items-center px-6 hover:bg-white/60 border border-white/20">
                                <div className="flex-1 text-[12px] text-cocoa-40">{new Date(t.created_at).toLocaleDateString("fr-FR")}</div>
                                <div className="flex-1">
                                    <div className={`inline-flex items-center px-2 py-0.5 rounded-[6px] text-[10px] font-medium border ${statusStyles[t.status] || ''}`}>{statusLabels[t.status]}</div>
                                </div>
                                <div className="flex-1 text-[12px] text-cocoa-40">{t.batch_id}</div>
                                <div className="w-28 text-[12px] text-cocoa-40">{t.quantity} Kg</div>
                                <div className="w-10 flex justify-end cursor-pointer" onClick={() => setSelected(t)}><DownloadIcon className="h-4 w-4 text-cocoa-20" /></div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
                <div className="p-8 flex flex-col gap-6">
                    <h2 className="text-[20px] font-medium text-cocoa">Détails de la transaction</h2>
                    {[{ label: "Quantité", value: `${selected?.quantity} Kg` }, { label: "Prix", value: `${selected?.price} FCFA` }, { label: "Date", value: selected?.created_at ? new Date(selected.created_at).toLocaleDateString("fr-FR") : "—" }].map((f, i) => (
                        <div key={i} className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 flex items-center justify-between"><span className="text-[14px] text-cocoa-40">{f.label}</span><span className="text-[14px] text-cocoa font-medium">{f.value}</span></div>
                    ))}
                    <div className="flex justify-end gap-3 mt-4">
                        <button onClick={() => setSelected(null)} className="h-[48px] px-8 rounded-full bg-cocoa-5 text-cocoa text-[14px] font-medium hover:bg-cocoa-10 cursor-pointer">Fermer</button>
                        <button className="h-[48px] px-8 rounded-full bg-black text-white text-[14px] font-medium hover:opacity-90 items-center gap-2 cursor-pointer"><DownloadIcon className="h-4 w-4" /> Attestation</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Transactions;
