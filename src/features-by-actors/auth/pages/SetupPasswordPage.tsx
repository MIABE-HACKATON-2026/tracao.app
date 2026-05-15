import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ApiClient } from "../../../shared/api/api-client";
import { CheckIcon } from "../../../shared/components/icons";

const SetupPasswordPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");
    
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [isSuccess, setIsSuccess] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }
        if (password.length < 6) {
            setError("Le mot de passe doit contenir au moins 6 caractères");
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            await ApiClient.post("/auth/set-password/", { token, password });
            setIsSuccess(true);
            setTimeout(() => navigate("/login"), 3000);
        } catch (err: any) {
            setError(err.response?.data?.error || "Une erreur est survenue");
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen bg-cocoa-5 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-[24px] shadow-sm text-center max-w-[400px]">
                    <h1 className="text-cocoa font-medium text-[20px] mb-2">Lien invalide</h1>
                    <p className="text-cocoa-60 text-[14px]">Ce lien d'invitation est manquant ou corrompu.</p>
                </div>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-cocoa-5 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-[24px] shadow-sm text-center max-w-[400px] flex flex-col items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                        <CheckIcon className="h-6 w-6 text-green-500" />
                    </div>
                    <h1 className="text-cocoa font-medium text-[20px]">Compte configuré !</h1>
                    <p className="text-cocoa-60 text-[14px]">Votre mot de passe a été défini. Vous allez être redirigé vers la page de connexion.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cocoa-5 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-[24px] shadow-sm w-full max-w-[400px] flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-cocoa font-medium text-[20px]">Configurer votre compte</h1>
                    <p className="text-cocoa-60 text-[13px]">Veuillez définir un mot de passe pour votre compte Tracao.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] text-cocoa-60 ml-1">Nouveau mot de passe</label>
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none focus:ring-1 focus:ring-cocoa-20"
                            placeholder="••••••••"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] text-cocoa-60 ml-1">Confirmer le mot de passe</label>
                        <input 
                            type="password" 
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="h-[48px] bg-cocoa-5 rounded-[12px] px-4 text-[14px] outline-none focus:ring-1 focus:ring-cocoa-20"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <p className="text-red-500 text-[12px] text-center">{error}</p>}

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="h-[48px] bg-black text-white rounded-full text-[14px] font-medium mt-2 hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                    >
                        {isLoading ? "Chargement..." : "Enregistrer et continuer"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SetupPasswordPage;
