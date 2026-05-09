import AccountCreationStepLayout from '../../layouts/AccountCreationStepLayout'
import Button from '../../../../shared/components/atomes/Button'
import Input from '../../../../shared/components/atomes/Input'
import { useNavigate } from 'react-router'
import { RightArrowIcon } from '../../../../shared/components/icons'

const FarmersContactInfosPage = () => {
    const navigate = useNavigate()

    const submitContactInfo = () => {
        navigate("/farmers/profil-verification")
    }

  return (
      <AccountCreationStepLayout actorType='farmer' step="contactInfos">
          <div className="max-w-[320px] w-full flex flex-col items-start gap-8">
              <div className="flex flex-col items-start gap-1 max-w-[283px]">
                  <img src="/farmers/contact.svg" className="h-[84px]" alt="" />
                  <div className="text-[24px] leading-[28px] text-cocoa"><span className="text-cocoa-40">Entrer vos</span> informations de contact</div>
              </div>
              <div className="flex flex-col gap-5 w-full">
                  <Input variant="email" placeholder="Entrer votre email " />
                  <Input variant="text" placeholder="Numéro de téléphone" />
                  <Input variant="password" placeholder="Entrer un mot de passe" />
                  <Input variant="password" placeholder="Confirmer le mot de passe" />
              </div>
              <div className="w-full flex items-center justify-end">
                  <Button onClick={() => submitContactInfo()} className="px-3 w-38.5!" endIcon={<RightArrowIcon className="fill-white" />}>Continuer</Button>
              </div>
          </div>
      </AccountCreationStepLayout>
  )
}

export default FarmersContactInfosPage