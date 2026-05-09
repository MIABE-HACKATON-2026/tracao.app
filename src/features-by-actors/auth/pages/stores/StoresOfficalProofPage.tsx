import AccountCreationStepLayout from '../../layouts/AccountCreationStepLayout'
import Input from '../../../../shared/components/atomes/Input'
import { useNavigate } from 'react-router'
import { RightArrowIcon } from '../../../../shared/components/icons'
import Button from '../../../../shared/components/atomes/Button'

const StoresOfficalProofPage = () => {
    const navigate = useNavigate()

    const submitOfficialProof = () => {
        navigate("/stores/connection-infos")
    }

    return (
        <AccountCreationStepLayout actorType='store' step="officialProof">
            <div className="max-w-[320px] w-full flex flex-col items-start gap-8">
                <div className="flex flex-col items-start gap-1">
                    <img src="/farmers/contact.svg" className="h-[84px]" alt="" />
                    <div className="text-[24px] leading-[28px] text-cocoa"><span className="text-cocoa-40">Veuilez remplir ses informations</span> pour confirmer votre légitimité</div>
                </div>
                <div className="flex flex-col gap-5 w-full">
                    <Input variant="text" placeholder="Nom du magasin" />
                    <Input variant="file" placeholder='Document légal' />
                </div>
                <div className="w-full flex items-center justify-end">
                    <Button onClick={() => submitOfficialProof()} className="px-3 w-38.5!" endIcon={<RightArrowIcon className="fill-white" />}>Continuer</Button>
                </div>
            </div>
        </AccountCreationStepLayout>
    )
}

export default StoresOfficalProofPage