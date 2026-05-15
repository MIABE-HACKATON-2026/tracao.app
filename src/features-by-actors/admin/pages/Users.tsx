import React from "react";
import { FilterIcon, SearchIcon, OptionIcon, AddIcon, EditIcon, TrashIcon } from "../../../shared/components/icons";
import Modal from "../../../shared/components/atoms/Modal";
import { useAdminStore } from "../stores/admin.store";

const statusStyles: Record<string, { bg: string; border: string; dot: string; text: string }> = {
    active: { bg: "bg-[#E8F5E9]", border: "border-[#C8E6C9]", dot: "bg-[#4CAF50]", text: "Actif" },
    suspended: { bg: "bg-[#FFEBEE]", border: "border-[#FFCDD2]", dot: "bg-[#F44336]", text: "Suspendu" },
};

export const AdminUsers: React.FC = () => {
    const { users, isLoading, fetchUsers, createUser, updateUserStatus, deleteUser, updateUser } = useAdminStore();
    const [selected, setSelected] = React.useState<any>(null);
    const [isAddOpen, setIsAddOpen] = React.useState(false);
    const [isEditOpen, setIsEditOpen] = React.useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
    const [userToDelete, setUserToDelete] = React.useState<any>(null);
    const [activePopover, setActivePopover] = React.useState<string | null>(null);

    const [formData, setFormData] = React.useState({
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
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Utilisateurs</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Gestion des comptes</p>
                </div>
                <div className="flex gap-2">
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer hover:bg-cocoa-10 transition-colors">
                        <SearchIcon className="h-[18px] w-[18px] fill-cocoa-80 rotate-y-180" />
                    </div>
                    <div className="h-[34px] px-4 rounded-[8px] bg-cocoa-5 hover:bg-cocoa-10 flex items-center justify-center cursor-pointer gap-2 transition-colors" onClick={() => setIsAddOpen(true)}>
                        <AddIcon className="h-[16px] w-[16px] fill-cocoa" />
                        <span className="text-[12px] text-cocoa font-medium">Ajouter</span>
                    </div>
                    <div className="h-[34px] w-[34px] rounded-[8px] bg-cocoa flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                        <FilterIcon className="h-[18px] w-[18px] fill-white" />
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-4 overflow-hidden flex flex-col">
                <div className="w-full bg-[#E5E1DE] rounded-t-[12px] flex items-center h-[44px] px-6">
                    <div className="w-[200px] text-[11px] font-medium text-cocoa-60">Nom</div>
                    <div className="w-[180px] text-[11px] font-medium text-cocoa-60">Email</div>
                    <div className="w-[250px] text-[11px] font-medium text-cocoa-60">Rôle (Sous-rôle)</div>
                    <div className="w-[150px] text-[11px] font-medium text-cocoa-60">Statut</div>
                    <div className="w-[150px] text-[11px] font-medium text-cocoa-60">KYC</div>
                    <div className="w-[150px] text-[11px] font-medium text-cocoa-60">Inscrit le</div>
                    <div className="flex-1"></div>
                </div>
                <div className="flex-1 overflow-y-auto flex flex-col gap-1 mt-1.5">
                    {isLoading ? (
                        <div className="p-10 text-center text-cocoa-40 text-[12px]">Chargement des utilisateurs...</div>
                    ) : (
                        users.map((user) => (
                            <div 
                                key={user.id} 
                                className="h-[52px] bg-white/40 rounded-[8px] flex items-center px-6 hover:bg-white/60 border border-white/20 cursor-pointer relative" 
                                onClick={() => setSelected(user)}
                            >
                                <div className="w-[200px] text-[12px] text-cocoa font-medium truncate">{user.first_name} {user.last_name || user.username}</div>
                                <div className="w-[180px] text-[11px] text-cocoa-60 truncate">{user.email}</div>
                                <div className="w-[250px] text-[12px] text-cocoa-40 capitalize flex items-center gap-2">
                                    {user.role} 
                                    {user.sub_role && <span className="text-[10px] bg-cocoa-10 text-cocoa px-1.5 py-0.5 rounded-full">{user.sub_role}</span>}
                                </div>
                                <div className="w-[150px]">
                                    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium ${user.is_active ? statusStyles.active.bg : statusStyles.suspended.bg} ${user.is_active ? statusStyles.active.border : statusStyles.suspended.border}`}>
                                        <div className={`h-1.5 w-1.5 rounded-full ${user.is_active ? statusStyles.active.dot : statusStyles.suspended.dot}`}></div>
                                        {user.is_active ? 'Actif' : 'Bloqué'}
                                    </div>
                                </div>
                                <div className="w-[150px]">
                                    <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${user.kyc_status === 'approved' ? 'bg-[#E8F5E9] text-[#4CAF50] border-[#C8E6C9]' : user.kyc_status === 'rejected' ? 'bg-[#FFEBEE] text-[#F44336] border-[#FFCDD2]' : 'bg-cocoa-10 text-cocoa-60 border-cocoa-10'}`}>
                                        {user.kyc_status === 'approved' ? 'Vérifié' : user.kyc_status === 'rejected' ? 'Rejeté' : 'En attente'}
                                    </div>
                                </div>
                                <div className="w-[150px] text-[11px] text-cocoa-40">
                                    {user.date_joined || user.created_at ? new Date(user.date_joined || user.created_at).toLocaleDateString() : '—'}
                                </div>
                                <div className="flex-1 flex items-center justify-end gap-3">
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
                                                    Supprimer l'utilisateur
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
                <div className="p-8 flex flex-col gap-6 w-full max-w-[500px]">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[20px] font-medium text-cocoa">Détails de l'utilisateur</h2>
                        <div className={`px-3 py-1 rounded-full text-[11px] font-medium border ${selected?.status === 'active' ? 'bg-[#E8F5E9] text-[#4CAF50] border-[#C8E6C9]' : 'bg-[#FFEBEE] text-[#F44336] border-[#FFCDD2]'}`}>
                            {selected?.status === 'active' ? 'Compte Actif' : 'Compte Suspendu'}
                        </div>
                    </div>
                    {selected && (
                        <div className="grid grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-2">
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
                                <span className="text-[11px] text-cocoa-40">KYC Statut</span>
                                <span className={`text-[13px] font-medium ${selected.kyc_status === 'approved' ? 'text-green-600' : 'text-amber-600'}`}>
                                    {selected.kyc_status === 'approved' ? 'Vérifié' : 'En attente / Rejeté'}
                                </span>
                            </div>
                            {(selected.city || selected.country) && (
                                <>
                                    <div className="flex flex-col gap-1 px-4 py-3 bg-cocoa-5 rounded-[12px]">
                                        <span className="text-[11px] text-cocoa-40">Localité</span>
                                        <span className="text-[13px] text-cocoa font-medium">{selected.city || "—"}</span>
                                    </div>
                                    <div className="flex flex-col gap-1 px-4 py-3 bg-cocoa-5 rounded-[12px]">
                                        <span className="text-[11px] text-cocoa-40">Pays</span>
                                        <span className="text-[13px] text-cocoa font-medium">{selected.country || "—"}</span>
                                    </div>
                                    <div className="col-span-2 flex flex-col gap-1 px-4 py-3 bg-cocoa-5 rounded-[12px]">
                                        <span className="text-[11px] text-cocoa-40">Adresse</span>
                                        <span className="text-[13px] text-cocoa font-medium">{selected.address || "—"}</span>
                                    </div>
                                </>
                            )}
                            <div className="col-span-2 flex flex-col gap-1 px-4 py-3 bg-cocoa-5 rounded-[12px]">
                                <span className="text-[11px] text-cocoa-40">Date d'inscription</span>
                                <span className="text-[13px] text-cocoa font-medium">{new Date(selected.date_joined).toLocaleString()}</span>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-end gap-3 mt-2">
                        <button onClick={() => setSelected(null)} className="h-[48px] px-8 rounded-full bg-cocoa-5 text-cocoa text-[14px] font-medium hover:bg-cocoa-10 transition-colors cursor-pointer">Fermer</button>
                        <button 
                            onClick={() => { handleToggleStatus(selected); setSelected(null); }}
                            className={`h-[48px] px-8 rounded-full text-white text-[14px] font-medium hover:opacity-90 transition-opacity cursor-pointer ${selected?.status === 'active' ? 'bg-red-500' : 'bg-green-600'}`}
                        >
                            {selected?.status === 'active' ? 'Suspendre le compte' : 'Activer le compte'}
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
                <div className="p-8 flex flex-col gap-6 w-full max-w-[500px]">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[20px] font-medium text-cocoa">Créer un utilisateur</h2>
                        <p className="text-[12px] text-cocoa-40">Remplissez les informations selon le rôle</p>
                    </div>
                    
                    <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-medium text-cocoa-60 ml-1">Prénom</label>
                                <input type="text" name="first_name" value={formData.first_name} onChange={handleFormChange} placeholder="Prénom" className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none text-cocoa placeholder:text-cocoa-40 border border-transparent focus:border-cocoa-20" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-medium text-cocoa-60 ml-1">Nom</label>
                                <input type="text" name="last_name" value={formData.last_name} onChange={handleFormChange} placeholder="Nom" className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none text-cocoa placeholder:text-cocoa-40 border border-transparent focus:border-cocoa-20" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-medium text-cocoa-60 ml-1">Adresse e-mail</label>
                            <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="Adresse e-mail" className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none text-cocoa placeholder:text-cocoa-40 border border-transparent focus:border-cocoa-20" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-medium text-cocoa-60 ml-1">Rôle</label>
                                <select name="role" value={formData.role} onChange={handleFormChange} className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none text-cocoa border border-transparent focus:border-cocoa-20">
                                    <option value="">Choisir un rôle</option>
                                    <option value="farmer">Agriculteur</option>
                                    <option value="buyer">Acheteur / Exportateur</option>
                                    <option value="store">Coopérative (Magasin)</option>
                                    <option value="agent">Agent de terrain</option>
                                    <option value="transporter">Transporteur</option>
                                    <option value="processor">Transformateur</option>
                                    <option value="admin">Administrateur</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-medium text-cocoa-60 ml-1">Téléphone</label>
                                <input type="text" name="phone" value={formData.phone} onChange={handleFormChange} placeholder="+225 ..." className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none text-cocoa placeholder:text-cocoa-40 border border-transparent focus:border-cocoa-20" />
                            </div>
                        </div>

                        {(formData.role === 'admin' || formData.role === 'buyer' || formData.role === 'processor' || formData.role === 'agent') && (
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-medium text-cocoa-60 ml-1">Type précis (Sous-rôle)</label>
                                <select name="sub_role" value={formData.sub_role} onChange={handleFormChange} className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none text-cocoa border border-transparent focus:border-cocoa-20">
                                    <option value="">Choisir un type</option>
                                    {formData.role === 'admin' && (
                                        <>
                                            <option value="super_admin">Super Admin</option>
                                            <option value="gouvernement">Gouvernement</option>
                                            <option value="certificateur">Certificateur</option>
                                        </>
                                    )}
                                    {formData.role === 'buyer' && (
                                        <>
                                            <option value="exportateur">Exportateur</option>
                                            <option value="importateur">Importateur</option>
                                        </>
                                    )}
                                    {formData.role === 'processor' && (
                                        <option value="transformateur">Transformateur Industriel</option>
                                    )}
                                    {formData.role === 'agent' && (
                                        <option value="inspector">Inspecteur Qualité</option>
                                    )}
                                </select>
                            </div>
                        )}

                        {(formData.role === 'farmer' || formData.role === 'store') && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] font-medium text-cocoa-60 ml-1">Ville / Localité</label>
                                        <input type="text" name="city" value={formData.city} onChange={handleFormChange} placeholder="Ville" className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none text-cocoa border border-transparent focus:border-cocoa-20" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] font-medium text-cocoa-60 ml-1">Pays</label>
                                        <input type="text" name="country" value={formData.country} onChange={handleFormChange} placeholder="Pays" className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none text-cocoa border border-transparent focus:border-cocoa-20" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] font-medium text-cocoa-60 ml-1">Adresse précise</label>
                                    <input type="text" name="address" value={formData.address} onChange={handleFormChange} placeholder="Quartier, rue..." className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none text-cocoa border border-transparent focus:border-cocoa-20" />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 mt-2">
                        <button onClick={() => setIsAddOpen(false)} className="h-[48px] px-8 rounded-full bg-cocoa-5 text-cocoa text-[14px] font-medium hover:bg-cocoa-10 transition-colors cursor-pointer">Annuler</button>
                        <button 
                            onClick={handleCreate}
                            disabled={isLoading}
                            className="h-[48px] px-8 rounded-full bg-cocoa text-white text-[14px] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                        >
                            {isLoading ? "Création..." : "Créer le compte"}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Modal de Modification */}
            <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
                <div className="p-8 flex flex-col gap-6 w-full max-w-[500px]">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[20px] font-medium text-cocoa">Modifier l'utilisateur</h2>
                        <p className="text-[12px] text-cocoa-40">Mise à jour des informations de {formData.first_name}</p>
                    </div>
                    
                    <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-medium text-cocoa-60 ml-1">Prénom</label>
                                <input type="text" name="first_name" value={formData.first_name} onChange={handleFormChange} className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none text-cocoa border border-transparent focus:border-cocoa-20" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-medium text-cocoa-60 ml-1">Nom</label>
                                <input type="text" name="last_name" value={formData.last_name} onChange={handleFormChange} className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none text-cocoa border border-transparent focus:border-cocoa-20" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-medium text-cocoa-60 ml-1">Adresse e-mail</label>
                            <input type="email" name="email" value={formData.email} onChange={handleFormChange} className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none text-cocoa border border-transparent focus:border-cocoa-20" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-medium text-cocoa-60 ml-1">Rôle</label>
                                <select name="role" value={formData.role} onChange={handleFormChange} className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none text-cocoa border border-transparent focus:border-cocoa-20">
                                    <option value="farmer">Agriculteur</option>
                                    <option value="buyer">Acheteur / Exportateur</option>
                                    <option value="store">Coopérative (Magasin)</option>
                                    <option value="agent">Agent de terrain</option>
                                    <option value="transporter">Transporteur</option>
                                    <option value="processor">Transformateur</option>
                                    <option value="admin">Administrateur</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-medium text-cocoa-60 ml-1">Téléphone</label>
                                <input type="text" name="phone" value={formData.phone} onChange={handleFormChange} className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none text-cocoa border border-transparent focus:border-cocoa-20" />
                            </div>
                        </div>

                        {(formData.role === 'farmer' || formData.role === 'store') && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] font-medium text-cocoa-60 ml-1">Ville</label>
                                        <input type="text" name="city" value={formData.city} onChange={handleFormChange} className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none text-cocoa border border-transparent focus:border-cocoa-20" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] font-medium text-cocoa-60 ml-1">Pays</label>
                                        <input type="text" name="country" value={formData.country} onChange={handleFormChange} className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none text-cocoa border border-transparent focus:border-cocoa-20" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] font-medium text-cocoa-60 ml-1">Adresse</label>
                                    <input type="text" name="address" value={formData.address} onChange={handleFormChange} className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none text-cocoa border border-transparent focus:border-cocoa-20" />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 mt-2">
                        <button onClick={() => setIsEditOpen(false)} className="h-[48px] px-8 rounded-full bg-cocoa-5 text-cocoa text-[14px] font-medium hover:bg-cocoa-10 transition-colors cursor-pointer">Annuler</button>
                        <button 
                            onClick={handleUpdate}
                            disabled={isLoading}
                            className="h-[48px] px-8 rounded-full bg-cocoa text-white text-[14px] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                        >
                            {isLoading ? "Enregistrement..." : "Sauvegarder"}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Modal de Confirmation de Suppression */}
            <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
                <div className="p-8 flex flex-col gap-6 w-full max-w-[400px] text-center">
                    <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                        <TrashIcon className="h-8 w-8 text-red-500" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-[18px] font-medium text-cocoa">Confirmer la suppression</h2>
                        <p className="text-[13px] text-cocoa-40 px-4">
                            Êtes-vous sûr de vouloir supprimer définitivement l'utilisateur 
                            <span className="font-semibold text-cocoa"> {userToDelete?.first_name} {userToDelete?.last_name}</span> ? 
                            Cette action est irréversible.
                        </p>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                        <button 
                            onClick={confirmDelete}
                            disabled={isLoading}
                            className="h-[48px] w-full rounded-full bg-red-500 text-white text-[14px] font-medium hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-50"
                        >
                            {isLoading ? "Suppression en cours..." : "Oui, supprimer définitivement"}
                        </button>
                        <button 
                            onClick={() => setIsDeleteOpen(false)}
                            className="h-[48px] w-full rounded-full bg-cocoa-5 text-cocoa text-[14px] font-medium hover:bg-cocoa-10 transition-colors cursor-pointer"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AdminUsers;
