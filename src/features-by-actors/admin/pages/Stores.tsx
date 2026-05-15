import { 
    FilterIcon, 
    SearchIcon, 
    OptionIcon, 
    AddIcon, 
    MailIcon,
    PhoneIcon,
    MapPinIcon,
    TrashIcon,
    EditIcon,
    SlashIcon,
    CheckCircleIcon
} from "../../../shared/components/icons";
import { AdminCoopIcon } from "../components/admin-icons";
import { useAdminStore } from "../stores/admin.store";
import { AdminCard, AdminTableHeader, AdminTableRow, AdminTableCell, AdminBadge, AdminButton, AdminFilterBtn, AdminStatCard } from "../components/AdminUI";
import Modal from "../../../shared/components/atoms/Modal";
import type { User } from "../types/admin.types";
import { cn } from "../../../shared/lib/utils";

const Stores: React.FC = () => {
    const { stores, fetchStores, isLoading, updateStoreStatus, deleteUser, createUser, updateUser } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [selectedStore, setSelectedStore] = useState<User | null>(null);
    const [activePopover, setActivePopover] = useState<string | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [storeToDelete, setStoreToDelete] = useState<User | null>(null);

    useEffect(() => {
        fetchStores();
    }, [fetchStores]);

    const filteredStores = stores.filter(s => 
        `${s.first_name} ${s.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToggleStatus = async (store: User) => {
        try {
            await updateStoreStatus(store.id, !store.is_active);
            setActivePopover(null);
        } catch (error) {
            console.error("Failed to toggle status", error);
        }
    };

    const handleDelete = async () => {
        if (!storeToDelete) return;
        try {
            await deleteUser(storeToDelete.id);
            setIsDeleteOpen(false);
            setStoreToDelete(null);
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-5 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Gestion des Magasins</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Coopératives et points de collecte</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-full bg-cocoa-5 flex items-center justify-center cursor-pointer hover:bg-cocoa-10 transition-colors">
                        <SearchIcon className="h-[18px] w-[18px] fill-cocoa-80" />
                    </div>
                    <AdminButton size="sm" variant="secondary" onClick={() => setIsAddOpen(true)} className="gap-2">
                        <AddIcon className="h-[16px] w-[16px] fill-cocoa" />
                        <span>Ajouter</span>
                    </AdminButton>
                    <AdminFilterBtn onClick={() => {}} />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <AdminStatCard 
                    title="Total Magasins" 
                    value={stores.length} 
                    detail="Coopératives" 
                    icon={AdminCoopIcon} 
                    variant="primary" 
                />
                <AdminStatCard 
                    title="Actifs" 
                    value={stores.filter(s => s.is_active).length} 
                    detail="En service" 
                    icon={AdminCoopIcon} 
                    variant="success" 
                />
                <AdminStatCard 
                    title="Bloqués" 
                    value={stores.filter(s => !s.is_active).length} 
                    detail="Suspendus" 
                    icon={AdminCoopIcon} 
                    variant="error" 
                />
            </div>

            <AdminCard>
                <AdminTableHeader headers={["Magasin / Coopérative", "Email & Contact", "Localisation", "Statut", ""]} />
                <div className="flex-1 overflow-y-auto flex flex-col gap-1 mt-1.5">
                    {isLoading ? (
                        <div className="p-10 text-center text-cocoa-40 text-[12px] animate-pulse">Chargement des magasins...</div>
                    ) : filteredStores.length === 0 ? (
                        <div className="p-10 text-center text-cocoa-40 text-[12px]">Aucun magasin trouvé</div>
                    ) : (
                        filteredStores.map((store) => (
                            <AdminTableRow key={store.id} onClick={() => setSelectedStore(store)}>
                                <AdminTableCell width="w-[250px]">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-cocoa-10 flex items-center justify-center text-cocoa font-bold text-[12px]">
                                            {store.first_name?.[0] || "M"}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-medium text-cocoa">{store.first_name} {store.last_name}</span>
                                            <span className="text-[10px] text-cocoa-40 uppercase">ID: {store.id.substring(0, 8)}</span>
                                        </div>
                                    </div>
                                </AdminTableCell>
                                <AdminTableCell width="w-[220px]">
                                    <div className="flex flex-col gap-0.5">
                                        <div className="flex items-center gap-1.5 text-[11px] text-cocoa-60">
                                            <MailIcon className="h-3 w-3" />
                                            <span>{store.email}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] text-cocoa-40">
                                            <PhoneIcon className="h-3 w-3" />
                                            <span>{store.phone || "—"}</span>
                                        </div>
                                    </div>
                                </AdminTableCell>
                                <AdminTableCell width="w-[180px]">
                                    <div className="flex items-center gap-1.5 text-[11px] text-cocoa-60">
                                        <MapPinIcon className="h-3.5 w-3.5 text-cocoa-20" />
                                        <span>{store.city || "—"}</span>
                                    </div>
                                </AdminTableCell>
                                <AdminTableCell width="w-[120px]">
                                    <AdminBadge 
                                        variant={store.is_active ? 'success' : 'error'} 
                                        label={store.is_active ? 'Actif' : 'Bloqué'} 
                                    />
                                </AdminTableCell>
                                <AdminTableCell className="flex justify-end gap-3">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleToggleStatus(store); }} 
                                        className={`text-[10px] font-medium px-3 py-1 rounded-full border transition-colors cursor-pointer ${store.is_active ? 'border-red-200 text-red-500 hover:bg-red-50' : 'border-green-200 text-green-600 hover:bg-green-50'}`}
                                    >
                                        {store.is_active ? 'Désactiver' : 'Activer'}
                                    </button>
                                    <div className="relative">
                                        <div 
                                            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-cocoa-10 transition-colors cursor-pointer" 
                                            onClick={(e) => { e.stopPropagation(); setActivePopover(activePopover === store.id ? null : store.id); }}
                                        >
                                            <OptionIcon className="h-4 w-4 text-cocoa-40" />
                                        </div>
                                        {activePopover === store.id && (
                                            <div className="absolute right-0 top-10 w-48 bg-white rounded-[12px] shadow-lg border border-cocoa-10 py-2 z-10 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                                                <button className="w-full text-left px-4 py-2 text-[12px] text-cocoa hover:bg-cocoa-5 transition-colors flex items-center gap-2 cursor-pointer">
                                                    <EditIcon className="h-3.5 w-3.5" />
                                                    Modifier le magasin
                                                </button>
                                                <button 
                                                    onClick={() => { setStoreToDelete(store); setIsDeleteOpen(true); setActivePopover(null); }}
                                                    className="w-full text-left px-4 py-2 text-[12px] text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2 cursor-pointer"
                                                >
                                                    <TrashIcon className="h-3.5 w-3.5" />
                                                    Supprimer
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </AdminTableCell>
                            </AdminTableRow>
                        ))
                    )}
                </div>
            </AdminCard>

            <Modal isOpen={!!selectedStore} onClose={() => setSelectedStore(null)}>
                <div className="p-8 flex flex-col gap-6 w-full max-w-[500px]">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[20px] font-medium text-cocoa">Détails du magasin</h2>
                        <AdminBadge variant={selectedStore?.is_active ? 'success' : 'error'} label={selectedStore?.is_active ? 'Actif' : 'Suspendu'} />
                    </div>
                    {selectedStore && (
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1 px-4 py-3 bg-cocoa-5 rounded-[12px]">
                                <span className="text-[11px] text-cocoa-40">Nom du magasin</span>
                                <span className="text-[13px] text-cocoa font-medium">{selectedStore.first_name} {selectedStore.last_name}</span>
                            </div>
                            <div className="flex flex-col gap-1 px-4 py-3 bg-cocoa-5 rounded-[12px]">
                                <span className="text-[11px] text-cocoa-40">Email officiel</span>
                                <span className="text-[13px] text-cocoa font-medium truncate">{selectedStore.email}</span>
                            </div>
                            <div className="flex flex-col gap-1 px-4 py-3 bg-cocoa-5 rounded-[12px]">
                                <span className="text-[11px] text-cocoa-40">Téléphone</span>
                                <span className="text-[13px] text-cocoa font-medium">{selectedStore.phone || "—"}</span>
                            </div>
                            <div className="flex flex-col gap-1 px-4 py-3 bg-cocoa-5 rounded-[12px]">
                                <span className="text-[11px] text-cocoa-40">Localité</span>
                                <span className="text-[13px] text-cocoa font-medium">{selectedStore.city || "—"}</span>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-end gap-3 mt-2">
                        <AdminButton variant="secondary" onClick={() => setSelectedStore(null)}>Fermer</AdminButton>
                        <AdminButton 
                            className={selectedStore?.is_active ? "bg-red-500" : "bg-green-600"}
                            onClick={() => { if(selectedStore) handleToggleStatus(selectedStore); setSelectedStore(null); }}
                        >
                            {selectedStore?.is_active ? 'Suspendre' : 'Activer'}
                        </AdminButton>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
                <div className="p-8 flex flex-col gap-6 w-full max-w-[400px] text-center">
                    <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                        <TrashIcon className="h-8 w-8 text-red-500" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-[18px] font-medium text-cocoa">Confirmer la suppression</h2>
                        <p className="text-[13px] text-cocoa-40 px-4">Êtes-vous sûr de vouloir supprimer définitivement le magasin <span className="font-semibold text-cocoa">{storeToDelete?.first_name}</span> ?</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <AdminButton className="w-full bg-red-500 hover:bg-red-600" onClick={handleDelete}>Confirmer</AdminButton>
                        <AdminButton variant="secondary" className="w-full" onClick={() => setIsDeleteOpen(false)}>Annuler</AdminButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Stores;
