import { useNavigate } from "react-router"
import AccountCreationStepLayout from "../../../layouts/AccountCreationStepLayout"
import Input from "../../../../../shared/components/atomes/Input"
import Button from "../../../../../shared/components/atomes/Button"
import { RightArrowIcon } from "../../../../../shared/components/icons"

const BuyerCompanyOfficialProofPage = () => {
    const navigate = useNavigate()
    const submitProof = () => { navigate("/buyers/company/connection-info") }

  return (
      <AccountCreationStepLayout actorType='buyer/company' step="officialProof">
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
export default BuyerCompanyOfficialProofPage
