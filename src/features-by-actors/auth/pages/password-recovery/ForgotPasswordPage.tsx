import { Link, useNavigate } from "react-router"
import AuthSplitScreenLayout from "../../../../shared/layouts/AuthSplitScreenLayout"
import Input from "../../../../shared/components/atomes/Input"
import Button from "../../../../shared/components/atomes/Button"

const ForgotPasswordPage = () => {
    const navigate = useNavigate()

    const handleSubmit = () => {
        // En vrai ici on enverrait l'email au backend
        navigate("/reset-password/form")
    }

    return (
        <AuthSplitScreenLayout 
            title="Mot de passe oublié ?" 
            subtitle="Ne vous inquiétez pas ! Entrez votre adresse e-mail pour recevoir les instructions de réinitialisation."
        >
            <div className="flex flex-col items-center gap-11">
                <div className="flex flex-col gap-2 items-start w-full">
                    <div className="text-[28px] leading-[34px] font-medium tracking-[0%]">Récupération</div>
                    <div className="text-cocoa-70">Saisissez votre e-mail pour continuer.</div>
                </div>
                
                <div className="w-full flex flex-col gap-5">
                    <Input required variant="email" placeholder="votre-email@exemple.com" />
                </div>

                <div className="w-full flex flex-col items-center justify-start gap-4">
                    <Button onClick={handleSubmit} variant="primary">Envoyer le lien</Button>
                    <div className="text-[14px] leading-[20px] text-cocoa-40">
                        Vous vous en souvenez ? <Link to="/login" className="text-black underline">Se connecter</Link>
                    </div>
                </div>
            </div>
        </AuthSplitScreenLayout>
    )
}

export default ForgotPasswordPage
