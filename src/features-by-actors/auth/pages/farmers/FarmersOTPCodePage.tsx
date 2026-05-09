import AccountCreationStepLayout from '../../layouts/AccountCreationStepLayout'
import Button from '../../../../shared/components/atomes/Button'
import { RightArrowIcon } from '../../../../shared/components/icons'
import { useNavigate } from 'react-router'
import Input from '../../../../shared/components/atomes/Input'

const FarmersOTPCodePage = () => {
  const navigate = useNavigate()

  const verifyOtpCode = () => {
    navigate("/farmers/otp-code")
  }

  return (
    <AccountCreationStepLayout actorType='farmer' step="otpCode">
      <div className="max-w-[320px] w-full flex flex-col items-start gap-8">
        <div className="flex flex-col items-start gap-1 max-w-[283px]">
          <img src="/farmers/verification.svg" className="h-[84px]" alt="" />
          <div className="text-[24px] leading-[28px] text-cocoa">Entrer le code OTP</div>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-2 items-start">
            <div className="text-[14px] leading-[20px] text-cocoa-40">Code OTP</div>
            <Input variant="otp" placeholder="0" />
          </div>
        </div>
        <div className="w-full flex items-center justify-end">
          <Button onClick={() => verifyOtpCode()} className="px-3 flex-0 text-nowrap" endIcon={<RightArrowIcon className="fill-white" />}>Vérifier votre compte</Button>
        </div>
      </div>
    </AccountCreationStepLayout>
  );
}

export default FarmersOTPCodePage