import React from "react";
import Button from "../../../shared/components/atomes/Button";
import Input from "../../../shared/components/atomes/Input";
import { useSession } from "../../auth/stores/session.store";

const ProcessorProfile: React.FC = () => {
    const { user } = useSession();

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-start">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Mon profil</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Gérez vos informations</p>
                </div>
            </div>

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-8 flex flex-col items-center gap-8 overflow-y-auto">
                <div className="flex items-center gap-5">
                    <div className="w-[90px] h-[90px] rounded-[16px] bg-cocoa flex items-center justify-center text-white text-[28px] font-medium">
                        {user?.first_name?.[0]}{user?.last_name?.[0]}
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[18px] text-cocoa font-medium">{user?.first_name} {user?.last_name}</h2>
                        <span className="text-[13px] text-cocoa-40">Transformateur</span>
                    </div>
                </div>

                <div className="max-w-[600px] w-full flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-4">
                        <Input variant="text" label="Prénom" defaultValue={user?.first_name} placeholder="Votre prénom" />
                        <Input variant="text" label="Nom" defaultValue={user?.last_name} placeholder="Votre nom" />
                    </div>
                    <Input variant="email" label="Email" defaultValue={user?.email || ''} placeholder="Votre email" />
                    <Input variant="text" label="Téléphone" defaultValue={user?.phone || ''} placeholder="Votre téléphone" />
                    <div className="h-px bg-cocoa-10 my-2"></div>
                    <h3 className="text-[14px] text-cocoa-60 font-medium">Sécurité</h3>
                    <Input variant="password" label="Nouveau mot de passe" placeholder="Entrer un mot de passe" />
                    <Input variant="password" label="Confirmer" placeholder="Confirmer" />
                    <div className="flex justify-end gap-3 mt-2">
                        <Button variant="primary" className="!w-[180px]">Enregistrer</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProcessorProfile;
