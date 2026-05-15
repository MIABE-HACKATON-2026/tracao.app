import React from "react";
import { AdminDashboardIcon, AdminUsersIcon, AdminCoopIcon, AdminFraudIcon, AdminBlockchainIcon, AdminReportIcon, AdminKycIcon, AdminLogsIcon } from "../components/admin-icons";
import { ArrowRightIcon, EyeIcon } from "../../../shared/components/icons";
import { Link } from "react-router-dom";
import { useAdminStore } from "../stores/admin.store"; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';

const COLORS = ['#D3A27F', '#8B5E3C', '#5C3D2E', '#3D2B1F', '#2196F3', '#4CAF50', '#FF9800'];

const AdminDashboard: React.FC = () => {
    const { stats, cooperatives, fraudAlerts, blockchain, logs, fetchAll } = useAdminStore();

    React.useEffect(() => { fetchAll(); }, [fetchAll]);

    return (
        <div className="w-full h-full flex flex-col gap-6">
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1"><h1 className="text-[20px] font-medium text-cocoa">Dashboard Admin</h1><p className="text-[14px] text-cocoa-60">Vue globale de la plateforme</p></div>
            </div>
            <div className="grid grid-cols-5 gap-4">
                {[
                    { icon: AdminUsersIcon, title: "Utilisateurs", subtitle: "Actifs sur la plateforme", value: stats?.users ? stats.users.reduce((acc: number, u: any) => acc + u.count, 0) : "—", color: "text-white", bg: "bg-cocoa", iconBg: "bg-white/20", dotColor: "bg-white/40", detail: "Comptes globaux" },
                    { icon: AdminCoopIcon, title: "Coopératives", subtitle: "Enregistrées", value: cooperatives.length || "0", color: "text-cocoa", bg: "bg-white border border-cocoa-10", iconBg: "bg-cocoa-5", dotColor: "bg-cocoa-40", detail: "Magasins actifs" },
                    { icon: AdminDashboardIcon, title: "Lots", subtitle: "Total plateforme", value: stats?.batches ? stats.batches.reduce((acc: number, b: any) => acc + b.count, 0) : "—", color: "text-cocoa", bg: "bg-white border border-cocoa-10", iconBg: "bg-cocoa-5", dotColor: "bg-cocoa-40", detail: "Lots tracés" },
                    { icon: AdminBlockchainIcon, title: "Blockchain", subtitle: "Ancrages", value: stats?.blockchain ? stats.blockchain.reduce((acc: number, b: any) => acc + b.count, 0) : "—", color: "text-cocoa", bg: "bg-white border border-cocoa-10", iconBg: "bg-[#E3F2FD]", iconColor: "text-[#2196F3]", dotColor: "bg-[#2196F3]", detail: "Sécurisés" },
                    { icon: AdminFraudIcon, title: "Alertes", subtitle: "Fraudes ouvertes", value: `${fraudAlerts.length}`, color: "text-cocoa", bg: "bg-white border border-cocoa-10", iconBg: "bg-[#FFEBEE]", iconColor: "text-[#F44336]", dotColor: "bg-[#F44336]", detail: "Critique" },
                ].map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <div key={i} className={`rounded-[16px] p-5 flex flex-col gap-4 ${card.bg}`}>
                            <div className="flex items-center gap-3">
                                <div className={`h-10 w-10 rounded-[12px] flex items-center justify-center ${card.iconBg}`}>
                                    <Icon className={`h-5 w-5 ${card.iconColor || card.color}`} />
                                </div>
                            </div>
                            <div className="flex flex-col mt-2">
                                <span className={`text-[13px] font-medium ${card.color}`}>{card.title}</span>
                                <span className={`text-[11px] ${i === 0 ? 'text-white/60' : 'text-cocoa-40'}`}>{card.subtitle}</span>
                            </div>
                            <span className={`text-[32px] font-medium mt-auto ${card.color}`}>{card.value}</span>
                            <div className={`flex items-center gap-2 text-[12px] ${i === 0 ? 'text-white/60' : 'text-cocoa-40'}`}>
                                <span className={`inline-block w-2 h-2 rounded-full ${card.dotColor}`}></span>
                                {card.detail}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-[16px] p-6 border border-cocoa-10 flex flex-col gap-4 h-[300px]">
                            <div className="flex items-center justify-between">
                                <h2 className="text-[14px] text-cocoa font-medium">Répartition Utilisateurs</h2>
                                <span className="text-[11px] text-cocoa-40">Par rôle</span>
                            </div>
                            <div className="flex-1 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stats?.users ? stats.users.map((u: any) => ({ name: u.role || 'Inconnu', value: u.count })) : []}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8B5E3C', fontSize: 10 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8B5E3C', fontSize: 10 }} />
                                        <RechartsTooltip cursor={{ fill: '#F5F5F5' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }} />
                                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                            {(stats?.users || []).map((entry: any, index: number) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white rounded-[16px] p-6 border border-cocoa-10 flex flex-col gap-4 h-[300px]">
                            <div className="flex items-center justify-between">
                                <h2 className="text-[14px] text-cocoa font-medium">Statut des Lots</h2>
                                <span className="text-[11px] text-cocoa-40">Distribution globale</span>
                            </div>
                            <div className="flex-1 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie 
                                            data={stats?.batches ? stats.batches.map((b: any) => ({ name: b.status || 'Inconnu', value: b.count })) : []} 
                                            dataKey="value" 
                                            nameKey="name" 
                                            cx="50%" 
                                            cy="50%" 
                                            innerRadius={60} 
                                            outerRadius={80} 
                                            paddingAngle={5}
                                        >
                                            {(stats?.batches || []).map((entry: any, index: number) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[(index + 3) % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }} />
                                        <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', color: '#8B5E3C' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className="text-[15px] text-cocoa font-medium">Actions rapides</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link to="/admin/kyc" className="bg-white rounded-[16px] p-5 flex items-center justify-between hover:shadow-lg transition-all border border-cocoa-10 group">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-[12px] bg-cocoa-5 flex items-center justify-center group-hover:bg-[#E8F5E9] transition-colors">
                                        <AdminKycIcon className="h-6 w-6 text-cocoa group-hover:text-[#4CAF50] transition-colors" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[15px] text-cocoa font-medium">Validations KYC</span>
                                        <span className="text-[11px] text-cocoa-40">Comptes en attente</span>
                                    </div>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-cocoa-5 flex items-center justify-center group-hover:bg-cocoa group-hover:text-white transition-all">
                                    <ArrowRightIcon className="h-4 w-4" />
                                </div>
                            </Link>
                            
                            <Link to="/admin/cooperatives" className="bg-white rounded-[16px] p-5 flex items-center justify-between hover:shadow-lg transition-all border border-cocoa-10 group">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-[12px] bg-cocoa-5 flex items-center justify-center group-hover:bg-[#FFF3E0] transition-colors">
                                        <AdminCoopIcon className="h-6 w-6 text-cocoa group-hover:text-[#FF9800] transition-colors" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[15px] text-cocoa font-medium">Coopératives</span>
                                        <span className="text-[11px] text-cocoa-40">Gestion des magasins</span>
                                    </div>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-cocoa-5 flex items-center justify-center group-hover:bg-cocoa group-hover:text-white transition-all">
                                    <ArrowRightIcon className="h-4 w-4" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[15px] text-cocoa font-medium">Alertes Fraude Récentes</h2>
                        <Link to="/admin/fraud" className="text-[12px] text-cocoa-60 hover:text-cocoa underline">Voir tout</Link>
                    </div>
                    <div className="flex-1 bg-white rounded-[16px] p-5 flex flex-col gap-4 border border-cocoa-10 overflow-y-auto max-h-[420px] ">
                        {fraudAlerts.slice(0, 5).map((alert: any, i: number) => (
                            <div key={alert.id || i} className="flex flex-col gap-2 p-3 bg-[#FFEBEE]/30 rounded-[12px] border border-[#FFEBEE]">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-[10px] bg-[#FFEBEE] flex items-center justify-center shrink-0">
                                        <AdminFraudIcon className="h-5 w-5 text-[#F44336]" />
                                    </div>
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="text-[13px] text-cocoa font-medium truncate">Alerte {alert.type}</span>
                                        <span className="text-[11px] text-[#F44336] font-medium">Score: {alert.score}%</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                    <span className="text-[10px] text-cocoa-40">{new Date(alert.created_at).toLocaleString()}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${alert.status === 'open' ? 'bg-[#FFEBEE] text-[#F44336]' : 'bg-green-50 text-green-600'}`}>{alert.status === 'open' ? 'Ouverte' : 'Résolue'}</span>
                                </div>
                            </div>
                        ))}
                        {fraudAlerts.length === 0 && (
                            <div className="text-center py-10 text-cocoa-40 text-[12px]">Aucune fraude récente</div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[15px] text-cocoa font-medium">Ancrages Blockchain Récents</h2>
                        <Link to="/admin/blockchain" className="text-[12px] text-cocoa-60 hover:text-cocoa underline">Voir tout</Link>
                    </div>
                    <div className="flex-1 bg-white rounded-[16px] p-5 flex flex-col gap-4 border border-cocoa-10 overflow-y-auto max-h-[300px]">
                        {(blockchain || []).slice(0, 5).map((record: any, i: number) => (
                            <div key={record.id || i} className="flex items-center justify-between p-3 bg-cocoa-5/50 rounded-[12px] hover:bg-cocoa-5 transition-colors border border-transparent hover:border-cocoa-10">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-[10px] bg-[#E3F2FD] flex items-center justify-center shrink-0">
                                        <AdminBlockchainIcon className="h-5 w-5 text-[#2196F3]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] text-cocoa font-medium">Entité: {record.entity_type}</span>
                                        <span className="text-[11px] text-cocoa-40 font-mono">{record.hash.substring(0, 16)}...</span>
                                    </div>
                                </div>
                                <span className="text-[10px] text-cocoa-40">{new Date(record.created_at).toLocaleString()}</span>
                            </div>
                        ))}
                        {blockchain.length === 0 && (
                            <div className="text-center py-10 text-cocoa-40 text-[12px]">Aucun ancrage récent</div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[15px] text-cocoa font-medium">Logs Système Récents</h2>
                        <Link to="/admin/logs" className="text-[12px] text-cocoa-60 hover:text-cocoa underline">Voir tout</Link>
                    </div>
                    <div className="flex-1 bg-white rounded-[16px] p-5 flex flex-col gap-4 border border-cocoa-10 overflow-y-auto max-h-[300px]">
                        {(logs || []).slice(0, 5).map((log: any, i: number) => {
                            let performedBy = "Inconnu";
                            if (log.performed_by && typeof log.performed_by === 'object') {
                                performedBy = log.performed_by.first_name ? `${log.performed_by.first_name} ${log.performed_by.last_name || ''}` : "Utilisateur";
                            } else if (typeof log.performed_by === 'string') {
                                performedBy = log.performed_by;
                            }
                            return (
                                <div key={log.id || i} className="flex items-center justify-between p-3 bg-cocoa-5/50 rounded-[12px] hover:bg-cocoa-5 transition-colors border border-transparent hover:border-cocoa-10">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-[10px] bg-cocoa flex items-center justify-center shrink-0">
                                            <AdminLogsIcon className="h-5 w-5 text-white" />
                                        </div>
                                        <div className="flex flex-col max-w-[200px]">
                                            <span className="text-[13px] text-cocoa font-medium capitalize truncate">{log.action_type?.replace('_', ' ')}</span>
                                            <span className="text-[11px] text-cocoa-40 truncate">{performedBy}</span>
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-cocoa-40 shrink-0">{new Date(log.created_at).toLocaleString()}</span>
                                </div>
                            );
                        })}
                        {logs.length === 0 && (
                            <div className="text-center py-10 text-cocoa-40 text-[12px]">Aucun log récent</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdminDashboard;
