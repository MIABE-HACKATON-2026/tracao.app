import React from "react";
import { FilterIcon, SearchIcon, OptionIcon, AddIcon, EditIcon, TrashIcon } from "../../../shared/components/icons";
import Modal from "../../../shared/components/atoms/Modal";
import { useAdminStore } from "../stores/admin.store";
import { AdminCard, AdminTableHeader, AdminTableRow, AdminTableCell, AdminBadge, AdminButton, AdminFilterBtn } from "../components/AdminUI";

export const AdminUsers: React.FC = () => {
    const { users, isLoading, fetchUsers, createUser, updateUserStatus, deleteUser, updateUser } = useAdminStore();
    const [selected, setSelected] = React.useState<any>(null);
    const [isAddOpen, setIsAddOpen] = React.useState(false);
    const [isEditOpen, setIsEditOpen] = React.useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
    const [userToDelete, setUserToDelete] = React.useState<any>(null);
    const [activePopover, setActivePopover] = React.useState<string | null>(null);

    const [formData, setFormData] = React.useState<any>({
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        role: "",
        sub_role: "",
        country: "Côte d'Ivoire",
        city: "",
        address: "",
        password: "",
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreate = async () => {
        try {
            await createUser(formData);
            setIsAddOpen(false);
            resetForm();
        } catch (error) {
            console.error("Erreur creation:", error);
        }
    };

    const handleUpdate = async () => {
        try {
            await updateUser(formData.id, formData);
            setIsEditOpen(false);
            resetForm();
        } catch (error) {
            console.error("Erreur modification:", error);
        }
    };

    const resetForm = () => {
        setFormData({
            id: "",
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            role: "",
            sub_role: "",
            country: "Côte d'Ivoire",
            city: "",
            address: "",
            password: "",
        });
    };

    const openEdit = (user: any) => {
        setFormData({
            id: user.id,
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            email: user.email || "",
            phone: user.phone || "",
            role: user.role || "",
            sub_role: user.sub_role || "",
            country: user.country || "Côte d'Ivoire",
            city: user.city || "",
            address: user.address || "",
            password: "",
        });
        setIsEditOpen(true);
        setActivePopover(null);
    };

    const handleDelete = (user: any) => {
        setUserToDelete(user);
        setIsDeleteOpen(true);
        setActivePopover(null);
    };

    const confirmDelete = async () => {
        if (!userToDelete) return;
        try {
            await deleteUser(userToDelete.id);
            setIsDeleteOpen(false);
            setUserToDelete(null);
        } catch (error) {
            console.error("Erreur suppression:", error);
        }
    };

    const handleToggleStatus = async (user: any) => {
        try {
            await updateUserStatus(user.id, !user.is_active);
        } catch (error) {
            console.error("Erreur status:", error);
        }
    };

    React.useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <div className="w-full h-full flex flex-col gap-5 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Utilisateurs</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Gestion globale des comptes</p>
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

            <AdminCard>
                <AdminTableHeader headers={["Utilisateur", "Email", "Rôle", "Statut", "KYC", "Inscription", ""]} />
                <div className="flex-1 overflow-y-auto flex flex-col gap-1 mt-1.5">
                    {isLoading ? (
                        <div className="p-10 text-center text-cocoa-40 text-[12px] animate-pulse">Chargement des utilisateurs...</div>
                    ) : (
                        users.map((user) => (
                            <AdminTableRow key={user.id} onClick={() => setSelected(user)}>
                                <AdminTableCell width="w-[180px]">
                                    <div className="flex items-center gap-2">
                                        <div className="h-7 w-7 rounded-full bg-cocoa-10 flex items-center justify-center text-cocoa font-bold text-[10px]">
                                            {(user.first_name || user.username || "U")[0]}
                                        </div>
                                        <span className="truncate">{user.first_name} {user.last_name || user.username}</span>
                                    </div>
                                </AdminTableCell>
                                <AdminTableCell width="w-[180px]" className="text-cocoa-60 text-[11px] truncate">{user.email}</AdminTableCell>
                                <AdminTableCell width="w-[200px]" className="capitalize flex items-center gap-2">
                                    {user.role} 
                                    {user.sub_role && <span className="text-[9px] bg-cocoa-10 text-cocoa px-1.5 py-0.5 rounded-full">{user.sub_role}</span>}
                                </AdminTableCell>
                                <AdminTableCell width="w-[120px]">
                                    <AdminBadge 
                                        variant={user.is_active ? 'success' : 'error'} 
                                        label={user.is_active ? 'Actif' : 'Bloqué'} 
                                    />
                                </AdminTableCell>
                                <AdminTableCell width="w-[120px]">
                                    <AdminBadge 
                                        variant={user.kyc_status === 'approved' ? 'success' : user.kyc_status === 'rejected' ? 'error' : 'neutral'} 
                                        label={user.kyc_status === 'approved' ? 'Vérifié' : user.kyc_status === 'rejected' ? 'Rejeté' : 'En attente'} 
                                    />
                                </AdminTableCell>
                                <AdminTableCell width="w-[120px]" className="text-cocoa-40">
                                    {user.date_joined || user.created_at ? new Date(user.date_joined || user.created_at).toLocaleDateString() : '—'}
                                </AdminTableCell>
                                <AdminTableCell className="flex justify-end gap-3">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleToggleStatus(user); }} 
                                        className={`text-[10px] font-medium px-3 py-1 rounded-full border transition-colors cursor-pointer ${user.is_active ? 'border-red-200 text-red-500 hover:bg-red-50' : 'border-green-200 text-green-600 hover:bg-green-50'}`}
                                    >
                                        {user.is_active ? 'Désactiver' : 'Activer'}
                                    </button>
                                    <div className="relative">
                                        <div 
                                            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-cocoa-10 transition-colors cursor-pointer" 
                                            onClick={(e) => { e.stopPropagation(); setActivePopover(activePopover === user.id ? null : user.id); }}
                                        >
                                            <OptionIcon className="h-4 w-4 text-cocoa-40" />
                                        </div>
                                        {activePopover === user.id && (
                                            <div className="absolute right-0 top-10 w-48 bg-white rounded-[12px] shadow-lg border border-cocoa-10 py-2 z-10 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                                                <button 
                                                    onClick={() => openEdit(user)}
                                                    className="w-full text-left px-4 py-2 text-[12px] text-cocoa hover:bg-cocoa-5 transition-colors flex items-center gap-2 cursor-pointer"
                                                >
                                                    <EditIcon className="h-3.5 w-3.5" />
                                                    Modifier l'utilisateur
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(user)}
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

            <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
                <div className="p-8 flex flex-col gap-6 w-full max-w-[500px]">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[20px] font-medium text-cocoa">Détails utilisateur</h2>
                        <AdminBadge variant={selected?.is_active ? 'success' : 'error'} label={selected?.is_active ? 'Compte Actif' : 'Suspendu'} />
                    </div>
                    {selected && (
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1 px-4 py-3 bg-cocoa-5 rounded-[12px]">
                                <span className="text-[11px] text-cocoa-40">Prénom & Nom</span>
                                <span className="text-[13px] text-cocoa font-medium">{selected.first_name} {selected.last_name}</span>
                            </div>
                            <div className="flex flex-col gap-1 px-4 py-3 bg-cocoa-5 rounded-[12px]">
                                <span className="text-[11px] text-cocoa-40">Rôle</span>
                                <span className="text-[13px] text-cocoa font-medium capitalize">{selected.role} {selected.sub_role ? `(${selected.sub_role})` : ""}</span>
                            </div>
                            <div className="col-span-2 flex flex-col gap-1 px-4 py-3 bg-cocoa-5 rounded-[12px]">
                                <span className="text-[11px] text-cocoa-40">Email</span>
                                <span className="text-[13px] text-cocoa font-medium">{selected.email}</span>
                            </div>
                            <div className="flex flex-col gap-1 px-4 py-3 bg-cocoa-5 rounded-[12px]">
                                <span className="text-[11px] text-cocoa-40">Téléphone</span>
                                <span className="text-[13px] text-cocoa font-medium">{selected.phone || "—"}</span>
                            </div>
                            <div className="flex flex-col gap-1 px-4 py-3 bg-cocoa-5 rounded-[12px]">
                                <span className="text-[11px] text-cocoa-40">Inscription</span>
                                <span className="text-[13px] text-cocoa font-medium">{new Date(selected.date_joined || selected.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-end gap-3 mt-2">
                        <AdminButton variant="secondary" onClick={() => setSelected(null)}>Fermer</AdminButton>
                        <AdminButton 
                            className={selected?.is_active ? "bg-red-500" : "bg-green-600"}
                            onClick={() => { handleToggleStatus(selected); setSelected(null); }}
                        >
                            {selected?.is_active ? 'Suspendre' : 'Activer'}
                        </AdminButton>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isAddOpen || isEditOpen} onClose={() => { setIsAddOpen(false); setIsEditOpen(false); resetForm(); }}>
                <div className="p-8 flex flex-col gap-6 w-full max-w-[500px]">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[20px] font-medium text-cocoa">{isEditOpen ? "Modifier l'utilisateur" : "Créer un utilisateur"}</h2>
                        <p className="text-[12px] text-cocoa-40">{isEditOpen ? `Mise à jour de ${formData.first_name}` : "Remplissez les informations du compte"}</p>
                    </div>
                    
                    <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2">
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" name="first_name" value={formData.first_name} onChange={handleFormChange} placeholder="Prénom" className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[13px] outline-none border-transparent focus:border-cocoa-20" />
                            <input type="text" name="last_name" value={formData.last_name} onChange={handleFormChange} placeholder="Nom" className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[13px] outline-none border-transparent focus:border-cocoa-20" />
                        </div>
                        <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="Email" className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[13px] outline-none border-transparent focus:border-cocoa-20" />
                        <div className="grid grid-cols-2 gap-4">
                            <select name="role" value={formData.role} onChange={handleFormChange} className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[13px] outline-none border-transparent focus:border-cocoa-20">
                                <option value="">Rôle</option>
                                <option value="farmer">Agriculteur</option>
                                <option value="buyer">Acheteur</option>
                                <option value="store">Magasin</option>
                                <option value="agent">Agent</option>
                                <option value="transporter">Transporteur</option>
                                <option value="processor">Transformateur</option>
                                <option value="admin">Administrateur</option>
                            </select>
                            <input type="text" name="phone" value={formData.phone} onChange={handleFormChange} placeholder="Téléphone" className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[13px] outline-none border-transparent focus:border-cocoa-20" />
                        </div>
                        {!isEditOpen && <input type="password" name="password" value={formData.password} onChange={handleFormChange} placeholder="Mot de passe" className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[13px] outline-none border-transparent focus:border-cocoa-20" />}
                    </div>

                    <div className="flex justify-end gap-3 mt-2">
                        <AdminButton variant="secondary" onClick={() => { setIsAddOpen(false); setIsEditOpen(false); resetForm(); }}>Annuler</AdminButton>
                        <AdminButton onClick={isEditOpen ? handleUpdate : handleCreate} disabled={isLoading}>
                            {isLoading ? "Action..." : isEditOpen ? "Enregistrer" : "Créer"}
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
                        <p className="text-[13px] text-cocoa-40 px-4">Supprimer définitivement {userToDelete?.first_name} ?</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <AdminButton className="w-full bg-red-500" onClick={confirmDelete}>Confirmer</AdminButton>
                        <AdminButton variant="secondary" className="w-full" onClick={() => setIsDeleteOpen(false)}>Annuler</AdminButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AdminUsers;
