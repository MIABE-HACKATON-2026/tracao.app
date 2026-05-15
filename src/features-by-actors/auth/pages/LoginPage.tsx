import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router"
import AuthSplitScreenLayout from "../../../shared/layouts/AuthSplitScreenLayout"
import Input from "../../../shared/components/atomes/Input"
import Button from "../../../shared/components/atomes/Button"
import GoogleIcon from "../../../shared/components/icons/GoogleIcon"
import { useSession } from "../stores/session.store"

/** Redirige l'utilisateur vers son espace en fonction de son rôle */
const getRoleDashboard = (role: string, sub_role?: string | null): string => {
    if (role === 'agent' && sub_role === 'inspector') return '/agents/dashboard'
    
    if (role === 'admin') {
        if (sub_role === 'gouvernement') return '/gov/dashboard'
        if (sub_role === 'certificateur') return '/cert/dashboard'
        return '/admin/dashboard'
    }

    switch (role) {
        case "farmer":      return "/farmers/dashboard"
        case "store":       return "/stores/dashboard"
        case "buyer":       return "/buyers/dashboard"
        case "agent":       return "/agents/dashboard"
        case "transporter": return "/transporters/dashboard"
        case "processor":   return "/processors/dashboard"
        default:            return "/"
    }
}

const LoginPage = () => {
    const navigate = useNavigate()
    const { login, isLoading, error, isAuthenticated, user, clearError } = useSession()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [localError, setLocalError] = useState<string | null>(null)

    // Si déjà connecté, rediriger directement
    useEffect(() => {
        if (isAuthenticated && user) {
            navigate(getRoleDashboard(user.role, user.sub_role), { replace: true })
        }
    }, [isAuthenticated, user, navigate])

    // Nettoyer l'erreur du store au démontage
    useEffect(() => {
        return () => clearError()
    }, [clearError])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLocalError(null)

        if (!email.trim()) {
            setLocalError("Veuillez saisir votre adresse email.")
            return
        }
        if (!password) {
            setLocalError("Veuillez saisir votre mot de passe.")
            return
        }

        const success = await login(email.trim(), password)

        if (success) {
            // Lire l'état frais du store après la mise à jour async
            const currentUser = useSession.getState().user
            if (currentUser) {
                navigate(getRoleDashboard(currentUser.role, currentUser.sub_role), { replace: true })
            }
        }
    }

    const displayError = localError || error

    return (
        <AuthSplitScreenLayout
            showOperator={true}
            title="Bonjour, Bienvenue !"
            subtitle="Entrez vos informations pour accéder aux fonctionnalités qu'offre notre plateforme et profitez-en!"
        >
            <form onSubmit={handleSubmit} noValidate className="flex flex-col items-center gap-11 w-full">
                <div className="flex flex-col gap-2 items-start w-full">
                    <div className="text-[28px] leading-[34px] font-medium tracking-[0%]">Ravie de vous revoir!</div>
                    <div className="text-cocoa-70">
                        Vous n'avez pas de compte?{" "}
                        <Link to="/register" className="!text-black underline">
                            Créez-en
                        </Link>{" "}
                        un gratuitement.
                    </div>
                </div>

                <div className="w-full flex flex-col gap-5">
                    <Input
                        required
                        variant="email"
                        label="Email"
                        placeholder="example@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />
                    <Input
                        required
                        variant="password"
                        label="Mot de passe"
                        placeholder="Entrer votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />

                    {displayError && (
                        <div
                            role="alert"
                            className="w-full rounded-[8px] bg-red/10 border border-red/30 px-4 py-3 text-[13px] text-red leading-snug"
                        >
                            {displayError}
                        </div>
                    )}
                </div>

                <div className="w-full flex flex-col items-center justify-start gap-4">
                    <Button
                        type="submit"
                        variant="primary"
                        loading={isLoading}
                        disabled={isLoading}
                    >
                        Se connecter
                    </Button>
                    <Button startIcon={<GoogleIcon />} variant="google" type="button" disabled={isLoading}>
                        Continuer avec google
                    </Button>
                    <div className="text-[14px] leading-[20px] text-cocoa-40">
                        Mot de passe oublié?{" "}
                        <Link to="/reset-password" className="text-black underline">
                            Changer
                        </Link>
                    </div>
                </div>
            </form>
        </AuthSplitScreenLayout>
    )
}

export default LoginPage
