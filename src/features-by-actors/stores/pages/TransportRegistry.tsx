import React from "react";
import { StoreTransportIcon } from "../stores/stores-icons";
import { AddIcon, ArrowDownIcon, FilterIcon, SearchIcon } from "../../../shared/components/icons";
import Modal from "../../../shared/components/atoms/Modal";

import transportersService, { type Transporter } from "../services/transporters.service";

const TransportRegistry: React.FC = () => {
    const [isInviteOpen, setIsInviteOpen] = React.useState(false);
    const [entries, setEntries] = React.useState<Transporter[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [inviteData, setInviteData] = React.useState({ email: "", phone: "" });

    const fetchTransporters = React.useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await transportersService.getTransporters();
            setEntries(data);
        } finally {
            setIsLoading(false);
        }
    }, []);

    React.useEffect(() => {
        fetchTransporters();
    }, [fetchTransporters]);

    const handleInvite = async () => {
        if (!inviteData.email) return;
        try {
            await transportersService.inviteTransporter({
                email: inviteData.email,
                phone: inviteData.phone || undefined,
                role: 'transporter'
            });
            setIsInviteOpen(false);
            setInviteData({ email: "", phone: "" });
            fetchTransporters();
        } catch (err) {}
    };

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Registre des transporteurs</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Invitez et gérez les transporteurs</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer"><SearchIcon className="h-[18px] w-[18px] fill-cocoa-80 rotate-y-180" /></div>
                    <div className="h-[34px] bg-cocoa-5 rounded-[8px] flex items-center overflow-hidden cursor-pointer hover:bg-cocoa-10" onClick={() => setIsInviteOpen(true)}>
                        <div className="flex items-center px-4 gap-2 h-full"><AddIcon className="h-[18px] w-[18px] fill-cocoa-80" /><span className="text-[12px] text-cocoa-80">Inviter</span></div>
                        <div className="h-[34px] w-[34px] border-l border-l-cocoa-20 flex items-center justify-center"><ArrowDownIcon className="h-[18px] w-[18px] fill-cocoa-80" /></div>
                    </div>
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer"><FilterIcon className="h-[18px] w-[18px] fill-white" /></div>
                </div>
            </div>

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-4 overflow-hidden flex flex-col">
                <div className="w-full bg-[#E5E1DE] rounded-t-[12px] flex items-center h-[44px] px-6">
                    <div className="flex-1 text-[11px] font-medium text-cocoa-60">Téléphone</div>
                    <div className="flex-1 text-[11px] font-medium text-cocoa-60">Nom</div>
                    <div className="flex-1 text-[11px] font-medium text-cocoa-60">Statut</div>
                    <div className="flex-1 text-[11px] font-medium text-cocoa-60">Date</div>
                </div>
                <div className="flex-1 overflow-y-auto flex flex-col gap-1 mt-1.5">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-40 text-cocoa-40 text-[12px]">Chargement...</div>
                    ) : entries.length === 0 ? (
                        <div className="flex items-center justify-center h-40 text-cocoa-40 text-[12px]">Aucun transporteur enregistré</div>
                    ) : (
                        entries.map((e) => (
                            <div key={e.id} className="h-[52px] bg-white/40 rounded-[8px] flex items-center px-6 hover:bg-white/60 border border-white/20">
                                <div className="flex-1 text-[12px] text-cocoa font-mono">{e.phone}</div>
                                <div className="flex-1 text-[12px] text-cocoa-40">{e.user_details ? `${e.user_details.first_name} ${e.user_details.last_name}` : "—"}</div>
                                <div className="flex-1">
                                    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[6px] text-[10px] font-medium ${e.status === 'active' ? 'bg-[#E8F5E9] text-[#4CAF50] border border-[#C8E6C9]' : 'bg-cocoa-10 text-cocoa-60 border border-cocoa-10'}`}>
                                        {e.status === 'active' ? 'Actif' : 'Invité'}
                                    </div>
                                </div>
                                <div className="flex-1 text-[12px] text-cocoa-40">{new Date(e.created_at).toLocaleDateString("fr-FR")}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <Modal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)}>
                <div className="p-8 flex flex-col gap-6 w-full max-w-[400px]">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[20px] font-medium text-cocoa">Inviter un transporteur</h2>
                        <p className="text-[13px] text-cocoa-40">Un email d'invitation sera envoyé pour configurer son compte.</p>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] text-cocoa-40 ml-1">Adresse email</label>
                            <input 
                                value={inviteData.email}
                                onChange={e => setInviteData({...inviteData, email: e.target.value})}
                                type="email" 
                                placeholder="email@exemple.com" 
                                className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none focus:ring-1 focus:ring-cocoa-20 placeholder:text-cocoa-40" 
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] text-cocoa-40 ml-1">Numéro de téléphone (optionnel)</label>
                            <input 
                                value={inviteData.phone}
                                onChange={e => setInviteData({...inviteData, phone: e.target.value})}
                                type="tel" 
                                placeholder="+225..." 
                                className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none focus:ring-1 focus:ring-cocoa-20 placeholder:text-cocoa-40" 
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-2">
                        <button onClick={() => setIsInviteOpen(false)} className="h-[48px] flex-1 rounded-full bg-cocoa-5 text-cocoa text-[14px] font-medium hover:bg-cocoa-10 cursor-pointer">Annuler</button>
                        <button onClick={handleInvite} disabled={!inviteData.email} className="h-[48px] flex-1 rounded-full bg-black text-white text-[14px] font-medium hover:opacity-90 cursor-pointer disabled:opacity-50">Inviter</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default TransportRegistry;
