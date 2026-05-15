import React from "react";
import { BuyerBlockchainIcon } from "../components/buyer-icons";
import { FilterIcon, SearchIcon, OpenInNewmeIcon } from "../../../shared/components/icons";

interface Proof {
    id: string; entity: string; type: string; hash: string; txHash: string; chain: string; block: number; date: string;
}

const BlockchainProof: React.FC = () => {
    const proofs: Proof[] = [
        { id: "1", entity: "TRC-2026-0001", type: "batch", hash: "a3f2b8c1...", txHash: "0x7d4e3f...", chain: "Polygon Amoy", block: 4523187, date: "25-03-2026" },
        { id: "2", entity: "TRC-2026-0001", type: "transaction", hash: "b8e7d2f3...", txHash: "0x9a2b1c...", chain: "Polygon Amoy", block: 4523190, date: "25-03-2026" },
        { id: "3", entity: "TRC-2026-0002", type: "batch", hash: "c5f1a9d4...", txHash: "0x3e8f7a...", chain: "Polygon Amoy", block: 4518902, date: "20-03-2026" },
    ];

    const typeStyles: Record<string, { bg: string; text: string; border: string }> = {
        batch: { bg: "bg-[#E3F2FD]", text: "text-[#2196F3]", border: "border-[#BBDEFB]" },
        transaction: { bg: "bg-[#FFF3E0]", text: "text-[#FF9800]", border: "border-[#FFE0B2]" },
        validation: { bg: "bg-[#E8F5E9]", text: "text-[#4CAF50]", border: "border-[#C8E6C9]" },
        transformation: { bg: "bg-[#F3E5F5]", text: "text-[#9C27B0]", border: "border-[#E1BEE7]" },
        transport: { bg: "bg-[#F1F8E9]", text: "text-[#689F38]", border: "border-[#DCEDC8]" },
    };

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Preuves Blockchain</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Ancrages blockchain de vos transactions et lots</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer">
                        <SearchIcon className="h-[18px] w-[18px] fill-cocoa-80 rotate-y-180" />
                    </div>
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer">
                        <FilterIcon className="h-[18px] w-[18px] fill-white" />
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-4 overflow-hidden flex flex-col">
                <div className="w-full bg-[#E5E1DE] rounded-t-[12px] flex items-center h-[44px] px-6">
                    <div className="w-[16%] text-[11px] font-medium text-cocoa-60">Entité</div>
                    <div className="w-[12%] text-[11px] font-medium text-cocoa-60">Type</div>
                    <div className="w-[22%] text-[11px] font-medium text-cocoa-60">Hash SHA-256</div>
                    <div className="w-[22%] text-[11px] font-medium text-cocoa-60">Tx Hash</div>
                    <div className="w-[16%] text-[11px] font-medium text-cocoa-60">Bloc</div>
                    <div className="w-[12%] text-[11px] font-medium text-cocoa-60">Date</div>
                </div>
                <div className="flex-1 overflow-y-auto flex flex-col gap-1 mt-1.5">
                    {proofs.map((p) => {
                        const ts = typeStyles[p.type] || typeStyles.batch;
                        return (
                            <div key={p.id} className="h-[52px] bg-white/40 rounded-[8px] flex items-center px-6 hover:bg-white/60 transition-colors border border-white/20">
                                <div className="w-[16%] text-[12px] text-cocoa font-mono">{p.entity}</div>
                                <div className="w-[12%]">
                                    <div className={`inline-flex items-center px-2 py-0.5 rounded-full ${ts.bg} border ${ts.border} text-[10px] font-medium ${ts.text}`}>
                                        {p.type}
                                    </div>
                                </div>
                                <div className="w-[22%] text-[11px] text-cocoa-40 font-mono">{p.hash}</div>
                                <div className="w-[22%] text-[11px] text-cocoa-40 font-mono flex items-center gap-1">
                                    {p.txHash}
                                    <a href="#" className="text-cocoa hover:underline" target="_blank" rel="noopener noreferrer">
                                        <OpenInNewmeIcon className="h-3 w-3" />
                                    </a>
                                </div>
                                <div className="w-[16%] text-[11px] text-cocoa-40">{p.block}</div>
                                <div className="w-[12%] text-[11px] text-cocoa-40">{p.date}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default BlockchainProof;
