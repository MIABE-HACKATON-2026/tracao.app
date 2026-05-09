import { useNavigate } from "react-router"
import AccountCreationStepLayout from "../../../layouts/AccountCreationStepLayout"
import Button from "../../../../../shared/components/atomes/Button"
import { RightArrowIcon, UserIcon } from "../../../../../shared/components/icons"

const BuyerIndividualProfilVerificationPage = () => {
    const navigate = useNavigate()

    const submitProfilVerification = () => {
        navigate("/buyers/individual/otp-code")
    }

  return (
      <AccountCreationStepLayout actorType='buyer/individual' step="profilVerification">
          <div className="max-w-[320px] w-full flex flex-col items-start gap-8">
              <div className="flex flex-col items-start gap-1 max-w-[283px]">
                  <img src="/farmers/verification.svg" className="h-[84px]" alt="" />
                  <div className="text-[24px] leading-[28px] text-cocoa">Profil & vérification</div>
              </div>
              <div className="flex flex-col gap-5 w-full">
                  <div className="flex flex-col gap-2 items-start">
                      <div className="text-[14px] leading-[20px] text-cocoa-40">Photo de profil</div>
                      <div className="h-20 w-30 rounded-[8px] flex flex-col items-center justify-center cursor-pointer hover:bg-cocoa-10 bg-cocoa-5 duration-200"><UserIcon className='h-9 w-9 fill-cocoa-20' /></div>
                  </div>
                  <div className="flex flex-col gap-2 items-start">
                      <div className="text-[14px] leading-[20px] text-cocoa-40">Carte d’identité (CNI)</div>
                      <div className="flex gap-3">
                          <div className="h-20 w-30 rounded-[8px] flex flex-col items-center justify-center cursor-pointer hover:bg-cocoa-10 bg-cocoa-5 duration-200"><img src="/farmers/recto.png" alt="" /><div className="text-cocoa-30 text-[10px] leading-[20px]">Choisir le <span className="text-cocoa-50">recto</span></div></div>
                          <div className="h-20 w-30 rounded-[8px] flex flex-col items-center justify-center cursor-pointer hover:bg-cocoa-10 bg-cocoa-5 duration-200"><img src="/farmers/verso.png" alt="" /><div className="text-cocoa-30 text-[10px] leading-[20px]">Choisir le <span className="text-cocoa-50">verso</span></div></div>
                      </div>
                  </div>
              </div>
              <div className="w-full flex items-center justify-end">
                  <Button onClick={() => submitProfilVerification()} className="px-3 flex-0 text-nowrap" endIcon={<RightArrowIcon className="fill-white" />}>Créer votre compte</Button>
              </div>
          </div>
      </AccountCreationStepLayout>
  )
}

export default BuyerIndividualProfilVerificationPage