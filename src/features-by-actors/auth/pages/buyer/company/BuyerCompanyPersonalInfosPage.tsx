import { useNavigate } from "react-router"
import AccountCreationStepLayout from "../../../layouts/AccountCreationStepLayout"
import Input from "../../../../../shared/components/atomes/Input"
import Button from "../../../../../shared/components/atomes/Button"
import { RightArrowIcon } from "../../../../../shared/components/icons"

const BuyerCompanyPersonalInfosPage = () => {
    const navigate = useNavigate()
    const submitPersonalInfo = () => { navigate("/buyers/company/contact-infos") }

  return (
      <AccountCreationStepLayout actorType='buyer/company' step="companyPersonalInfos">
          <div className="max-w-[320px] w-full flex flex-col items-start gap-8">
              <div className="flex flex-col items-start gap-1 max-w-[283px]">
                  <img src="/farmers/personal.svg" className="h-[84px]" alt="" />
                  <div className="text-[24px] leading-[28px] text-cocoa"><span className="text-cocoa-40">Entrer les</span> informations de la société</div>
              </div>
              <div className="flex flex-col gap-5 w-full">
                  <Input variant="text" placeholder="Nom de la société" />
                  <Input variant="location" placeholder="Choisir la situation géographique" />
              </div>
              <div className="w-full flex items-center justify-end">
                  <Button onClick={() => submitPersonalInfo()} className="px-3 flex-0 text-nowrap" endIcon={<RightArrowIcon className="fill-white" />}>Continuer</Button>
              </div>
          </div>
      </AccountCreationStepLayout>
  )
}
export default BuyerCompanyPersonalInfosPage
