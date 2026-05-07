import { Link } from "react-router"
import AuthSplitScreenLayout from "../../../shared/layouts/AuthSplitScreenLayout"
import Input from "../../../shared/components/atomes/Input"
import Button from "../../../shared/components/atomes/Button"
import GoogleIcon from "../../../shared/components/icons/GoogleIcon"

const LoginPage = () => {
    return (
        <AuthSplitScreenLayout title="Bonjour, Bienvenue !" subtitle="Entrez vos informations pour accéder aux fonctionnalités qu’offre notre plateforme et  profitez-en!">
            <div className="flex flex-col items-center gap-11">
                <div className="flex flex-col gap-2 items-start">
                    <div className="text-[28px] leading-[34px] font-medium tracking-[0%]">Ravie de vous revoir!</div>
                    <div className="text-cocoa-70">Vous n’avez pas de compte? <Link to="/register" className="!text-black underline">Créez-en</Link> un gratuitement.</div>
                </div>
                <div className="w-full flex flex-col gap-5">
                    <Input variant="email" placeholder="example@gmail.com" />
                    <Input variant="password" placeholder="Entrer votre mot de passe" />
                </div>

                <div className="w-full flex flex-col items-center justify-start gap-4">
                    <Button variant="primary">Se connecter</Button>
                    <Button startIcon={<GoogleIcon />} variant="google">Continuer avec google</Button>
                    <div className="text-[14px] leading-[20px] text-cocoa-40">Mot de passe oublié? <Link to="/reset-password" className="text-black underline">Changer</Link></div>
                </div>
            </div>
        </AuthSplitScreenLayout>
    )
}

export default LoginPage
