import { create } from "zustand";
import adminService, { type DashboardStats, type Cooperative, type KYCRecord } from "../services/admin.service";
import type { FraudAlert, BlockchainRecord, Transaction, TraceabilityLog } from "../../../shared/types";
import type { User } from "../types/admin.types";

interface AdminState {
    stats: DashboardStats | null;
    cooperatives: Cooperative[];
    kycRecords: KYCRecord[];
    fraudAlerts: FraudAlert[];
    blockchain: BlockchainRecord[];
    logs: TraceabilityLog[];
    transactions: Transaction[];
    batches: any[];
    users: User[];
    stores: User[];
    isLoading: boolean;
    error: string | null;

    fetchStats: () => Promise<void>;
    fetchStores: () => Promise<void>;
    fetchKYCRecords: () => Promise<void>;
    fetchFraudAlerts: () => Promise<void>;
    fetchBlockchain: () => Promise<void>;
    fetchLogs: () => Promise<void>;
    fetchUsers: () => Promise<void>;
    createUser: (data: any) => Promise<void>;
    updateUser: (id: string, data: any) => Promise<void>;
    updateUserStatus: (id: string, isActive: boolean) => Promise<void>;
    updateStoreStatus: (id: string, isActive: boolean) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
    fetchAdminBatches: () => Promise<void>;
    updateBatchStatus: (id: string, status: 'approve' | 'reject') => Promise<void>;
    fetchAdminTransactions: () => Promise<void>;
    completeTransaction: (id: string) => Promise<void>;
    fetchAll: () => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
    stats: null,
    cooperatives: [],
    kycRecords: [],
    fraudAlerts: [],
    blockchain: [],
    logs: [],
    transactions: [],
    batches: [],
    users: [],
    stores: [],
    isLoading: false,
    error: null,

    fetchUsers: async () => {
        set({ isLoading: true });
        try {
            const users = await adminService.getUsers();
            set({ users, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    createUser: async (data: any) => {
        set({ isLoading: true });
        try {
            await adminService.createUser(data);
            await get().fetchUsers();
            set({ isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    updateUser: async (id: string, data: any) => {
        set({ isLoading: true });
        try {
            await adminService.updateUser(id, data);
            await get().fetchUsers();
            set({ isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    updateUserStatus: async (id: string, isActive: boolean) => {
        try {
            await adminService.toggleUserStatus(id, isActive);
            set((state) => ({
                users: state.users.map((u) => 
                    u.id === id 
                        ? { ...u, is_active: isActive, status: isActive ? 'active' : 'suspended' } 
                        : u
                )
            }));
        } catch (error: any) {
            set({ error: error.message });
            throw error;
        }
    },

    deleteUser: async (id: string) => {
        try {
            await adminService.deleteUser(id);
            set((state) => ({
                users: state.users.filter((u) => u.id !== id)
            }));
        } catch (error: any) {
            set({ error: error.message });
            throw error;
        }
    },

    fetchStats: async () => {
        set({ isLoading: true });
        try {
            const stats = await adminService.getStats();
            set({ stats, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    fetchStores: async () => {
        set({ isLoading: true });
        try {
            const stores = await adminService.getStores();
            set({ stores, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    updateStoreStatus: async (id: string, isActive: boolean) => {
        try {
            await adminService.toggleStoreStatus(id, isActive);
            set((state) => ({
                stores: state.stores.map((s) => 
                    s.id === id 
                        ? { ...s, is_active: isActive, status: isActive ? 'active' : 'suspended' } 
                        : s
                )
            }));
        } catch (error: any) {
            set({ error: error.message });
            throw error;
        }
    },

    fetchKYCRecords: async () => {
        set({ isLoading: true });
        try {
            const kycRecords = await adminService.getKYCRecords();
            set({ kycRecords, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    fetchFraudAlerts: async () => {
        set({ isLoading: true });
        try {
            const fraudAlerts = await adminService.getFraudAlerts();
            set({ fraudAlerts, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    fetchBlockchain: async () => {
        set({ isLoading: true });
        try {
            const blockchain = await adminService.getBlockchainRecords();
            set({ blockchain, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    fetchLogs: async () => {
        set({ isLoading: true });
        try {
            const logs = await adminService.getLogs();
            set({ logs, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    fetchAdminTransactions: async () => {
        set({ isLoading: true });
        try {
            const transactions = await adminService.getAdminTransactions();
            set({ transactions, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    completeTransaction: async (id: string) => {
        try {
            await adminService.completeTransaction(id);
            set((state) => ({
                transactions: state.transactions.map((t: any) => 
                    t.id === id ? { ...t, status: 'completed' } : t
                )
            }));
        } catch (error: any) {
            set({ error: error.message });
            throw error;
        }
    },

    fetchAdminBatches: async () => {
        set({ isLoading: true });
        try {
            const batches = await adminService.getAdminBatches();
            set({ batches, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    updateBatchStatus: async (id: string, status: 'approve' | 'reject') => {
        try {
            await adminService.toggleBatchStatus(id, status);
            set((state) => ({
                batches: state.batches.map((b) => 
                    b.id === id ? { ...b, status: status === 'approve' ? 'approved' : 'rejected' } : b
                )
            }));
        } catch (error: any) {
            set({ error: error.message });
            throw error;
        }
    },

    fetchAll: async () => {
        set({ isLoading: true });
        try {
            const [stats, stores, kyc, fraud, blockchain, logs, txs, batches] = await Promise.all([
                adminService.getStats().catch(() => null),
                adminService.getStores().catch(() => []),
                adminService.getKYCRecords().catch(() => []),
                adminService.getFraudAlerts().catch(() => []),
                adminService.getBlockchainRecords().catch(() => []),
                adminService.getLogs().catch(() => []),
                adminService.getAdminTransactions().catch(() => []),
                adminService.getAdminBatches().catch(() => [])
            ]);
            set({
                stats,
                stores,
                kycRecords: kyc,
                fraudAlerts: fraud,
                blockchain,
                logs,
                transactions: txs,
                batches,
                isLoading: false
            });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    }
}));
