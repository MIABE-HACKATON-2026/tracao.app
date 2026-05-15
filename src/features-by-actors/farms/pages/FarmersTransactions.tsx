import React from "react";
import { DownloadIcon, FilterIcon, SearchIcon, LinkIcon, CheckIcon } from "../../../shared/components/icons";
import Modal from "../../../shared/components/atoms/Modal";

interface Transaction {
    id: string;
    date: string;
    status: 'pending' | 'completed' | 'cancelled';
    quantity: string;
}

const FarmersTransactions: React.FC = () => {
    const [selectedTransaction, setSelectedTransaction] = React.useState<Transaction | null>(null);

    const transactions: Transaction[] = [
        { id: "1", date: "11-03-2026", status: "pending", quantity: "123 Kg" },
        { id: "2", date: "12-03-2026", status: "pending", quantity: "150 Kg" },
        { id: "3", date: "13-03-2026", status: "completed", quantity: "200 Kg" },
        { id: "4", date: "14-03-2026", status: "cancelled", quantity: "100 Kg" },
        { id: "5", date: "15-03-2026", status: "pending", quantity: "175 Kg" },
    ];

    const getStatusStyle = (status: Transaction['status']) => {
        switch (status) {
            case 'pending':
                return { bg: 'bg-[#F0F2F5]', border: 'border-[#D9E1E7]', dot: 'bg-cocoa-20', text: 'En attente' };
            case 'completed':
                return { bg: 'bg-[#E8F5E9]', border: 'border-[#C8E6C9]', dot: 'bg-[#4CAF50]', text: 'Complété' };
            case 'cancelled':
                return { bg: 'bg-[#FFEBEE]', border: 'border-[#FFCDD2]', dot: 'bg-[#F44336]', text: 'Annulé' };
        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Listes des transactions</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Cette section donne un accès en lecture uniquement sur les transactions éffectuées</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer hover:bg-cocoa-10 transition-colors">
                        <SearchIcon className="h-[18px] w-[18px] fill-cocoa-80 rotate-y-180" />
                    </div>
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                        <FilterIcon className="h-[18px] w-[18px] fill-white" />
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-4 overflow-hidden flex flex-col">
                <div className="w-full bg-[#E5E1DE] rounded-t-[12px] flex items-center h-[48px] px-6">
                    <div className="flex-1 text-[12px] font-medium text-cocoa-60">Date</div>
                    <div className="flex-1 text-[12px] font-medium text-cocoa-60">Statut</div>
                    <div className="flex-1 text-[12px] font-medium text-cocoa-60">Quantité vendue</div>
                    <div className="flex-1 text-[12px] font-medium text-cocoa-60 text-center">Historique</div>
                    <div className="flex-1 text-[12px] font-medium text-cocoa-60 text-right">Télécharger preuve</div>
                </div>
                
                <div className="flex-1 overflow-y-auto flex flex-col gap-1.5 mt-1.5">
                    {transactions.map((t) => {
                        const style = getStatusStyle(t.status);
                        return (
                            <div key={t.id} className="h-[54px] bg-white/40 rounded-[8px] flex items-center px-6 hover:bg-white/60 transition-colors border border-white/20">
                                <div className="flex-1 text-[12px] text-cocoa-40">{t.date}</div>
                                <div className="flex-1">
                                    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${style.bg} border ${style.border}`}>
                                        <div className={`h-1 w-1 rounded-full ${style.dot}`}></div>
                                        <span className="text-[10px] text-cocoa-60 font-medium">{style.text}</span>
                                    </div>
                                </div>
                                <div className="flex-1 text-[12px] text-cocoa-40">{t.quantity}</div>
                                <div className="flex-1 flex justify-center">
                                    <button 
                                        onClick={() => setSelectedTransaction(t)}
                                        className="text-[12px] text-cocoa font-medium underline underline-offset-4 decoration-cocoa-20 hover:decoration-cocoa transition-all cursor-pointer"
                                    >
                                        Consulter l’historique
                                    </button>
                                </div>
                                <div className="flex-1 flex justify-end">
                                    <button className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-cocoa-5 transition-colors">
                                        <DownloadIcon className="h-4 w-4 text-cocoa-40" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modal de Détails/Historique */}
            <Modal isOpen={!!selectedTransaction} onClose={() => setSelectedTransaction(null)}>
                <div className="p-8 flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[20px] font-medium text-cocoa">Historique de la transaction</h2>
                        <p className="text-[14px] text-cocoa-40 font-normal">Crée le 11 Janvier 2026</p>
                    </div>

                    <div className="flex flex-col gap-6">
                        {/* Informations du lot */}
                        <div className="bg-cocoa-5 rounded-[16px] p-6 flex flex-col gap-4">
                            <span className="text-[12px] text-cocoa-20 font-medium uppercase tracking-wide">Informations du lot</span>
                            
                            <div className="flex flex-col gap-3">
                                <div className="h-[48px] bg-white rounded-[12px] px-4 flex items-center justify-between">
                                    <span className="text-[14px] text-cocoa-40 font-normal">Quantité vendue :</span>
                                    <span className="text-[14px] text-cocoa font-medium">124Kg</span>
                                </div>
                                <div className="h-[48px] bg-white rounded-[12px] px-4 flex items-center justify-between">
                                    <span className="text-[14px] text-cocoa-40 font-normal">Code unique du lot :</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[14px] text-cocoa font-medium">TRC-YYYY-XXXX-hjbsd123</span>
                                        <LinkIcon className="h-3.5 w-3.5 text-cocoa-40 cursor-pointer hover:text-cocoa transition-colors" />
                                    </div>
                                </div>
                            </div>

                            {/* Timeline des statuts */}
                            <div className="flex flex-col gap-4 mt-2">
                                <span className="text-[12px] text-cocoa-20 font-medium uppercase tracking-wide">Statut à chaque étape</span>
                                <div className="flex flex-col gap-4 pl-1">
                                    <div className="flex items-center gap-3">
                                        <div className="h-6 w-6 rounded-full bg-cocoa flex items-center justify-center">
                                            <CheckIcon className="h-3 w-3 fill-white" />
                                        </div>
                                        <span className="text-[14px] text-cocoa font-medium">En attente</span>
                                    </div>
                                    <div className="flex items-center gap-3 relative">
                                        <div className="absolute left-3 -top-4 w-px h-4 bg-cocoa-10"></div>
                                        <div className="h-6 w-6 rounded-full bg-cocoa flex items-center justify-center">
                                            <CheckIcon className="h-3 w-3 fill-white" />
                                        </div>
                                        <span className="text-[14px] text-cocoa font-medium">Complété</span>
                                    </div>
                                    <div className="flex items-center gap-3 relative">
                                        <div className="absolute left-3 -top-4 w-px h-4 bg-cocoa-10"></div>
                                        <div className="h-6 w-6 rounded-full border-2 border-dashed border-cocoa-10 flex items-center justify-center">
                                        </div>
                                        <span className="text-[14px] text-cocoa-20 font-normal">Annulé</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Informations vendeurs/acheteurs */}
                        <div className="bg-cocoa-5 rounded-[16px] p-6 flex flex-col gap-4">
                            <span className="text-[12px] text-cocoa-20 font-medium uppercase tracking-wide">Informations des vendeurs et acheteurs</span>
                            
                            <div className="flex flex-col gap-3">
                                <div className="h-[48px] bg-white rounded-[12px] px-4 flex items-center justify-between">
                                    <span className="text-[14px] text-cocoa-40 font-normal">Agriculteur :</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[14px] text-cocoa font-medium">John Doe</span>
                                        <LinkIcon className="h-3.5 w-3.5 text-cocoa-40 cursor-pointer hover:text-cocoa transition-colors" />
                                    </div>
                                </div>
                                <div className="h-[48px] bg-white rounded-[12px] px-4 flex items-center justify-between">
                                    <span className="text-[14px] text-cocoa-40 font-normal">Acheteur</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[14px] text-cocoa font-medium">Bendo Richard</span>
                                        <LinkIcon className="h-3.5 w-3.5 text-cocoa-40 cursor-pointer hover:text-cocoa transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={() => setSelectedTransaction(null)}
                        className="h-[48px] px-8 rounded-full bg-cocoa-5 text-cocoa text-[14px] font-medium hover:bg-cocoa-10 transition-colors self-end mt-2"
                    >
                        Fermer
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default FarmersTransactions;
