import React from "react";
import { AdminDashboardIcon, AdminUsersIcon, AdminCoopIcon, AdminFraudIcon, AdminBlockchainIcon, AdminKycIcon, AdminLogsIcon } from "../components/admin-icons";
import { ArrowRightIcon } from "../../../shared/components/icons";
import { Link } from "react-router-dom";
import { useAdminStore } from "../stores/admin.store"; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { cn } from "../../../shared/lib/utils";

const COLORS = ['#D3A27F', '#8B5E3C', '#5C3D2E', '#3D2B1F', '#2196F3', '#4CAF50', '#FF9800'];

const AdminDashboard: React.FC = () => {
    const { stats, cooperatives, fraudAlerts, blockchain, logs, fetchAll } = useAdminStore();

    React.useEffect(() => { fetchAll(); }, [fetchAll]);

    return (
        <div className="w-full h-full flex flex-col gap-5 animate-in fade-in duration-500">
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Dashboard Admin</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Vue globale de l'écosystème</p>
                </div>
            </div>

            <div className="grid grid-cols-5 gap-4">
                {[
                    { icon: AdminUsersIcon, title: "Utilisateurs", value: stats?.users ? stats.users.reduce((acc: number, u: any) => acc + u.count, 0) : "0", color: "text-white", bg: "bg-cocoa", iconBg: "bg-white/20", detail: "Comptes globaux" },
                    { icon: AdminCoopIcon, title: "Magasins", value: cooperatives.length || "0", color: "text-cocoa", bg: "bg-white/40", iconBg: "bg-cocoa-5", detail: "Coopératives" },
                    { icon: AdminDashboardIcon, title: "Lots Production", value: stats?.batches ? stats.batches.reduce((acc: number, b: any) => acc + b.count, 0) : "0", color: "text-cocoa", bg: "bg-white/40", iconBg: "bg-cocoa-5", detail: "Traçabilité" },
                    { icon: AdminBlockchainIcon, title: "Ancrages", value: stats?.blockchain ? stats.blockchain.reduce((acc: number, b: any) => acc + b.count, 0) : "0", color: "text-cocoa", bg: "bg-white/40", iconBg: "bg-[#E3F2FD]", iconColor: "text-[#2196F3]", detail: "Blockchain" },
                    { icon: AdminFraudIcon, title: "Alertes", value: `${fraudAlerts.length}`, color: "text-cocoa", bg: "bg-white/40", iconBg: "bg-[#FFEBEE]", iconColor: "text-[#F44336]", detail: "Risques" },
                ].map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <div key={i} className={cn("rounded-[16px] p-5 flex flex-col gap-4 border border-white/20 shadow-sm", card.bg)}>
                            <div className="flex items-center gap-3">
                                <div className={cn("h-10 w-10 rounded-full flex items-center justify-center", card.iconBg)}>
                                    <Icon className={cn("h-5 w-5", card.iconColor || card.color)} />
                                </div>
                            </div>
                            <div className="flex flex-col mt-1">
                                <span className={cn("text-[12px] font-medium", card.color)}>{card.title}</span>
                                <span className={cn("text-[11px] font-medium leading-none mt-2", card.color)}>{card.detail}</span>
                            </div>
                            <span className={cn("text-[28px] font-medium mt-auto leading-none", card.color)}>{card.value}</span>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/40 rounded-[16px] p-6 border border-white/20 flex flex-col gap-4 h-[300px] shadow-sm">
                            <h2 className="text-[13px] text-cocoa font-medium">Répartition Utilisateurs</h2>
                            <div className="flex-1 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stats?.users ? stats.users.map((u: any) => ({ name: u.role || 'Inconnu', value: u.count })) : []}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E1DE" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8B5E3C', fontSize: 10 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8B5E3C', fontSize: 10 }} />
                                        <RechartsTooltip cursor={{ fill: 'rgba(255,255,255,0.2)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '11px' }} />
                                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                            {(stats?.users || []).map((entry: any, index: number) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white/40 rounded-[16px] p-6 border border-white/20 flex flex-col gap-4 h-[300px] shadow-sm">
                            <h2 className="text-[13px] text-cocoa font-medium">Statut des Lots</h2>
                            <div className="flex-1 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie 
                                            data={stats?.batches ? stats.batches.map((b: any) => ({ name: b.status || 'Inconnu', value: b.count })) : []} 
                                            dataKey="value" 
                                            nameKey="name" 
                                            cx="50%" 
                                            cy="50%" 
                                            innerRadius={50} 
                                            outerRadius={70} 
                                            paddingAngle={5}
                                        >
                                            {(stats?.batches || []).map((entry: any, index: number) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[(index + 3) % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '11px' }} />
                                        <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className="text-[13px] text-cocoa font-medium">Accès rapides</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link to="/admin/kyc" className="bg-white/40 rounded-[16px] p-4 flex items-center justify-between hover:bg-white/60 transition-all border border-white/20 group">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-cocoa-5 flex items-center justify-center">
                                        <AdminKycIcon className="h-5 w-5 text-cocoa" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] text-cocoa font-medium">Validations KYC</span>
                                        <span className="text-[11px] text-cocoa-40">Vérifier les comptes</span>
                                    </div>
                                </div>
                                <div className="h-7 w-7 rounded-full bg-cocoa-5 flex items-center justify-center group-hover:bg-cocoa group-hover:text-white transition-all">
                                    <ArrowRightIcon className="h-4 w-4" />
                                </div>
                            </Link>
                            
                            <Link to="/admin/stores" className="bg-white/40 rounded-[16px] p-4 flex items-center justify-between hover:bg-white/60 transition-all border border-white/20 group">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-cocoa-5 flex items-center justify-center">
                                        <AdminCoopIcon className="h-5 w-5 text-cocoa" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] text-cocoa font-medium">Magasins</span>
                                        <span className="text-[11px] text-cocoa-40">Gestion des coopératives</span>
                                    </div>
                                </div>
                                <div className="h-7 w-7 rounded-full bg-cocoa-5 flex items-center justify-center group-hover:bg-cocoa group-hover:text-white transition-all">
                                    <ArrowRightIcon className="h-4 w-4" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-[13px] text-cocoa font-medium">Événements récents</h2>
                    <div className="flex-1 bg-white/40 rounded-[16px] p-4 flex flex-col gap-4 border border-white/20 overflow-y-auto max-h-[500px]">
                        {logs.slice(0, 10).map((log: any, i: number) => (
                            <div key={log.id || i} className="flex flex-col gap-2 p-3 bg-white/40 rounded-[12px] border border-white/10 hover:border-cocoa-10 transition-all group">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-cocoa-5 flex items-center justify-center shrink-0">
                                        <AdminLogsIcon className="h-4 w-4 text-cocoa-40" />
                                    </div>
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="text-[12px] text-cocoa font-medium capitalize truncate">{log.action_type?.replace('_', ' ')}</span>
                                        <span className="text-[10px] text-cocoa-40 truncate">{log.performed_by?.first_name || "Système"}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                    <span className="text-[10px] text-cocoa-40">{new Date(log.created_at).toLocaleDateString()}</span>
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cocoa-5 text-cocoa-60 font-medium">Audit</span>
                                </div>
                            </div>
                        ))}
                        {logs.length === 0 && (
                            <div className="text-center py-10 text-cocoa-40 text-[11px]">Aucun log récent</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdminDashboard;
