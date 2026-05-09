import { useState } from "react"
import { useNavigate } from "react-router"
import AccountCreationStepLayout from "../../../layouts/AccountCreationStepLayout"
import Input from "../../../../../shared/components/atomes/Input"
import Button from "../../../../../shared/components/atomes/Button"
import { RightArrowIcon } from "../../../../../shared/components/icons"
import { useAuth } from "../../../stores/auth.store"

const BuyerInstitutionContactInfosPage = () => {
    const navigate = useNavigate()
    const { updateBuyerProfile, buyerProfile } = useAuth()

    const [registrationNumber, setRegistrationNumber] = useState("")
    const [taxId, setTaxId] = useState("")
    const [address, setAddress] = useState("")
    const [countryOperation, setCountryOperation] = useState("")
    const [error, setError] = useState<string | null>(null);

    const submitContactInfo = () => {
        if (!registrationNumber.trim() || !taxId.trim() || !address.trim() || !countryOperation.trim()) {
            setError("Tous les champs sont requis.");
            return;
        }

        updateBuyerProfile({
            registration_number: registrationNumber,
            tax_id: taxId,
            business_address: address,
            country_of_operation: countryOperation
        })

        navigate("/buyers/institution/official-proof")
    }

    const countryOptions = [
        { label: 'Togo', value: 'TG' },
        { label: 'Ghana', value: 'GH' },
        { label: 'Bénin', value: 'BJ' },
        { label: 'Côte d\'Ivoire', value: 'CI' },
    ];

    return (
        <AccountCreationStepLayout actorType='buyer/institution' step="contactInfos">
            <div className="max-w-[320px] w-full flex flex-col items-start gap-8">
                <div className="flex flex-col items-start gap-1">
                    <img src="/farmers/contact.svg" className="h-[84px]" alt="" />
                    <div className="text-[24px] leading-[28px] text-cocoa"><span className="text-cocoa-40">Nous voulons en savoir plus sur l'institution : </span> {buyerProfile?.company_name || '...'}</div>
                    {error && <div className="text-red text-[12px]">{error}</div>}
                </div>
                <div className="flex flex-col gap-5 w-full">
                    <div className="flex h-11 gap-5 w-full">
                        <Input variant="text" placeholder="N* Enregistrement" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} />
                        <Input variant="text" placeholder="N* Tax" value={taxId} onChange={(e) => setTaxId(e.target.value)} />
                    </div>
                    <Input variant="text" placeholder="Adresse complète" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <Input variant="select" options={countryOptions} placeholder="Pays d'activité" onSelectChange={(val) => setCountryOperation(val)} />
                </div>
                <div className="w-full flex items-center justify-end">
                    <Button onClick={() => submitContactInfo()} className="px-3 flex-0 text-nowrap" endIcon={<RightArrowIcon className="fill-white" />}>Continuer</Button>
                </div>
            </div>
        </AccountCreationStepLayout>
    )
}
export default BuyerInstitutionContactInfosPage
