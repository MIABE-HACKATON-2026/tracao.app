import React from "react";
import { AddIcon, CheckIcon, IDCardIcon, IDCardBackIcon } from "../../../shared/components/icons";
import Button from "../../../shared/components/atomes/Button";
import { useSession } from "../../auth/stores/session.store";

const FarmersKYC: React.FC = () => {
    const { user } = useSession();
    const [frontFile, setFrontFile] = React.useState<File | null>(null);
    const [backFile, setBackFile] = React.useState<File | null>(null);

    const kycStatus = user?.kyc_status || 'pending';

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-start">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Vérification KYC</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Soumettez votre pièce d'identité pour valider votre compte</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-cocoa-10 text-[12px] text-cocoa-60">
                    <CheckIcon className="h-3.5 w-3.5" />
                    KYC {kycStatus === 'approved' ? 'Validé' : kycStatus === 'rejected' ? 'Rejeté' : 'En attente'}
                </div>
            </div>

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-8 flex flex-col gap-8 overflow-y-auto">
                <div className="flex flex-col gap-2">
                    <h2 className="text-[15px] text-cocoa font-medium">Documents requis</h2>
                    <p className="text-[12px] text-cocoa-40">Veuillez fournir le recto et le verso de votre pièce d'identité nationale (CNI) ou passeport.</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <label className="flex flex-col items-center justify-center gap-4 p-8 rounded-[12px] border-2 border-dashed border-cocoa-20 bg-white cursor-pointer hover:bg-cocoa-5 hover:border-cocoa-40 transition-colors">
                        <input type="file" accept="image/*" className="hidden" onChange={e => setFrontFile(e.target.files?.[0] || null)} />
                        {frontFile ? (
                            <div className="flex flex-col items-center gap-2">
                                <IDCardIcon className="h-12 w-12 text-cocoa-40" />
                                <span className="text-[13px] text-cocoa font-medium">{frontFile.name}</span>
                                <span className="text-[11px] text-cocoa-40">{(frontFile.size / 1024 / 1024).toFixed(1)} Mo</span>
                            </div>
                        ) : (
                            <>
                                <IDCardIcon className="h-14 w-14 text-cocoa-20" />
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-[13px] text-cocoa font-medium">Recto de la CNI</span>
                                    <span className="text-[11px] text-cocoa-40">Cliquez pour choisir le fichier</span>
                                </div>
                                <div className="h-8 w-8 rounded-[8px] bg-cocoa-10 flex items-center justify-center">
                                    <AddIcon className="h-4 w-4 fill-cocoa-40" />
                                </div>
                            </>
                        )}
                    </label>

                    <label className="flex flex-col items-center justify-center gap-4 p-8 rounded-[12px] border-2 border-dashed border-cocoa-20 bg-white cursor-pointer hover:bg-cocoa-5 hover:border-cocoa-40 transition-colors">
                        <input type="file" accept="image/*" className="hidden" onChange={e => setBackFile(e.target.files?.[0] || null)} />
                        {backFile ? (
                            <div className="flex flex-col items-center gap-2">
                                <IDCardBackIcon className="h-12 w-12 text-cocoa-40" />
                                <span className="text-[13px] text-cocoa font-medium">{backFile.name}</span>
                                <span className="text-[11px] text-cocoa-40">{(backFile.size / 1024 / 1024).toFixed(1)} Mo</span>
                            </div>
                        ) : (
                            <>
                                <IDCardBackIcon className="h-14 w-14 text-cocoa-20" />
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-[13px] text-cocoa font-medium">Verso de la CNI</span>
                                    <span className="text-[11px] text-cocoa-40">Cliquez pour choisir le fichier</span>
                                </div>
                                <div className="h-8 w-8 rounded-[8px] bg-cocoa-10 flex items-center justify-center">
                                    <AddIcon className="h-4 w-4 fill-cocoa-40" />
                                </div>
                            </>
                        )}
                    </label>
                </div>

                <div className="flex justify-end gap-3 mt-2">
                    <Button variant="primary" className="!w-[200px]" disabled={!frontFile || !backFile}>
                        Soumettre le KYC
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FarmersKYC;
