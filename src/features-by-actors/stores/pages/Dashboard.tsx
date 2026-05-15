import React from "react";
import { Link } from "react-router-dom";
import {
    StoreDashboardIcon, StoreMembersIcon, StoreAgentsIcon,
    StoreValidationIcon, StoreTransportIcon, StoreFraudIcon,
    StoreReportIcon, StoreBellIcon
} from "../stores/stores-icons";
import { ArrowRightIcon, CheckIcon, FilterIcon, SearchIcon } from "../../../shared/components/icons";
import { useMembersStore } from "../stores/members.store";
import { useTransportsStore } from "../stores/transports.store";
import { useFraudStore } from "../stores/fraud.store";
import { useNotificationsStore } from "../stores/notifications.store";
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, BarChart, Bar, Cell 
} from 'recharts';



import reportsService, { type StoreDashboardStats } from "../services/reports.service";

const COLORS = ['#D3A27F', '#8B5E3C', '#5C3D2E', '#3D2B1F'];

const StoresDashboard: React.FC = () => {
    const { members, fetchMembers } = useMembersStore();
    const { transports, fetchTransports } = useTransportsStore();
    const { alerts, fetchAlerts } = useFraudStore();
    const { notifications } = useNotificationsStore();
    const [stats, setStats] = React.useState<StoreDashboardStats | null>(null);
    const [isLoadingStats, setIsLoadingStats] = React.useState(true);

    React.useEffect(() => {
        fetchMembers();
        fetchTransports();
        fetchAlerts();
        
        reportsService.getStoreDashboardStats()
            .then(setStats)
            .finally(() => setIsLoadingStats(false));
    }, [fetchMembers, fetchTransports, fetchAlerts]);

    const activeMembers = stats?.counts.active_members ?? 0;
    const pendingValidations = stats?.counts.pending_validations ?? 0;
    const activeTransports = stats?.counts.active_transports ?? 0;
    const openAlerts = stats?.counts.open_alerts ?? 0;

    const chartData = stats?.evolution || [];
    const zoneData = stats?.zones || [];

    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Tableau de bord Coopérative</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Gérez vos membres, validations et transports</p>
                </div>
                <div className="flex gap-2 items-center">
                    <div className={`h-[34px] flex items-center bg-cocoa-5 rounded-[8px] transition-all duration-300 overflow-hidden ${isSearchOpen ? 'w-[200px] px-3' : 'w-[34px] justify-center cursor-pointer'}`} onClick={() => !isSearchOpen && setIsSearchOpen(true)}>
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
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                        <FilterIcon className="h-[18px] w-[18px] fill-white" />
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-4 overflow-y-auto flex flex-col gap-6">
                <div className="grid grid-cols-4 gap-4">
                    <Link to="/stores/members" className="bg-cocoa rounded-[16px] p-6 flex flex-col gap-4 hover:shadow-md transition-shadow border">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-[12px] bg-white/20 flex items-center justify-center">
                                <StoreMembersIcon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[14px] text-white font-medium">Membres</span>
                                <span className="text-[11px] text-white/60">Membres actifs</span>
                            </div>
                        </div>
                        <span className="text-[32px] text-white font-medium">{activeMembers}</span>
                        <div className="flex items-center gap-2 text-[12px] text-white/60">
                            <span className="inline-block w-2 h-2 rounded-full bg-white/40"></span>
                            Total actifs
                        </div>
                    </Link>

                    <Link to="/stores/pending" className="bg-white rounded-[16px] p-6 flex flex-col gap-4 hover:shadow-md transition-shadow border border-white">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-[12px] bg-[#FFF3E0] flex items-center justify-center">
                                <StoreValidationIcon className="h-5 w-5 text-[#FF9800]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[14px] text-cocoa font-medium">Validations</span>
                                <span className="text-[11px] text-cocoa-40">En attente</span>
                            </div>
                        </div>
                        <span className="text-[32px] text-cocoa font-medium">{pendingValidations}</span>
                        <div className="flex items-center gap-2 text-[12px] text-cocoa-40">
                            <span className="inline-block w-2 h-2 rounded-full bg-[#FF9800]"></span>
                            Action requise
                        </div>
                    </Link>

                    <Link to="/stores/transport" className="bg-white rounded-[16px] p-6 flex flex-col gap-4 hover:shadow-md transition-shadow border border-white">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-[12px] bg-[#E3F2FD] flex items-center justify-center">
                                <StoreTransportIcon className="h-5 w-5 text-[#2196F3]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[14px] text-cocoa font-medium">Transports</span>
                                <span className="text-[11px] text-cocoa-40">En cours</span>
                            </div>
                        </div>
                        <span className="text-[32px] text-cocoa font-medium">{activeTransports}</span>
                        <div className="flex items-center gap-2 text-[12px] text-cocoa-40">
                            <span className="inline-block w-2 h-2 rounded-full bg-[#2196F3]"></span>
                            Lots en transit
                        </div>
                    </Link>

                    <Link to="/stores/fraud" className="bg-white rounded-[16px] p-6 flex flex-col gap-4 hover:shadow-md transition-shadow border border-white">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-[12px] bg-[#FFEBEE] flex items-center justify-center">
                                <StoreFraudIcon className="h-5 w-5 text-[#F44336]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[14px] text-cocoa font-medium">Alertes</span>
                                <span className="text-[11px] text-cocoa-40">Fraudes ouvertes</span>
                            </div>
                        </div>
                        <span className="text-[32px] text-cocoa font-medium">{openAlerts}</span>
                        <div className="flex items-center gap-2 text-[12px] text-cocoa-40">
                            <span className="inline-block w-2 h-2 rounded-full bg-[#F44336]"></span>
                            Critique
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-white rounded-[16px] p-6 border border-white flex flex-col gap-4 h-[300px]">
                        <div className="flex items-center justify-between">
                            <h2 className="text-[14px] text-cocoa font-medium">Évolution des collectes</h2>
                            <span className="text-[11px] text-cocoa-40">6 derniers mois</span>
                        </div>
                        <div className="flex-1 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                                    <XAxis 
                                        dataKey="name" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#8B5E3C', fontSize: 10 }}
                                        dy={10}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#8B5E3C', fontSize: 10 }}
                                    />
                                    <Tooltip 
                                        contentStyle={{ 
                                            borderRadius: '12px', 
                                            border: 'none', 
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                            fontSize: '12px'
                                        }} 
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="value" 
                                        stroke="#8B5E3C" 
                                        strokeWidth={2} 
                                        dot={{ fill: '#8B5E3C', r: 4 }} 
                                        activeDot={{ r: 6 }} 
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white rounded-[16px] p-6 border border-white flex flex-col gap-4 h-[300px]">
                        <div className="flex items-center justify-between">
                            <h2 className="text-[14px] text-cocoa font-medium">Activité par zone</h2>
                            <span className="text-[11px] text-cocoa-40">Tonnage par région</span>
                        </div>
                        <div className="flex-1 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={zoneData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                                    <XAxis 
                                        dataKey="name" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#8B5E3C', fontSize: 10 }}
                                        dy={10}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#8B5E3C', fontSize: 10 }}
                                    />
                                    <Tooltip 
                                        cursor={{ fill: '#F5F5F5' }}
                                        contentStyle={{ 
                                            borderRadius: '12px', 
                                            border: 'none', 
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                            fontSize: '12px'
                                        }} 
                                    />
                                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                        {zoneData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-[15px] text-cocoa font-medium">Actions rapides</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link to="/stores/parcels/validation" className="bg-white rounded-[16px] p-5 flex items-center justify-between hover:shadow-lg transition-all border border-white group">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-[12px] bg-cocoa-5 flex items-center justify-center group-hover:bg-[#FFF3E0] transition-colors">
                                        <StoreValidationIcon className="h-6 w-6 text-cocoa group-hover:text-[#FF9800] transition-colors" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[15px] text-cocoa font-medium">Validation Parcelles</span>
                                        <span className="text-[11px] text-cocoa-40">Nouveaux terrains</span>
                                    </div>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-cocoa-5 flex items-center justify-center group-hover:bg-cocoa group-hover:text-white transition-all">
                                    <ArrowRightIcon className="h-4 w-4" />
                                </div>
                            </Link>
                            
                            <Link to="/stores/members" className="bg-white rounded-[16px] p-5 flex items-center justify-between hover:shadow-lg transition-all border border-white group">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-[12px] bg-cocoa-5 flex items-center justify-center group-hover:bg-[#E8F5E9] transition-colors">
                                        <StoreMembersIcon className="h-6 w-6 text-cocoa group-hover:text-[#4CAF50] transition-colors" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[15px] text-cocoa font-medium">Profils KYC</span>
                                        <span className="text-[11px] text-cocoa-40">Vérifier documents</span>
                                    </div>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-cocoa-5 flex items-center justify-center group-hover:bg-cocoa group-hover:text-white transition-all">
                                    <ArrowRightIcon className="h-4 w-4" />
                                </div>
                            </Link>

                            <Link to="/stores/agents" className="bg-white rounded-[16px] p-5 flex items-center justify-between hover:shadow-lg transition-all border border-white group">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-[12px] bg-cocoa-5 flex items-center justify-center group-hover:bg-[#E3F2FD] transition-colors">
                                        <StoreAgentsIcon className="h-6 w-6 text-cocoa group-hover:text-[#2196F3] transition-colors" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[15px] text-cocoa font-medium">Agents Terrain</span>
                                        <span className="text-[11px] text-cocoa-40">Missions & Suivi</span>
                                    </div>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-cocoa-5 flex items-center justify-center group-hover:bg-cocoa group-hover:text-white transition-all">
                                    <ArrowRightIcon className="h-4 w-4" />
                                </div>
                            </Link>

                            <Link to="/stores/reports" className="bg-white rounded-[16px] p-5 flex items-center justify-between hover:shadow-lg transition-all border border-white group">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-[12px] bg-cocoa-5 flex items-center justify-center group-hover:bg-[#F3E5F5] transition-colors">
                                        <StoreReportIcon className="h-6 w-6 text-cocoa group-hover:text-[#9C27B0] transition-colors" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[15px] text-cocoa font-medium">Rapports</span>
                                        <span className="text-[11px] text-cocoa-40">Stats & Analyses</span>
                                    </div>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-cocoa-5 flex items-center justify-center group-hover:bg-cocoa group-hover:text-white transition-all">
                                    <ArrowRightIcon className="h-4 w-4" />
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-[15px] text-cocoa font-medium">Activité récente</h2>
                        </div>
                        <div className="flex-1 bg-white rounded-[16px] p-5 flex flex-col gap-4 border border-white overflow-y-auto max-h-[340px]">
                            {notifications.slice(0, 4).map((notification, i) => {
                                const getIcon = () => {
                                    switch (notification.type) {
                                        case 'validation': return { icon: StoreValidationIcon, color: "text-green-500", bg: "bg-green-50" };
                                        case 'rejection': return { icon: StoreValidationIcon, color: "text-red-500", bg: "bg-red-50" };
                                        case 'fraud': return { icon: StoreFraudIcon, color: "text-orange-500", bg: "bg-orange-50" };
                                        case 'transport': return { icon: StoreTransportIcon, color: "text-blue-500", bg: "bg-blue-50" };
                                        default: return { icon: StoreMembersIcon, color: "text-cocoa", bg: "bg-cocoa-5" };
                                    }
                                };
                                const { icon: Icon, color, bg } = getIcon();
                                return (
                                    <div key={notification.id} className="flex items-center gap-3 group cursor-pointer hover:bg-cocoa-5 p-2 rounded-[12px] transition-colors">
                                        <div className={`h-10 w-10 rounded-[12px] flex items-center justify-center ${bg}`}>
                                            <Icon className={`h-5 w-5 ${color}`} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[13px] text-cocoa font-medium truncate max-w-[180px]">{notification.message}</span>
                                            <span className="text-[10px] text-cocoa-40">{new Date(notification.created_at).toLocaleString()}</span>
                                        </div>
                                    </div>
                                );
                            })}
                            {notifications.length === 0 && (
                                <div className="text-center py-10 text-cocoa-40 text-[12px]">Aucune activité récente</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoresDashboard;

