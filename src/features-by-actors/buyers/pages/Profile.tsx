import React from "react";
import Button from "../../../shared/components/atomes/Button";
import Input from "../../../shared/components/atomes/Input";
import { useSession } from "../../auth/stores/session.store";

const BuyerProfile: React.FC = () => {
    const { user } = useSession();

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-start">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Mon profil</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Informations professionnelles</p>
                </div>
            </div>

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-8 flex flex-col gap-8 overflow-y-auto">
                <div className="flex items-center gap-5">
                    <div className="w-[90px] h-[90px] rounded-[16px] bg-cocoa flex items-center justify-center text-white text-[28px] font-medium">
                        {user?.first_name?.[0]}{user?.last_name?.[0]}
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[18px] text-cocoa font-medium">{user?.first_name} {user?.last_name}</h2>
                        <span className="text-[13px] text-cocoa-40">Acheteur · Exportateur</span>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-[11px] mt-1 bg-cocoa-10 text-cocoa-60">
                            KYC {user?.kyc_status === 'approved' ? 'Validé' : 'En attente'}
                        </div>
                    </div>
                </div>

                <div className="max-w-[700px] w-full mx-auto flex flex-col gap-5">
                    <h3 className="text-[14px] text-cocoa font-medium">Identité</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Input variant="text" label="Prénom" defaultValue={user?.first_name} placeholder="Votre prénom" />
                        <Input variant="text" label="Nom" defaultValue={user?.last_name} placeholder="Votre nom" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input variant="email" label="Email" defaultValue={user?.email || ''} placeholder="Votre email" />
                        <Input variant="text" label="Téléphone" defaultValue={user?.phone || ''} placeholder="Votre téléphone" />
                    </div>

                    <div className="h-px bg-cocoa-10 my-2"></div>

                    <h3 className="text-[14px] text-cocoa font-medium">Entreprise</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Input variant="text" label="Raison sociale" placeholder="Nom de l'entreprise" />
                        <Input variant="text" label="N° RC" placeholder="Numéro de registre" />
                    </div>
                    <Input variant="text" label="Adresse" placeholder="Adresse professionnelle" />
                    <Input variant="file" placeholder="Licence d'exportation (PDF)" />

                    <div className="flex justify-end gap-3 mt-2">
                        <Button variant="primary" className="!w-[180px]">Enregistrer</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyerProfile;
