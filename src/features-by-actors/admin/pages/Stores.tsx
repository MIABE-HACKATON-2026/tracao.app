import React, { useState, useEffect } from "react";
import { 
    FilterIcon, 
    SearchIcon, 
    MoreVerticalIcon, 
    PlusIcon, 
    UserIcon,
    MailIcon,
    PhoneIcon,
    MapPinIcon,
    CheckCircleIcon,
    SlashIcon,
    TrashIcon,
    EditIcon
} from "../../../shared/components/icons";
import { useAdminStore } from "../stores/admin.store";
import { cn } from "../../../shared/lib/utils";
import { formatDate } from "../../../shared/utils/formatters";
import type { User } from "../types/admin.types";

const Stores: React.FC = () => {
    const { stores, fetchStores, isLoading, updateStoreStatus, deleteUser, createUser, updateUser } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStore, setSelectedStore] = useState<User | null>(null);
    const [activePopover, setActivePopover] = useState<string | null>(null);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const [storeToDelete, setStoreToDelete] = useState<string | null>(null);

    useEffect(() => {
        fetchStores();
    }, []);

    const filteredStores = stores.filter(s => 
        `${s.first_name} ${s.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenCreateModal = () => {
        setSelectedStore(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (store: User) => {
        setSelectedStore(store);
        setIsModalOpen(true);
        setActivePopover(null);
    };

    const handleDeleteClick = (id: string) => {
        setStoreToDelete(id);
        setIsConfirmDeleteOpen(true);
        setActivePopover(null);
    };

    const handleToggleStatus = async (id: string, currentActive: boolean) => {
        try {
            await updateStoreStatus(id, !currentActive);
            setActivePopover(null);
        } catch (error) {
            console.error("Failed to toggle status", error);
        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-6 animate-in fade-in duration-500">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[20px] font-semibold text-cocoa tracking-tight">Gestion des Magasins</h1>
                    <p className="text-[13px] text-cocoa-60">Gérez les coopératives et magasins de la plateforme</p>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-[280px]">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cocoa-20" />
                        <input 
                            type="text" 
                            placeholder="Rechercher un magasin..." 
                            className="w-full h-10 pl-10 pr-4 rounded-[12px] bg-white border border-cocoa-10 text-[13px] focus:outline-none focus:ring-2 focus:ring-cocoa/5 transition-all placeholder:text-cocoa-20"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={handleOpenCreateModal}
                        className="h-10 px-4 rounded-[12px] bg-cocoa text-white text-[13px] font-medium flex items-center gap-2 hover:bg-cocoa-90 transition-all shadow-sm active:scale-95"
                    >
                        <PlusIcon className="h-4 w-4" />
                        <span>Nouveau Magasin</span>
                    </button>
                </div>
            </div>

            {/* Stats Overview (Optional but premium) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-[16px] border border-cocoa-5 flex flex-col gap-1 shadow-sm">
                    <span className="text-[11px] text-cocoa-40 font-medium uppercase tracking-wider">Total Magasins</span>
                    <span className="text-[24px] font-semibold text-cocoa">{stores.length}</span>
                </div>
                <div className="bg-white p-4 rounded-[16px] border border-cocoa-5 flex flex-col gap-1 shadow-sm">
                    <span className="text-[11px] text-cocoa-40 font-medium uppercase tracking-wider">Actifs</span>
                    <span className="text-[24px] font-semibold text-green-600">{stores.filter(s => s.is_active).length}</span>
                </div>
                <div className="bg-white p-4 rounded-[16px] border border-cocoa-5 flex flex-col gap-1 shadow-sm">
                    <span className="text-[11px] text-cocoa-40 font-medium uppercase tracking-wider">Suspendus</span>
                    <span className="text-[24px] font-semibold text-red-500">{stores.filter(s => !s.is_active).length}</span>
                </div>
            </div>

            {/* Table Section */}
            <div className="flex-1 bg-white rounded-[20px] border border-cocoa-5 shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-cocoa-[2%] border-b border-cocoa-5">
                                <th className="px-6 py-4 text-[11px] font-semibold text-cocoa-40 uppercase tracking-wider">Magasin / Coopérative</th>
                                <th className="px-6 py-4 text-[11px] font-semibold text-cocoa-40 uppercase tracking-wider">Email & Contact</th>
                                <th className="px-6 py-4 text-[11px] font-semibold text-cocoa-40 uppercase tracking-wider">Localisation</th>
                                <th className="px-6 py-4 text-[11px] font-semibold text-cocoa-40 uppercase tracking-wider">Statut</th>
                                <th className="px-6 py-4 text-[11px] font-semibold text-cocoa-40 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cocoa-5">
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={5} className="px-6 py-8"><div className="h-4 bg-cocoa-5 rounded w-full"></div></td>
                                    </tr>
                                ))
                            ) : filteredStores.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-2 text-cocoa-40">
                                            <UserIcon className="h-10 w-10 opacity-20" />
                                            <p className="text-[14px]">Aucun magasin trouvé</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredStores.map((store) => (
                                    <tr key={store.id} className="hover:bg-cocoa-[1%] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-[12px] bg-cocoa-5 flex items-center justify-center text-cocoa font-bold text-[14px]">
                                                    {store.first_name?.[0] || "M"}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[14px] font-semibold text-cocoa">{store.first_name} {store.last_name}</span>
                                                    <span className="text-[11px] text-cocoa-40 font-medium uppercase tracking-tight">ID: {store.id.substring(0, 8)}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-[13px] text-cocoa-60">
                                                    <MailIcon className="h-3 w-3" />
                                                    <span>{store.email}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-[12px] text-cocoa-40">
                                                    <PhoneIcon className="h-3 w-3" />
                                                    <span>{store.phone || "N/A"}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-[13px] text-cocoa-60">
                                                <MapPinIcon className="h-3.5 w-3.5 text-cocoa-20" />
                                                <span>{store.city}, {store.country}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={cn(
                                                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase",
                                                store.is_active ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                                            )}>
                                                <span className={cn("w-1.5 h-1.5 rounded-full", store.is_active ? "bg-green-500" : "bg-red-500")}></span>
                                                {store.is_active ? "Actif" : "Suspendu"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right relative">
                                            <button 
                                                onClick={() => setActivePopover(activePopover === store.id ? null : store.id)}
                                                className="h-8 w-8 rounded-full hover:bg-cocoa-5 flex items-center justify-center transition-colors ml-auto"
                                            >
                                                <MoreVerticalIcon className="h-4 w-4 text-cocoa-40" />
                                            </button>

                                            {activePopover === store.id && (
                                                <>
                                                    <div className="fixed inset-0 z-10" onClick={() => setActivePopover(null)}></div>
                                                    <div className="absolute right-6 top-12 w-[180px] bg-white rounded-[12px] shadow-xl border border-cocoa-10 z-20 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-100">
                                                        <button 
                                                            onClick={() => handleOpenEditModal(store)}
                                                            className="w-full px-4 py-2 text-left text-[13px] text-cocoa hover:bg-cocoa-5 flex items-center gap-2 transition-colors"
                                                        >
                                                            <EditIcon className="h-3.5 w-3.5 text-cocoa-40" />
                                                            Modifier
                                                        </button>
                                                        <button 
                                                            onClick={() => handleToggleStatus(store.id, store.is_active)}
                                                            className={cn(
                                                                "w-full px-4 py-2 text-left text-[13px] flex items-center gap-2 transition-colors",
                                                                store.is_active ? "text-orange-600 hover:bg-orange-50" : "text-green-600 hover:bg-green-50"
                                                            )}
                                                        >
                                                            {store.is_active ? <SlashIcon className="h-3.5 w-3.5" /> : <CheckCircleIcon className="h-3.5 w-3.5" />}
                                                            {store.is_active ? "Suspendre" : "Réactiver"}
                                                        </button>
                                                        <div className="h-[1px] bg-cocoa-5 my-1"></div>
                                                        <button 
                                                            onClick={() => handleDeleteClick(store.id)}
                                                            className="w-full px-4 py-2 text-left text-[13px] text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                                                        >
                                                            <TrashIcon className="h-3.5 w-3.5" />
                                                            Supprimer
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination Placeholder */}
                <div className="p-4 bg-cocoa-[1%] border-t border-cocoa-5 flex justify-between items-center text-[12px] text-cocoa-40 font-medium">
                    <span>Affichage de {filteredStores.length} sur {stores.length} magasins</span>
                    <div className="flex gap-1">
                        <button className="px-3 py-1.5 rounded-lg border border-cocoa-10 bg-white disabled:opacity-50" disabled>Précédent</button>
                        <button className="px-3 py-1.5 rounded-lg border border-cocoa-10 bg-white disabled:opacity-50" disabled>Suivant</button>
                    </div>
                </div>
            </div>

            {/* Modal & Delete Confirmation would go here (similar to Users.tsx) */}
            {/* For brevity, I'll focus on the main UI first and add modals if needed */}
        </div>
    );
};

export default Stores;
