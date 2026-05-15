import React from "react";
import { Link } from "react-router-dom";
import {
    BuyerDashboardIcon, BuyerTransactionIcon, BuyerTraceIcon,
    BuyerBlockchainIcon, BuyerTransportIcon, BuyerMarketIcon
} from "../components/buyer-icons";
import { ArrowRightIcon, EyeIcon } from "../../../shared/components/icons";
import { useBuyerTxStore } from "../stores/transactions.store";
import { useMarketStore } from "../stores/market.store";

const BuyersDashboard: React.FC = () => {
    const { transactions, fetchTransactions } = useBuyerTxStore();
    const { batches, fetchBatches } = useMarketStore();

    React.useEffect(() => {
        fetchTransactions();
        fetchBatches();
    }, [fetchTransactions, fetchBatches]);

    const completedThisMonth = transactions.filter(t => t.status === 'completed').length;
    const pendingCount = transactions.filter(t => t.status === 'pending').length;
    const availableLots = batches.length;

    return (
        <div className="w-full h-full flex flex-col gap-6">
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[20px] font-medium text-cocoa">Espace Acheteur</h1>
                    <p className="text-[14px] text-cocoa-60">Explorez, achetez et tracez vos lots</p>
                </div>
                <Link to="/buyers/market" className="h-[38px] px-4 rounded-[12px] bg-cocoa-5 flex items-center gap-2 hover:bg-cocoa-10 transition-colors">
                    <BuyerMarketIcon className="h-4 w-4" />
                    <span className="text-[13px] text-cocoa font-medium">Explorer les lots</span>
                </Link>
            </div>

            <div className="grid grid-cols-4 gap-4">
                <div className="bg-cocoa rounded-[24px] p-5 flex flex-col gap-4 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-all">
                    <BuyerTransactionIcon className="h-20 w-20 absolute top-0 right-0 p-4 opacity-10" />
                    <div className="h-9 w-9 rounded-[10px] bg-white/10 flex items-center justify-center relative z-10"><BuyerTransactionIcon className="h-4 w-4" /></div>
                    <div className="relative z-10">
                        <span className="text-white text-[24px] font-medium">{completedThisMonth}</span>
                        <div className="text-white/60 text-[12px]">Achats ce mois</div>
                    </div>
                    <div className="pt-3 border-t border-white/10 flex justify-between relative z-10">
                        <span className="text-[11px] text-white/50">Voir</span>
                        <ArrowRightIcon className="h-3.5 w-3.5 text-white/50" />
                    </div>
                </div>

                <div className="bg-cocoa-5 rounded-[24px] p-5 flex flex-col gap-4 border border-white shadow-sm hover:shadow-md transition-all group cursor-pointer">
                    <div className="h-9 w-9 rounded-[10px] bg-white flex items-center justify-center shadow-sm"><BuyerDashboardIcon className="h-4 w-4 fill-cocoa-40" /></div>
                    <div>
                        <span className="text-cocoa text-[24px] font-medium">{pendingCount}</span>
                        <div className="text-cocoa-40 text-[12px]">En cours</div>
                    </div>
                    <div className="pt-3 border-t border-cocoa-10 flex justify-between">
                        <span className="text-[11px] text-cocoa-40">Voir</span>
                        <ArrowRightIcon className="h-3.5 w-3.5 text-cocoa-40" />
                    </div>
                </div>

                <div className="bg-cocoa-5 rounded-[24px] p-5 flex flex-col gap-4 border border-white shadow-sm hover:shadow-md transition-all group cursor-pointer">
                    <div className="h-9 w-9 rounded-[10px] bg-white flex items-center justify-center shadow-sm"><BuyerMarketIcon className="h-4 w-4 fill-cocoa-40" /></div>
                    <div>
                        <span className="text-cocoa text-[24px] font-medium">{availableLots}</span>
                        <div className="text-cocoa-40 text-[12px]">Lots disponibles</div>
                    </div>
                    <div className="pt-3 border-t border-cocoa-10 flex justify-between">
                        <span className="text-[11px] text-cocoa-40">Explorer</span>
                        <ArrowRightIcon className="h-3.5 w-3.5 text-cocoa-40" />
                    </div>
                </div>

                <div className="bg-cocoa-5 rounded-[24px] p-5 flex flex-col gap-4 border border-white shadow-sm hover:shadow-md transition-all group cursor-pointer">
                    <div className="h-9 w-9 rounded-[10px] bg-white flex items-center justify-center shadow-sm"><BuyerBlockchainIcon className="h-4 w-4 fill-cocoa-40" /></div>
                    <div>
                        <span className="text-cocoa text-[24px] font-medium">0</span>
                        <div className="text-cocoa-40 text-[12px]">Blockchain</div>
                    </div>
                    <div className="pt-3 border-t border-cocoa-10 flex justify-between">
                        <span className="text-[11px] text-cocoa-40">Vérifier</span>
                        <ArrowRightIcon className="h-3.5 w-3.5 text-cocoa-40" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyersDashboard;
