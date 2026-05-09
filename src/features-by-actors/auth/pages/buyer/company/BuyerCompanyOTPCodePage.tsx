import { useNavigate } from "react-router"
import AccountCreationStepLayout from "../../../layouts/AccountCreationStepLayout"
import Input from "../../../../../shared/components/atomes/Input"
import Button from "../../../../../shared/components/atomes/Button"
import { RightArrowIcon } from "../../../../../shared/components/icons"

const BuyerCompanyOTPCodePage = () => {
    const navigate = useNavigate()
    const submitOtp = () => { navigate("/") }

  return (
      <AccountCreationStepLayout actorType='buyer/company' step="otpCode">
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
export default BuyerCompanyOTPCodePage
