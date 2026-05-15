import React from "react";
import { StorePendingIcon, StoreMembersIcon, StoreValidationIcon } from "../stores/stores-icons";
import { Link } from "react-router-dom";
import { FilterIcon, SearchIcon } from "../../../shared/components/icons";

import { useValidationsStore } from "../stores/validations.store";
import { useMembersStore } from "../stores/members.store";

const PendingRequests: React.FC = () => {
    const { pendingParcels, pendingBatches, fetchPendingParcels, fetchPendingBatches } = useValidationsStore();
    const { members, fetchMembers } = useMembersStore();

    React.useEffect(() => {
        fetchPendingParcels();
        fetchPendingBatches();
        fetchMembers();
    }, [fetchPendingParcels, fetchPendingBatches, fetchMembers]);

    const pendingMembers = members.filter(m => m.user?.kyc_status === 'pending').length;

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Demandes en attente</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Toutes les demandes en attente de validation</p>
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

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-4 overflow-y-auto">
                <div className="grid grid-cols-3 gap-4">
                    <Link to="/stores/parcels/validation" className="bg-white rounded-[16px] p-6 flex flex-col gap-4 hover:shadow-md transition-shadow border border-white">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-[12px] bg-[#FFF3E0] flex items-center justify-center">
                                <StoreValidationIcon className="h-5 w-5 text-[#FF9800]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[14px] text-cocoa font-medium">Parcelles</span>
                                <span className="text-[11px] text-cocoa-40">En attente de validation</span>
                            </div>
                        </div>
                        <span className="text-[32px] text-cocoa font-medium">{pendingParcels.length}</span>
                        <div className="flex items-center gap-2 text-[12px] text-cocoa-40">
                            <span className="inline-block w-2 h-2 rounded-full bg-[#FF9800]"></span>
                            Demandes actives
                        </div>
                    </Link>

                    <Link to="/stores/batches/validation" className="bg-white rounded-[16px] p-6 flex flex-col gap-4 hover:shadow-md transition-shadow border border-white">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-[12px] bg-[#E3F2FD] flex items-center justify-center">
                                <StorePendingIcon className="h-5 w-5 text-[#2196F3]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[14px] text-cocoa font-medium">Lots</span>
                                <span className="text-[11px] text-cocoa-40">À vérifier</span>
                            </div>
                        </div>
                        <span className="text-[32px] text-cocoa font-medium">{pendingBatches.length}</span>
                        <div className="flex items-center gap-2 text-[12px] text-cocoa-40">
                            <span className="inline-block w-2 h-2 rounded-full bg-[#2196F3]"></span>
                            Lots à inspecter
                        </div>
                    </Link>

                    <Link to="/stores/members" className="bg-white rounded-[16px] p-6 flex flex-col gap-4 hover:shadow-md transition-shadow border border-white">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-[12px] bg-[#F1F8E9] flex items-center justify-center">
                                <StoreMembersIcon className="h-5 w-5 text-[#8BC34A]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[14px] text-cocoa font-medium">KYC membres</span>
                                <span className="text-[11px] text-cocoa-40">En attente de vérification</span>
                            </div>
                        </div>
                        <span className="text-[32px] text-cocoa font-medium">{pendingMembers}</span>
                        <div className="flex items-center gap-2 text-[12px] text-cocoa-40">
                            <span className="inline-block w-2 h-2 rounded-full bg-[#8BC34A]"></span>
                            Profils à valider
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PendingRequests;
