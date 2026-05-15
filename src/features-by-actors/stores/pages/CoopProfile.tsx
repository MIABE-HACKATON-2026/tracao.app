import React from "react";
import { StoreProfileIcon } from "../stores/stores-icons";
import { DocIcon, DownloadIcon } from "../../../shared/components/icons";

import { useStoresStore } from "../stores/stores.store";
import { useSession } from "../../auth/stores/session.store";

const CoopProfile: React.FC = () => {
    const { store, fetchStore, updateStore, isLoading } = useStoresStore();
    const { user } = useSession();

    React.useEffect(() => {
        fetchStore();
    }, [fetchStore]);

    if (isLoading) return <div className="p-8 text-cocoa-40">Chargement...</div>;

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Profil Magasin</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Informations et documents de votre magasin</p>
                </div>
            </div>

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-6 overflow-y-auto flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-[16px] bg-cocoa flex items-center justify-center">
                        <StoreProfileIcon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-[18px] text-cocoa font-medium">{store?.name || "Ma Coopérative"}</h2>
                        <span className="text-[12px] text-cocoa-40">Magasin enregistrée</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-[12px] p-4 flex flex-col gap-4">
                        <span className="text-[12px] text-cocoa-20 font-medium uppercase">Informations générales</span>
                        <div className="flex flex-col gap-3">
                            {[
                                { label: "Nom du magasin", value: store?.name || "—" },
                                { label: "Statut", value: store?.status === 'approved' ? 'Approuvé' : 'En attente' },
                                { label: "Localisation", value: store?.user_details?.city || "—" },
                                { label: "Contact", value: store?.user_details?.phone || "—" },
                            ].map((f, i) => (
                                <div key={i} className="flex justify-between items-center py-2 border-b border-cocoa-5">
                                    <span className="text-[13px] text-cocoa-40">{f.label}</span>
                                    <span className="text-[13px] text-cocoa font-medium">{f.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-[12px] p-4 flex flex-col gap-4">
                        <span className="text-[12px] text-cocoa-20 font-medium uppercase">Document légal</span>
                        <div className="flex-1 flex flex-col items-center justify-center gap-4">
                            <DocIcon className="h-12 w-12 text-cocoa-20" />
                            <span className="text-[12px] text-cocoa-40 text-center">Document d'enregistrement<br/>du magasin</span>
                            <button 
                                className="h-[38px] px-5 rounded-full bg-cocoa-5 text-[12px] text-cocoa font-medium hover:bg-cocoa-10 flex items-center gap-2 transition-colors cursor-pointer"
                                onClick={() => store?.legal_document && window.open(store.legal_document, '_blank')}
                            >
                                <DownloadIcon className="h-4 w-4" />
                                Voir le document
                            </button>
                            <label className="text-[11px] text-cocoa-40 underline underline-offset-4 decoration-cocoa-10 cursor-pointer hover:text-cocoa transition-colors">
                                Re-uploader un document
                                <input 
                                    type="file" 
                                    className="hidden" 
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const formData = new FormData();
                                            formData.append('legal_document', file);
                                            await updateStore(formData as any);
                                        }
                                    }} 
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[12px] p-4 flex flex-col gap-4">
                    <span className="text-[12px] text-cocoa-20 font-medium uppercase">Responsable</span>
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { label: "Prénom", value: user?.first_name || "—" },
                            { label: "Nom", value: user?.last_name || "—" },
                            { label: "Téléphone", value: user?.phone || "—" },
                        ].map((f, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <span className="text-[11px] text-cocoa-40">{f.label}</span>
                                <span className="text-[13px] text-cocoa font-medium">{f.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoopProfile;
