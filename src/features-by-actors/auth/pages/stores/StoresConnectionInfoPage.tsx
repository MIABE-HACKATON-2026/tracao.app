import AccountCreationStepLayout from '../../layouts/AccountCreationStepLayout'
import Input from '../../../../shared/components/atomes/Input'
import { RightArrowIcon } from '../../../../shared/components/icons'
import Button from '../../../../shared/components/atomes/Button'
import { useNavigate } from 'react-router'

const StoresConnectionInfoPage = () => {
    const navigate = useNavigate()

    const submitConnectionInfo = () => {
        navigate("/stores/otp-code")
    }
  return (
      <AccountCreationStepLayout actorType='store' step="connectionInfo">
          <div className="max-w-[320px] w-full flex flex-col items-start gap-8">
              <div className="flex flex-col items-start gap-1">
                  <img src="/farmers/contact.svg" className="h-[84px]" alt="" />
                  <div className="text-[24px] leading-[28px] text-cocoa"><span className="text-cocoa-40">Veuilez remplir les informations</span> de connexion</div>
              </div>
              <div className="flex flex-col gap-5 w-full">
                  <Input variant="email" placeholder="Entrer l'email du magasin" />
                  <Input variant="text" placeholder="Numéro de téléphone" />
                  <Input variant="password" placeholder="Entrer un mot de passe" />
                  <Input variant="password" placeholder="Confirmer le mot de passe" />
              </div>
              <div className="w-full flex items-center justify-end">
                  <Button onClick={() => submitConnectionInfo()} className="px-3 flex-0 text-nowrap" endIcon={<RightArrowIcon className="fill-white" />}>Continuer</Button>
              </div>
          </div>
      </AccountCreationStepLayout>
  )
}

export default StoresConnectionInfoPage