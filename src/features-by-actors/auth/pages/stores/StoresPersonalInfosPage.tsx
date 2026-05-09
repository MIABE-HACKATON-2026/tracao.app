import { useState } from "react"
import { useNavigate } from "react-router"
import AccountCreationStepLayout from "../../layouts/AccountCreationStepLayout"
import Input, { type LocationValue } from "../../../../shared/components/atomes/Input"
import Button from "../../../../shared/components/atomes/Button"
import { RightArrowIcon } from "../../../../shared/components/icons"
import { useAuth } from "../../stores/auth.store"

const StoresPersonalInfosPage = () => {
    const navigate = useNavigate()
    const { updateUser } = useAuth()

    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [location, setLocation] = useState<LocationValue | null>(null)
    const [error, setError] = useState<string | null>(null)

    const submitPersonalInfo = () => {
        if (!lastName.trim() || !firstName.trim() || !location?.city || !location?.country || !location?.latitude) {
            setError("Veuillez sélectionner une localisation valide suggérée par la recherche.");
            return;
        }
        updateUser({
            first_name: firstName,
            last_name: lastName,
            city: location.city,
            country: location.country,
            address: location.address,
            latitude: location.latitude,
            longitude: location.longitude
        })
        navigate("/stores/official-proof")
    }

    return (
        <AccountCreationStepLayout actorType='store' step="personalInfos">
            <div className="max-w-[320px] w-full flex flex-col items-start gap-8">
                <div className="flex flex-col items-start gap-1 max-w-[283px]">
                    <img src="/farmers/personal.svg" className="h-[84px]" alt="" />
                    <div className="text-[24px] leading-[28px] text-cocoa"><span className="text-cocoa-40">Entrer les</span> informations du magasin</div>
                    {error && <div className="text-red text-[12px]">{error}</div>}
                </div>
                <div className="flex flex-col gap-5 w-full">
                    <div className="flex h-11 gap-5 w-full">
                        <Input required variant="text" placeholder="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <Input required variant="text" placeholder="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <Input required variant="location" placeholder="Choisir la situation géographique" onLocationChange={(loc) => setLocation(loc)} />
                </div>
                <div className="w-full flex items-center justify-end">
                    <Button onClick={() => submitPersonalInfo()} className="px-3 flex-0 text-nowrap" endIcon={<RightArrowIcon className="fill-white" />}>Continuer</Button>
                </div>
            </div>
        </AccountCreationStepLayout>
    )
}
export default StoresPersonalInfosPage
