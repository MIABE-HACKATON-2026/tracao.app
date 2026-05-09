import { useState } from "react"
import { useNavigate } from "react-router"
import AccountCreationStepLayout from "../../../layouts/AccountCreationStepLayout"
import Input from "../../../../../shared/components/atomes/Input"
import Button from "../../../../../shared/components/atomes/Button"
import { RightArrowIcon } from "../../../../../shared/components/icons"
import { useAuth } from "../../../stores/auth.store"

const BuyerIndividualContactInfosPage = () => {
    const navigate = useNavigate()
    const { updateUser } = useAuth()

    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState<string | null>(null)

    const submitContactInfo = () => {
        if (!email.trim() || !phone.trim() || !password.trim() || !confirmPassword.trim()) {
            setError("Tous les champs de connexion sont requis.")
            return;
        }
        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.")
            return;
        }
        updateUser({ email, phone, password_hash: password })
        navigate("/buyers/individual/profil-verification")
    }

    return (
        <AccountCreationStepLayout actorType='buyer/individual' step="contactInfos">
            <div className="max-w-[320px] w-full flex flex-col items-start gap-8">
                <div className="flex flex-col items-start gap-1 max-w-[283px]">
                    <img src="/farmers/contact.svg" className="h-[84px]" alt="" />
                    <div className="text-[24px] leading-[28px] text-cocoa"><span className="text-cocoa-40">Entrer vos</span> informations de contact</div>
                    {error && <div className="text-red text-[12px]">{error}</div>}
                </div>
                <div className="flex flex-col gap-5 w-full">
                    <Input required variant="email" placeholder="Entrer votre email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input required variant="text" placeholder="Numéro de téléphone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <Input required variant="password" placeholder="Entrer un mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Input required variant="password" placeholder="Confirmer le mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="w-full flex items-center justify-end">
                    <Button onClick={() => submitContactInfo()} className="px-3 flex-0 text-nowrap" endIcon={<RightArrowIcon className="fill-white" />}>Continuer</Button>
                </div>
            </div>
        </AccountCreationStepLayout>
    )
}

export default BuyerIndividualContactInfosPage
