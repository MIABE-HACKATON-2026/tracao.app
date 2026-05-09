import { useNavigate } from "react-router"
import AuthSplitScreenLayout from "../../../../shared/layouts/AuthSplitScreenLayout"
import Button from "../../../../shared/components/atomes/Button"
import { CheckIcon } from "../../../../shared/components/icons"

const PasswordResetSuccessPage = () => {
    const navigate = useNavigate()

    return (
        <AuthSplitScreenLayout 
            title="Tout est prêt !" 
            subtitle="Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter."
        >
            <div className="flex flex-col items-center gap-11 text-center">
                <div className="flex flex-col items-center justify-center h-20 w-20 bg-roast rounded-full">
                    <CheckIcon className="h-10 w-10 fill-harvest" />
                </div>
                
                <div className="flex flex-col gap-2 items-center w-full">
                    <div className="text-[28px] leading-[34px] font-medium tracking-[0%]">C'est fait !</div>
                    <div className="text-cocoa-70 text-center">Utilisez votre nouveau mot de passe pour accéder à votre compte.</div>
                </div>

                <div className="w-full flex flex-col items-center justify-start gap-4">
                    <Button onClick={() => navigate("/login")} variant="primary">Retour à la connexion</Button>
                </div>
            </div>
        </AuthSplitScreenLayout>
    )
}

export default PasswordResetSuccessPage
