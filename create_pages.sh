#!/bin/bash
DIR_COMP="src/features-by-actors/auth/pages/buyer/company"
DIR_INST="src/features-by-actors/auth/pages/buyer/institution"

cat << 'PAGE' > $DIR_INST/BuyerInstitutionPersonalInfosPage.tsx
import { useNavigate } from "react-router"
import AccountCreationStepLayout from "../../../layouts/AccountCreationStepLayout"
import Input from "../../../../../shared/components/atomes/Input"
import Button from "../../../../../shared/components/atomes/Button"
import { RightArrowIcon } from "../../../../../shared/components/icons"

const BuyerInstitutionPersonalInfosPage = () => {
    const navigate = useNavigate()
    const submitPersonalInfo = () => { navigate("/buyers/institution/contact-infos") }

  return (
      <AccountCreationStepLayout actorType='buyer/institution' step="institutionPersonalInfos">
          <div className="max-w-[320px] w-full flex flex-col items-start gap-8">
              <div className="flex flex-col items-start gap-1 max-w-[283px]">
                  <img src="/farmers/personal.svg" className="h-[84px]" alt="" />
                  <div className="text-[24px] leading-[28px] text-cocoa"><span className="text-cocoa-40">Entrer les</span> informations de l'institution</div>
              </div>
              <div className="flex flex-col gap-5 w-full">
                  <Input variant="text" placeholder="Nom de l'institution" />
                  <Input variant="location" placeholder="Choisir la situation géographique" />
              </div>
              <div className="w-full flex items-center justify-end">
                  <Button onClick={() => submitPersonalInfo()} className="px-3 flex-0 text-nowrap" endIcon={<RightArrowIcon className="fill-white" />}>Continuer</Button>
              </div>
          </div>
      </AccountCreationStepLayout>
  )
}
export default BuyerInstitutionPersonalInfosPage
PAGE

cat << 'PAGE' > $DIR_INST/BuyerInstitutionContactInfosPage.tsx
import { useNavigate } from "react-router"
import AccountCreationStepLayout from "../../../layouts/AccountCreationStepLayout"
import Input from "../../../../../shared/components/atomes/Input"
import Button from "../../../../../shared/components/atomes/Button"
import { RightArrowIcon } from "../../../../../shared/components/icons"

const BuyerInstitutionContactInfosPage = () => {
    const navigate = useNavigate()
    const submitContactInfo = () => { navigate("/buyers/institution/official-proof") }

  return (
      <AccountCreationStepLayout actorType='buyer/institution' step="contactInfos">
          <div className="max-w-[320px] w-full flex flex-col items-start gap-8">
              <div className="flex flex-col items-start gap-1 max-w-[283px]">
                  <div className="text-[24px] leading-[28px] text-cocoa"><span className="text-cocoa-40">Entrer les</span> informations de contact</div>
              </div>
              <div className="flex flex-col gap-5 w-full">
                  <Input variant="text" placeholder="Email" />
                  <Input variant="text" placeholder="Téléphone" />
              </div>
              <div className="w-full flex items-center justify-end">
                  <Button onClick={() => submitContactInfo()} className="px-3 flex-0 text-nowrap" endIcon={<RightArrowIcon className="fill-white" />}>Continuer</Button>
              </div>
          </div>
      </AccountCreationStepLayout>
  )
}
export default BuyerInstitutionContactInfosPage
PAGE

cat << 'PAGE' > $DIR_INST/BuyerInstitutionOfficialProofPage.tsx
import { useNavigate } from "react-router"
import AccountCreationStepLayout from "../../../layouts/AccountCreationStepLayout"
import Input from "../../../../../shared/components/atomes/Input"
import Button from "../../../../../shared/components/atomes/Button"
import { RightArrowIcon } from "../../../../../shared/components/icons"

const BuyerInstitutionOfficialProofPage = () => {
    const navigate = useNavigate()
    const submitProof = () => { navigate("/buyers/institution/connection-info") }

  return (
      <AccountCreationStepLayout actorType='buyer/institution' step="officialProof">
          <div className="max-w-[320px] w-full flex flex-col items-start gap-8">
              <div className="flex flex-col items-start gap-1 max-w-[283px]">
                  <div className="text-[24px] leading-[28px] text-cocoa"><span className="text-cocoa-40">Fournir une</span> preuve officielle</div>
              </div>
              <div className="flex flex-col gap-5 w-full">
                  <Input variant="file" placeholder="Télécharger le document" />
              </div>
              <div className="w-full flex items-center justify-end">
                  <Button onClick={() => submitProof()} className="px-3 flex-0 text-nowrap" endIcon={<RightArrowIcon className="fill-white" />}>Continuer</Button>
              </div>
          </div>
      </AccountCreationStepLayout>
  )
}
export default BuyerInstitutionOfficialProofPage
PAGE

cat << 'PAGE' > $DIR_INST/BuyerInstitutionConnectionInfoPage.tsx
import { useNavigate } from "react-router"
import AccountCreationStepLayout from "../../../layouts/AccountCreationStepLayout"
import Input from "../../../../../shared/components/atomes/Input"
import Button from "../../../../../shared/components/atomes/Button"
import { RightArrowIcon } from "../../../../../shared/components/icons"

const BuyerInstitutionConnectionInfoPage = () => {
    const navigate = useNavigate()
    const submitConnectionInfo = () => { navigate("/buyers/institution/otp-code") }

  return (
      <AccountCreationStepLayout actorType='buyer/institution' step="connectionInfo">
          <div className="max-w-[320px] w-full flex flex-col items-start gap-8">
              <div className="flex flex-col items-start gap-1 max-w-[283px]">
                  <div className="text-[24px] leading-[28px] text-cocoa"><span className="text-cocoa-40">Entrer les</span> informations de connexion</div>
              </div>
              <div className="flex flex-col gap-5 w-full">
                  <Input variant="password" placeholder="Mot de passe" />
                  <Input variant="password" placeholder="Confirmer le mot de passe" />
              </div>
              <div className="w-full flex items-center justify-end">
                  <Button onClick={() => submitConnectionInfo()} className="px-3 flex-0 text-nowrap" endIcon={<RightArrowIcon className="fill-white" />}>Continuer</Button>
              </div>
          </div>
      </AccountCreationStepLayout>
  )
}
export default BuyerInstitutionConnectionInfoPage
PAGE

cat << 'PAGE' > $DIR_INST/BuyerInstitutionOTPCodePage.tsx
import { useNavigate } from "react-router"
import AccountCreationStepLayout from "../../../layouts/AccountCreationStepLayout"
import Input from "../../../../../shared/components/atomes/Input"
import Button from "../../../../../shared/components/atomes/Button"
import { RightArrowIcon } from "../../../../../shared/components/icons"

const BuyerInstitutionOTPCodePage = () => {
    const navigate = useNavigate()
    const submitOtp = () => { navigate("/") }

  return (
      <AccountCreationStepLayout actorType='buyer/institution' step="otpCode">
          <div className="max-w-[320px] w-full flex flex-col items-start gap-8">
              <div className="flex flex-col items-start gap-1 max-w-[283px]">
                  <div className="text-[24px] leading-[28px] text-cocoa"><span className="text-cocoa-40">Entrer le</span> code OTP</div>
              </div>
              <div className="flex flex-col gap-5 w-full">
                  <Input variant="text" placeholder="Code OTP" />
              </div>
              <div className="w-full flex items-center justify-end">
                  <Button onClick={() => submitOtp()} className="px-3 flex-0 text-nowrap" endIcon={<RightArrowIcon className="fill-white" />}>Terminer</Button>
              </div>
          </div>
      </AccountCreationStepLayout>
  )
}
export default BuyerInstitutionOTPCodePage
PAGE
