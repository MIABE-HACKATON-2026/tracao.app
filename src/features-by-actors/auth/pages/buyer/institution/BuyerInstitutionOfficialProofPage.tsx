import { useState } from "react"
import { useNavigate } from "react-router"
import AccountCreationStepLayout from "../../../layouts/AccountCreationStepLayout"
import Input from "../../../../../shared/components/atomes/Input"
import Button from "../../../../../shared/components/atomes/Button"
import { RightArrowIcon } from "../../../../../shared/components/icons"
import { useAuth } from "../../../stores/auth.store"

const BuyerInstitutionOfficialProofPage = () => {
    const navigate = useNavigate()
    const { user, updateBuyerProfile } = useAuth();

    // Déterminer s'il est importateur ou exportateur
    const isImporter = user.sub_role === 'importateur';

    const [licenseFile, setLicenseFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const submitProof = () => {
        if (!licenseFile) {
            setError("Veuillez fournir un document officiel.");
            return;
        }

        // Sauvegarder la licence dans le profil acheteur
        if (isImporter) {
            updateBuyerProfile({ import_license: licenseFile.name });
        } else {
            updateBuyerProfile({ export_license: licenseFile.name });
        }

        navigate("/buyers/institution/connection-info")
    }

    return (
        <AccountCreationStepLayout actorType='buyer/institution' step="officialProof">
            <div className="max-w-[320px] w-full flex flex-col items-start gap-8">
                <div className="flex flex-col items-start gap-1 max-w-[283px]">
                    <div className="text-[24px] leading-[28px] text-cocoa"><span className="text-cocoa-40">Fournir une</span> preuve officielle</div>
                    {error && <div className="text-red text-[12px]">{error}</div>}
                </div>
                <div className="flex flex-col gap-5 w-full">
                    <Input
                        variant="file"
                        placeholder={isImporter ? "Licence d'importation" : "Licence d'exportation"}
                        onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                                setLicenseFile(e.target.files[0]);
                            }
                        }}
                    />
                </div>
                <div className="w-full flex items-center justify-end">
                    <Button onClick={() => submitProof()} className="px-3 flex-0 text-nowrap" endIcon={<RightArrowIcon className="fill-white" />}>Continuer</Button>
                </div>
            </div>
        </AccountCreationStepLayout>
    )
}
export default BuyerInstitutionOfficialProofPage
