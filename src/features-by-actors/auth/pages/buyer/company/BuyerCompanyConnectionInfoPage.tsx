import { useState } from "react"
import { useNavigate } from "react-router"
import AccountCreationStepLayout from "../../../layouts/AccountCreationStepLayout"
import Input from "../../../../../shared/components/atomes/Input"
import Button from "../../../../../shared/components/atomes/Button"
import { RightArrowIcon } from "../../../../../shared/components/icons"
import { useAuth } from "../../../stores/auth.store"

const BuyerCompanyConnectionInfoPage = () => {
    const navigate = useNavigate()
    const { updateUser, submitRegistration, isLoading, error: authError } = useAuth();

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const submitConnectionInfo = async () => {
        if (!email.trim() || !phone.trim() || !password.trim() || !confirmPassword.trim()) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }
        setError(null);

        updateUser({
            email,
            phone,
            password: password
        });

        const success = await submitRegistration();
        if (success) {
            navigate("/buyers/company/otp-code")
        }
    }

    return (
        <AccountCreationStepLayout actorType='buyer/company' step="connectionInfo">
            <div className="max-w-[320px] w-full flex flex-col items-start gap-8">
                <div className="flex flex-col items-start gap-1 max-w-[283px]">
                    <div className="text-[24px] leading-[28px] text-cocoa"><span className="text-cocoa-40">Veuillez remplir les informations</span> de connexion</div>
                    {(error || authError) && <div className="text-red text-[12px]">{error || authError}</div>}
                </div>
                <div className="flex flex-col gap-5 w-full">
                    <Input required variant="email" placeholder="Entrer l'email de la compagnie" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {/* Correction : un numéro de téléphone doit être en type text (ou tel) et non password */}
                    <Input required variant="text" placeholder="Numéro de téléphone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <Input required variant="password" placeholder="Entrer un mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Input required variant="password" placeholder="Confirmer le mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="w-full flex items-center justify-end">
                    <Button disabled={isLoading} onClick={() => submitConnectionInfo()} className="px-3 flex-0 text-nowrap" endIcon={<RightArrowIcon className="fill-white" />}>
                        {isLoading ? "Création..." : "Continuer"}
                    </Button>
                </div>
            </div>
        </AccountCreationStepLayout>
    )
}
export default BuyerCompanyConnectionInfoPage
