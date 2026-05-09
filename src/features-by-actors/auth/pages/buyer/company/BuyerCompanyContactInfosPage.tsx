import { useNavigate } from "react-router"
import AccountCreationStepLayout from "../../../layouts/AccountCreationStepLayout"
import Input from "../../../../../shared/components/atomes/Input"
import Button from "../../../../../shared/components/atomes/Button"
import { RightArrowIcon } from "../../../../../shared/components/icons"

const BuyerCompanyContactInfosPage = () => {
    const navigate = useNavigate()
    const submitContactInfo = () => { navigate("/buyers/company/official-proof") }

  return (
      <AccountCreationStepLayout actorType='buyer/company' step="contactInfos">
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
export default BuyerCompanyContactInfosPage
