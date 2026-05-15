import React from "react";
import { StoreAgentsIcon } from "../stores/stores-icons";
import { AddIcon, ArrowDownIcon, FilterIcon, SearchIcon, OptionIcon } from "../../../shared/components/icons";
import Modal from "../../../shared/components/atoms/Modal";
import { useAgentsStore } from "../stores/agents.store";
import type { StoreAgent } from "../types/store-agent";

const Agents: React.FC = () => {
    const { agents, isLoading, error, fetchAgents, addAgent } = useAgentsStore();
    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
    const [selectedAgent, setSelectedAgent] = React.useState<StoreAgent | null>(null);
    const [agentEmail, setAgentEmail] = React.useState("");
    const [agentRole, setAgentRole] = React.useState<'inspecteur' | 'agent_terrain'>('agent_terrain');

    React.useEffect(() => { fetchAgents(); }, [fetchAgents]);

    const handleCreate = async () => {
        if (!agentEmail.trim()) return;
        try {
            await addAgent({ email: agentEmail, role: agentRole } as any);
            setIsCreateModalOpen(false);
            setAgentEmail("");
        } catch {}
    };

    const roleStyles: Record<string, string> = {
        inspecteur: "bg-[#E3F2FD] text-[#2196F3] border-[#BBDEFB]",
        agent_terrain: "bg-[#F1F8E9] text-[#8BC34A] border-[#DCEDC8]",
    };
    const roleLabels: Record<string, string> = { inspecteur: "Inspecteur", agent_terrain: "Agent terrain" };

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Gestion des agents</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Gérez vos inspecteurs et agents terrain</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer hover:bg-cocoa-10"><SearchIcon className="h-[18px] w-[18px] fill-cocoa-80 rotate-y-180" /></div>
                    <div className="h-[34px] bg-cocoa-5 rounded-[8px] flex items-center overflow-hidden cursor-pointer hover:bg-cocoa-10" onClick={() => setIsCreateModalOpen(true)}>
                        <div className="flex items-center px-4 gap-2 h-full"><AddIcon className="h-[18px] w-[18px] fill-cocoa-80" /><span className="text-[12px] text-cocoa-80">Créer un agent</span></div>
                        <div className="h-[34px] w-[34px] border-l border-l-[0.4px] border-l-cocoa-20 flex items-center justify-center"><ArrowDownIcon className="h-[18px] w-[18px] fill-cocoa-80" /></div>
                    </div>
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer hover:opacity-90"><FilterIcon className="h-[18px] w-[18px] fill-white" /></div>
                </div>
            </div>

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-4 overflow-y-auto flex flex-col gap-3">
                {isLoading ? (
                    <div className="flex items-center justify-center h-40 text-cocoa-40 text-[12px]">Chargement...</div>
                ) : error ? (
                    <div className="flex items-center justify-center h-40 text-red-500 text-[12px]">{error}</div>
                ) : agents.length === 0 ? (
                    <div className="flex items-center justify-center h-40 text-cocoa-40 text-[12px]">Aucun agent</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {agents.map((a) => (
                            <div key={a.id} className="bg-white rounded-[16px] p-6 flex flex-col gap-5 hover:shadow-md transition-shadow border border-white relative group">
                                <div className="absolute top-4 right-4 cursor-pointer p-1" onClick={() => setSelectedAgent(a)}>
                                    <OptionIcon className="h-4 w-4 text-cocoa-20 group-hover:text-cocoa transition-colors" />
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-[12px] bg-cocoa-5 flex items-center justify-center relative">
                                        <div className={`absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${a.status === 'active' ? 'bg-[#4CAF50]' : 'bg-cocoa-20'}`}></div>
                                        <StoreAgentsIcon className="h-5 w-5 text-cocoa-40" />
                                    </div>
                                    <div className="flex flex-col pr-6">
                                        <span className="text-[14px] text-cocoa font-medium line-clamp-1">{a.user?.first_name} {a.user?.last_name}</span>
                                        <span className="text-[11px] text-cocoa-40">{a.user?.phone || "—"}</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between mt-2 pt-4 border-t border-cocoa-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] text-cocoa-40">Rôle</span>
                                        <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${roleStyles[a.role] || ''}`}>
                                            {roleLabels[a.role] || a.role}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1 items-end">
                                        <span className="text-[10px] text-cocoa-40">Compte</span>
                                        <span className={`text-[11px] font-medium ${a.status === 'active' ? 'text-cocoa' : 'text-[#F44336]'}`}>
                                            {a.status === 'active' ? 'Actif' : 'Suspendu'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
                <div className="p-8 flex flex-col gap-6 max-w-[400px] w-full">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[20px] font-medium text-cocoa">Créer un agent</h2>
                        <p className="text-[13px] text-cocoa-40">L'agent recevra ses accès par email.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-[12px] text-cocoa-40 font-medium">Email de l'agent</label>
                            <input value={agentEmail} onChange={e => setAgentEmail(e.target.value)} type="email" placeholder="exemple@domaine.com" className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none focus:ring-1 focus:ring-cocoa-20 placeholder:text-cocoa-40" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[12px] text-cocoa-40 font-medium">Rôle</label>
                            <div className="grid grid-cols-2 gap-2">
                                {['agent_terrain', 'inspecteur'].map((r) => (
                                    <div key={r} onClick={() => setAgentRole(r as any)} className={`h-[40px] rounded-[10px] flex items-center justify-center text-[12px] cursor-pointer transition-colors border ${agentRole === r ? 'bg-cocoa text-white border-cocoa' : 'bg-white text-cocoa-40 border-cocoa-10 hover:bg-cocoa-5'}`}>
                                        {roleLabels[r] || r}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        <button onClick={handleCreate} disabled={!agentEmail.includes('@')} className="h-[48px] w-full rounded-full bg-black text-white text-[14px] font-medium hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50">Créer l'agent</button>
                        <button onClick={() => setIsCreateModalOpen(false)} className="h-[48px] w-full rounded-full bg-cocoa-5 text-cocoa text-[14px] font-medium hover:bg-cocoa-10 cursor-pointer">Annuler</button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={!!selectedAgent} onClose={() => setSelectedAgent(null)}>
                <div className="p-8 flex flex-col gap-6 max-w-[400px] w-full">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[20px] font-medium text-cocoa">Détails de l'agent</h2>
                        <p className="text-[13px] text-cocoa-40">Informations complètes de l'agent.</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        {[
                            { label: "Nom complet", value: `${selectedAgent?.user?.first_name || ""} ${selectedAgent?.user?.last_name || ""}` },
                            { label: "Email", value: selectedAgent?.user?.email || "—" },
                            { label: "Téléphone", value: selectedAgent?.user?.phone || "—" },
                            { label: "Rôle", value: selectedAgent?.role ? roleLabels[selectedAgent.role] : "—" },
                            { label: "Statut compte", value: selectedAgent?.status === 'active' ? 'Actif' : 'Suspendu' },
                            { label: "Créé le", value: selectedAgent?.created_at ? new Date(selectedAgent.created_at).toLocaleDateString("fr-FR") : "—" },
                        ].map((f, i) => (
                            <div key={i} className="bg-cocoa-5/50 rounded-[12px] px-4 py-3 flex flex-col gap-0.5">
                                <span className="text-[11px] text-cocoa-40">{f.label}</span>
                                <span className="text-[13px] text-cocoa font-medium">{f.value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        <button onClick={() => setSelectedAgent(null)} className="h-[44px] w-full rounded-full bg-cocoa text-white text-[13px] font-medium hover:opacity-90 transition-opacity cursor-pointer">Fermer</button>
                        <button className="h-[44px] w-full rounded-full border border-red-100 text-red-500 text-[13px] font-medium hover:bg-red-50 transition-colors cursor-pointer">Réinitialiser le mot de passe</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Agents;
