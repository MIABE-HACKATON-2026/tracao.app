import { Link, useNavigate } from "react-router"
import Button from "../../../../shared/components/atomes/Button"
import Input from "../../../../shared/components/atomes/Input"
import AuthSplitScreenLayout from "../../../../shared/layouts/AuthSplitScreenLayout"
import { useState } from "react"

const LoginAsOperatorPage = () => {
    const navigate = useNavigate();
    const [chooseEmailOption, setChooseEmailOption] = useState(true);

    const handleEmailOptionSelection = (param: boolean) => {
        setChooseEmailOption(param)
    }

    const submit = () => {
        navigate("/login/as-operator/password");
    }

    return (
        <AuthSplitScreenLayout showOperator={false} title="Bonjour, Chère opérateur!" subtitle="Veuillez saisir votre email ou votre numéro de téléphone pour recevoir votre lien de connexion.">
            <div className="flex flex-col items-center gap-11">
                <div className="flex flex-col gap-2 items-start">
                    <div className="text-[28px] leading-[34px] font-medium tracking-[0%]">Ravie de vous revoir!</div>
                    <div className="text-cocoa-70">Choisissez votre canal de récupération du lien de connexion.</div>
                </div>

                <div className="w-full flex flex-col gap-5">
                    <div className="w-full h-11 bg-cocoa-5 rounded-[8px] p-1 grid grid-cols-2 gap-1">
                        <div onClick={() => handleEmailOptionSelection(true)} className={["rounded-[4px] flex items-center justify-center cursor-pointer text-[14px] leading-[20px] duration-100", chooseEmailOption ? " bg-cocoa-10 text-cocoa-80" : " bg-transparent text-cocoa-40 hover:bg-cocoa-5"].join(" ")}>Email</div>
                        <div onClick={() => handleEmailOptionSelection(false)} className={["rounded-[4px] flex items-center justify-center cursor-pointer text-[14px] leading-[20px] duration-100", !chooseEmailOption ? " bg-cocoa-10 text-cocoa-80" : " bg-transparent text-cocoa-40 hover:bg-cocoa-5"].join(" ")}>Téléphone</div>
                    </div>
                    {chooseEmailOption ? <Input required variant="email" placeholder="Entrer votre email opérateur" /> : <Input required variant="text" placeholder="Saississez votre numéro" />}
                </div>

                <div className="w-full flex flex-col items-center justify-start gap-4">
                    <Button onClick={submit} variant="primary">Recevoir lien de connexion</Button>
                    <div className="text-[14px] leading-[20px] text-cocoa-40">Pas un opérateur? <Link to="/login" className="text-black underline">Se connecter</Link></div>
                </div>
            </div>
        </AuthSplitScreenLayout>
    )
}

export default LoginAsOperatorPage