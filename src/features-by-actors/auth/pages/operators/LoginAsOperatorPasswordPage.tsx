import { Link } from "react-router"
import Button from "../../../../shared/components/atomes/Button"
import Input from "../../../../shared/components/atomes/Input"
import AuthSplitScreenLayout from "../../../../shared/layouts/AuthSplitScreenLayout"

const LoginAsOperatorPasswordPage = () => {
    const submit = () => {
        // Logique de connexion ici
    }

    return (
        <AuthSplitScreenLayout showOperator={false} title="Bonjour, Chère opérateur!" subtitle="Veuillez saisir votre mot de passe pour vous connectez.">
            <div className="flex flex-col items-center gap-11">
                <div className="flex flex-col gap-2 items-start">
                    <div className="text-[28px] leading-[34px] font-medium tracking-[0%]">Saisissez votre mot de passe</div>
                    <div className="text-cocoa-70">Entrer votre mot de passe pour accéder à vos activités.</div>
                </div>

                <div className="w-full flex flex-col gap-5">
                    <Input variant="password" placeholder="Entrer votre mot de passe" />
                </div>

                <div className="w-full flex flex-col items-center justify-start gap-4">
                    <Button onClick={submit} variant="primary">Accéder à mon compte</Button>
                    <div className="text-[14px] leading-[20px] text-cocoa-40">Pas un opérateur? <Link to="/login" className="text-black underline">Se connecter</Link></div>
                </div>
            </div>
        </AuthSplitScreenLayout>
    )
}

export default LoginAsOperatorPasswordPage
