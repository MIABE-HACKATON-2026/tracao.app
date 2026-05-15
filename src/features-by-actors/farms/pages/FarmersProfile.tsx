import React from "react";
import { CameraIcon, EyeIcon, CheckIcon } from "../../../shared/components/icons";
import Button from "../../../shared/components/atomes/Button";
import Input from "../../../shared/components/atomes/Input";
import { useSession } from "../../auth/stores/session.store";

type ProfileTab = 'photo' | 'personal' | 'security';

const FarmersProfile: React.FC = () => {
    const { user } = useSession();
    const [activeTab, setActiveTab] = React.useState<ProfileTab>('photo');

    const tabs = [
        { id: 'photo' as const, label: 'Photo de profil' },
        { id: 'personal' as const, label: 'Informations personnelles' },
        { id: 'security' as const, label: 'Sécurité' },
    ];

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-start">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Mon profil</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Gérez vos informations personnelles</p>
                </div>
            </div>

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-8 flex flex-col gap-8 overflow-y-auto">
                {/* Tabs */}
                <div className="flex gap-1 p-1 bg-white rounded-[12px] w-fit border border-cocoa-5">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-2 rounded-[8px] text-[13px] font-medium transition-all cursor-pointer ${
                                activeTab === tab.id
                                ? 'bg-cocoa text-white'
                                : 'text-cocoa-40 hover:text-cocoa-60 hover:bg-cocoa-5'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {activeTab === 'photo' && (
                    <div className="flex flex-col gap-6 py-4">
                        <div className="flex items-center gap-6">
                            <div className="w-[100px] h-[100px] rounded-[16px] bg-cocoa-10 flex items-center justify-center overflow-hidden">
                                {user?.profile_photo ? (
                                    <img src={user.profile_photo} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-[36px] text-cocoa font-medium">
                                        {user?.first_name?.[0]}{user?.last_name?.[0]}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col gap-3 pt-2">
                                <label className="flex items-center gap-2 px-4 py-2 rounded-[8px] bg-white border border-cocoa-10 text-[13px] text-cocoa font-medium hover:bg-cocoa-5 cursor-pointer transition-colors">
                                    <CameraIcon className="h-4 w-4 text-cocoa-40" />
                                    <input type="file" accept="image/*" className="hidden" />
                                    Changer la photo
                                </label>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-cocoa-10 text-[11px] text-cocoa-60">
                                    <CheckIcon className="h-3 w-3 text-cocoa-40" />
                                    KYC {user?.kyc_status === 'approved' ? 'Validé' : user?.kyc_status === 'rejected' ? 'Rejeté' : 'En attente'}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button variant="primary" className="!w-[200px]">Enregistrer</Button>
                        </div>
                    </div>
                )}

                {activeTab === 'personal' && (
                    <div className="max-w-[600px] mx-auto w-full flex flex-col gap-5 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input variant="text" label="Prénom" defaultValue={user?.first_name || ''} placeholder="Votre prénom" />
                            <Input variant="text" label="Nom" defaultValue={user?.last_name || ''} placeholder="Votre nom" />
                        </div>
                        <Input variant="email" label="Email" defaultValue={user?.email || ''} placeholder="Votre email" />
                        <Input variant="text" label="Téléphone" defaultValue={user?.phone || ''} placeholder="Votre téléphone" />
                        <Input variant="text" label="Adresse" defaultValue={user?.address || ''} placeholder="Votre adresse" />
                        <div className="grid grid-cols-2 gap-4">
                            <Input variant="text" label="Ville" defaultValue={user?.city || ''} placeholder="Votre ville" />
                            <Input variant="text" label="Pays" defaultValue={user?.country || ''} placeholder="Votre pays" />
                        </div>
                        <div className="flex justify-end gap-3 mt-2">
                            <Button variant="primary" className="!w-[180px]">Mettre à jour</Button>
                        </div>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="max-w-[600px] mx-auto w-full flex flex-col gap-5 py-4">
                        <h3 className="text-[14px] text-cocoa-60 font-medium">Changer d'email ou de téléphone</h3>
                        <Input variant="email" label="Nouvel email" defaultValue={user?.email || ''} placeholder="Votre email" />
                        <Input variant="text" label="Nouveau téléphone" defaultValue={user?.phone || ''} placeholder="Votre téléphone" />
                        <Button variant="primary" className="!w-[200px] self-end">Modifier</Button>
                        
                        <div className="h-px bg-cocoa-10 my-2"></div>
                        
                        <h3 className="text-[14px] text-cocoa-60 font-medium">Changer de mot de passe</h3>
                        <Input variant="password" label="Mot de passe actuel" placeholder="Entrer votre mot de passe" />
                        <Input variant="password" label="Nouveau mot de passe" placeholder="Entrer un nouveau mot de passe" />
                        <Input variant="password" label="Confirmer" placeholder="Confirmer le nouveau mot de passe" />
                        <Button variant="primary" className="!w-[200px] self-end">Modifier le mot de passe</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FarmersProfile;
