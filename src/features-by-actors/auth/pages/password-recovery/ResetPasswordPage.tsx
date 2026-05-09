import { useNavigate } from "react-router"
import AuthSplitScreenLayout from "../../../../shared/layouts/AuthSplitScreenLayout"
import Input from "../../../../shared/components/atomes/Input"
import Button from "../../../../shared/components/atomes/Button"

const ResetPasswordPage = () => {
    const navigate = useNavigate()

    const handleSubmit = () => {
        // En vrai ici on mettrait à jour le mot de passe via le backend
        navigate("/reset-password/success")
    }

    return (
        <AuthSplitScreenLayout 
            title="Nouveau mot de passe" 
            subtitle="Créez un nouveau mot de passe sécurisé pour votre compte."
        >
            <div className="flex flex-col items-center gap-11">
                <div className="flex flex-col gap-2 items-start w-full">
                    <div className="text-[28px] leading-[34px] font-medium tracking-[0%]">Réinitialisation</div>
                    <div className="text-cocoa-70">Définissez votre nouveau mot de passe.</div>
                </div>
                
                <div className="w-full flex flex-col gap-5">
                    <Input required variant="password" placeholder="Nouveau mot de passe" />
                    <Input required variant="password" placeholder="Confirmer le mot de passe" />
                </div>

                <div className="w-full flex flex-col items-center justify-start gap-4">
                    <Button onClick={handleSubmit} variant="primary">Réinitialiser</Button>
                </div>
            </div>
        </AuthSplitScreenLayout>
    )
}

export default ResetPasswordPage
