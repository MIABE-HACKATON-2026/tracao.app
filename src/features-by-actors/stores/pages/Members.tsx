import React from "react";
import { StoreMembersIcon } from "../stores/stores-icons";
import { AddIcon, ArrowDownIcon, FilterIcon, SearchIcon, OptionIcon } from "../../../shared/components/icons";
import Modal from "../../../shared/components/atoms/Modal";
import { useMembersStore } from "../stores/members.store";
import type { StoreMember } from "../types/store-member";

import FilterPopover from "../../../shared/components/molecules/FilterPopover";

const Members: React.FC = () => {
    const { members, isLoading, error, fetchMembers, addMember, suspendMember } = useMembersStore();
    const [isInviteModalOpen, setIsInviteModalOpen] = React.useState(false);
    const [selectedMember, setSelectedMember] = React.useState<StoreMember | null>(null);
    const [inviteEmail, setInviteEmail] = React.useState("");
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isFilterOpen, setIsFilterOpen] = React.useState(false);
    const [activeFilters, setActiveFilters] = React.useState<Record<string, string>>({
        kyc_status: 'all'
    });

    React.useEffect(() => { fetchMembers(); }, [fetchMembers]);

    const handleInvite = async () => {
        if (!inviteEmail.trim()) return;
        try {
            await addMember({ email: inviteEmail } as any);
            setIsInviteModalOpen(false);
            setInviteEmail("");
        } catch {}
    };

    const handleFilterChange = (key: string, value: string) => {
        setActiveFilters(prev => ({ ...prev, [key]: value }));
    };

    const filteredMembers = (members || []).filter(m => {
        const matchesSearch = 
            m.user?.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.user?.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.user?.phone?.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesKyc = activeFilters.kyc_status === 'all' || m.user?.kyc_status === activeFilters.kyc_status;
        
        return matchesSearch && matchesKyc;
    });

    const kycLabel: Record<string, string> = { approved: "Validé", pending: "En attente", rejected: "Rejeté" };
    const kycStyles: Record<string, string> = {
        approved: "bg-[#E8F5E9] text-[#4CAF50] border-[#C8E6C9]",
        pending: "bg-cocoa-10 text-cocoa-60 border-cocoa-10",
        rejected: "bg-[#FFEBEE] text-[#F44336] border-[#FFCDD2]",
    };

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Gestion des membres</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Gérez les membres de votre coopérative</p>
                </div>
                <div className="flex gap-2 items-center relative">
                    <div className={`h-[34px] flex items-center bg-cocoa-5 rounded-[8px] transition-all duration-300 overflow-hidden ${isSearchOpen ? 'w-[200px] px-3' : 'w-[34px] justify-center cursor-pointer hover:bg-cocoa-10'}`} onClick={() => !isSearchOpen && setIsSearchOpen(true)}>
                        <SearchIcon className="h-[18px] w-[18px] fill-cocoa-80 shrink-0 rotate-y-180" />
                        {isSearchOpen && (
                            <input 
                                autoFocus
                                type="text" 
                                placeholder="Rechercher..." 
                                className="bg-transparent border-none outline-none text-[12px] text-cocoa ml-2 w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onBlur={() => !searchQuery && setIsSearchOpen(false)}
                            />
                        )}
                    </div>
                    <div className="h-[34px] bg-cocoa-5 rounded-[8px] flex items-center overflow-hidden cursor-pointer hover:bg-cocoa-10 transition-colors" onClick={() => setIsInviteModalOpen(true)}>
                        <div className="flex items-center px-4 gap-2 h-full">
                            <AddIcon className="h-[18px] w-[18px] fill-cocoa-80" />
                            <span className="text-[12px] text-cocoa-80">Inviter</span>
                        </div>
                        <div className="h-[34px] w-[34px] border-l border-l-[0.4px] border-l-cocoa-20 flex items-center justify-center">
                            <ArrowDownIcon className="h-[18px] w-[18px] fill-cocoa-80" />
                        </div>
                    </div>
                    <div 
                        className={`h-[34px] w-[34px] rounded-[8px] flex items-center justify-center cursor-pointer transition-colors ${isFilterOpen ? 'bg-cocoa' : 'bg-cocoa-5 hover:bg-cocoa-10'}`}
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                        <FilterIcon className={`h-[18px] w-[18px] ${isFilterOpen ? 'text-white' : 'text-cocoa-80'}`} />
                    </div>

                    <FilterPopover 
                        isOpen={isFilterOpen}
                        onClose={() => setIsFilterOpen(false)}
                        filters={[
                            {
                                label: "Statut KYC",
                                key: "kyc_status",
                                options: [
                                    { label: "Tous", value: "all" },
                                    { label: "Validé", value: "approved" },
                                    { label: "En attente", value: "pending" },
                                    { label: "Rejeté", value: "rejected" },
                                ]
                            }
                        ]}
                        activeFilters={activeFilters}
                        onFilterChange={handleFilterChange}
                    />
                </div>
            </div>

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-4 overflow-y-auto flex flex-col gap-3">
                {isLoading ? (
                    <div className="flex items-center justify-center h-40 text-cocoa-40 text-[12px]">Chargement...</div>
                ) : error ? (
                    <div className="flex items-center justify-center h-40 text-red-500 text-[12px]">{error}</div>
                ) : filteredMembers.length === 0 ? (
                    <div className="flex items-center justify-center h-40 text-cocoa-40 text-[12px]">Aucun membre trouvé</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredMembers.map((m) => (
                            <div key={m.id} className="bg-white rounded-[16px] p-6 flex flex-col gap-5 hover:shadow-md transition-shadow border border-white relative group">
                                <div className="absolute top-4 right-4 cursor-pointer p-1" onClick={() => setSelectedMember(m)}>
                                    <OptionIcon className="h-4 w-4 text-cocoa-20 group-hover:text-cocoa transition-colors" />
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-[12px] bg-[#E8F5E9] flex items-center justify-center relative">
                                        <div className={`absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${m.status === 'active' ? 'bg-[#4CAF50]' : 'bg-cocoa-20'}`}></div>
                                        <StoreMembersIcon className="h-5 w-5 text-[#4CAF50]" />
                                    </div>
                                    <div className="flex flex-col pr-6">
                                        <span className="text-[14px] text-cocoa font-medium line-clamp-1">{m.user?.first_name} {m.user?.last_name}</span>
                                        <span className="text-[11px] text-cocoa-40">{m.user?.phone || "—"}</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between mt-2 pt-4 border-t border-cocoa-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] text-cocoa-40">Statut KYC</span>
                                        {m.user?.kyc_status ? (
                                            <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${kycStyles[m.user.kyc_status] || kycStyles.pending}`}>
                                                {kycLabel[m.user.kyc_status] || m.user.kyc_status}
                                            </div>
                                        ) : (
                                            <span className="text-[11px] text-cocoa-40">—</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1 items-end">
                                        <span className="text-[10px] text-cocoa-40">Compte</span>
                                        <span className={`text-[11px] font-medium ${m.status === 'active' ? 'text-cocoa' : 'text-[#F44336]'}`}>
                                            {m.status === 'active' ? 'Actif' : 'Suspendu'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Modal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)}>
                <div className="p-8 flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[20px] font-medium text-cocoa">Inviter un membre</h2>
                        <p className="text-[13px] text-cocoa-40">Un email d'invitation sera envoyé au futur membre.</p>
                    </div>
                    <input value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} type="email" placeholder="Adresse email" className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none focus:ring-1 focus:ring-cocoa-20 placeholder:text-cocoa-40" />
                    <div className="flex justify-end gap-3 mt-4">
                        <button onClick={() => setIsInviteModalOpen(false)} className="h-[48px] px-8 rounded-full bg-cocoa-5 text-cocoa text-[14px] font-medium hover:bg-cocoa-10 transition-colors cursor-pointer">Annuler</button>
                        <button onClick={handleInvite} disabled={!inviteEmail.includes('@')} className="h-[48px] px-8 rounded-full bg-black text-white text-[14px] font-medium hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50">Inviter</button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={!!selectedMember} onClose={() => setSelectedMember(null)}>
                <div className="p-8 flex flex-col gap-6 max-w-[400px] w-full">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[20px] font-medium text-cocoa">Détails du membre</h2>
                        <p className="text-[13px] text-cocoa-40">Informations complètes du membre.</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        {[
                            { label: "Nom complet", value: `${selectedMember?.user?.first_name || ""} ${selectedMember?.user?.last_name || ""}` },
                            { label: "Email", value: selectedMember?.user?.email || "—" },
                            { label: "Téléphone", value: selectedMember?.user?.phone || "—" },
                            { label: "Statut KYC", value: selectedMember?.user?.kyc_status ? kycLabel[selectedMember.user.kyc_status] : "—" },
                            { label: "Statut compte", value: selectedMember?.status === 'active' ? 'Actif' : 'Suspendu' },
                            { label: "Inscrit le", value: selectedMember?.created_at ? new Date(selectedMember.created_at).toLocaleDateString("fr-FR") : "—" },
                        ].map((f, i) => (
                            <div key={i} className="bg-cocoa-5/50 rounded-[12px] px-4 py-3 flex flex-col gap-0.5">
                                <span className="text-[11px] text-cocoa-40">{f.label}</span>
                                <span className="text-[13px] text-cocoa font-medium">{f.value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        {selectedMember?.status === 'active' ? (
                            <button onClick={() => { suspendMember(selectedMember.id); setSelectedMember(null); }} className="h-[44px] w-full rounded-full bg-red-50 text-red-500 text-[13px] font-medium hover:bg-red-100 transition-colors cursor-pointer">Suspendre le compte</button>
                        ) : (
                            <button onClick={() => setSelectedMember(null)} className="h-[44px] w-full rounded-full bg-cocoa text-white text-[13px] font-medium hover:opacity-90 transition-opacity cursor-pointer">Activer le compte</button>
                        )}
                        <button onClick={() => setSelectedMember(null)} className="h-[44px] w-full rounded-full border border-cocoa-10 text-cocoa-60 text-[13px] font-medium hover:bg-cocoa-5 transition-colors cursor-pointer">Fermer</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Members;
