import { useState } from "react"
import { useNavigate } from "react-router"
import AccountCreationStepLayout from "../../layouts/AccountCreationStepLayout"
import Input from "../../../../shared/components/atomes/Input"
import Button from "../../../../shared/components/atomes/Button"
import { RightArrowIcon } from "../../../../shared/components/icons"
import { useAuth } from "../../stores/auth.store"

const StoresOfficialProofPage = () => {
    const navigate = useNavigate()
    const { updateBuyerProfile } = useAuth();

    const [storeName, setStoreName] = useState("");
    const [licenseFile, setLicenseFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const submitProof = () => {
        if (!storeName.trim() || !licenseFile) {
            setError("Veuillez remplir tous les champs et fournir un document officiel.");
            return;
        }
        updateBuyerProfile({
            company_name: storeName,
            import_license: licenseFile.name
        });
        navigate("/stores/connection-infos")
    }

    return (
        <AccountCreationStepLayout actorType='store' step="officialProof">
            <div className="max-w-[320px] w-full flex flex-col items-start gap-8">
                <div className="flex flex-col items-start gap-1 max-w-[283px]">
                    <div className="text-[24px] leading-[28px] text-cocoa"><span className="text-cocoa-40">Fournir une</span> preuve officielle</div>
                    {error && <div className="text-red text-[12px]">{error}</div>}
                </div>
                <div className="flex flex-col gap-5 w-full">
                    <Input required variant="text" placeholder="Nom du magasin" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
                    <Input
                        required
                        variant="file"
                        placeholder="Document légal"
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
export default StoresOfficialProofPage
