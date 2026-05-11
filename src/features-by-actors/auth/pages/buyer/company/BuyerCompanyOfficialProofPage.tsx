import { useState, useRef } from "react"
import { useNavigate } from "react-router"
import AccountCreationStepLayout from "../../../layouts/AccountCreationStepLayout"
import Button from "../../../../../shared/components/atomes/Button"
import { RightArrowIcon, UploadImageIcon } from "../../../../../shared/components/icons"
import { useAuth } from "../../../stores/auth.store"

const BuyerCompanyOfficialProofPage = () => {
    const navigate = useNavigate()
    const { user, setFile, error: authError } = useAuth();

    // Déterminer s'il est importateur ou exportateur
    const isImporter = user.sub_role === 'importateur';

    const [licenseFile, setLicenseFile] = useState<File | null>(null);
    const [localError, setLocalError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const submitProof = () => {
        if (!licenseFile) {
            setLocalError("Veuillez fournir un document officiel.");
            return;
        }

        // Sauvegarder dans le store pour upload après OTP
        setFile('license', licenseFile);

        navigate("/buyers/company/connection-info")
    }

    return (
        <AccountCreationStepLayout actorType='buyer/company' step="officialProof">
            <div className="max-w-[320px] w-full flex flex-col items-start gap-8">
                <div className="flex flex-col items-start gap-1 max-w-[283px]">
                    <div className="text-[24px] leading-[28px] text-cocoa"><span className="text-cocoa-40">Fournir une</span> preuve officielle</div>
                    {(authError || localError) && <div className="text-red text-[12px]">{authError || localError}</div>}
                </div>
                <div className="flex flex-col gap-5 w-full">
                    <div className="flex flex-col gap-2 items-start">
                        <div className="text-[14px] leading-[20px] text-cocoa-40">
                            {isImporter ? "Licence d'importation" : "Licence d'exportation"}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setLicenseFile(e.target.files[0]);
                                    setLocalError(null);
                                }
                            }}
                        />
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className={`w-full min-h-[120px] border-2 border-dashed rounded-[12px] flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${licenseFile ? 'border-green bg-green/5' : 'border-cocoa-10 bg-cocoa-5 hover:bg-cocoa-10'
                                }`}
                        >
                            <UploadImageIcon className={`w-8 h-8 mb-2 ${licenseFile ? 'text-green' : 'text-cocoa-30'}`} />
                            <div className="text-[12px] text-center px-4">
                                {licenseFile ? (
                                    <span className="text-green font-medium">{licenseFile.name}</span>
                                ) : (
                                    <span className="text-cocoa-40">Cliquez pour importer votre document</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex items-center justify-end">
                    <Button onClick={() => submitProof()} className="px-3 flex-0 text-nowrap" endIcon={<RightArrowIcon className="fill-white" />}>Continuer</Button>
                </div>
            </div>
        </AccountCreationStepLayout>
    )
}
export default BuyerCompanyOfficialProofPage
