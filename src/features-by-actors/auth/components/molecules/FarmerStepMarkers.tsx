import { useEffect, useState } from "react"
import { CheckIcon } from "../../../../shared/components/icons"
import type { FarmerSteps } from "../../layouts/AccountCreationStepLayout"

interface StepValidation {
  id: number;
  step: Partial<FarmerSteps>;
  Label: string;
  status: 'validate' | 'current' | 'incomming' | 'otpCode'
}
const FarmerStepMarkers = ({ step }: { step: FarmerSteps }) => {
  const [steps, setSteps] = useState<StepValidation[]>([
    {
      id: 1,
      Label: "Infos personnelles",
      step: "personalInfos",
      status: "incomming"
    }, {
      id: 2,
      Label: "Infos de Contact",
      step: "contactInfos",
      status: "incomming"
    }, {
      id: 3,
      Label: "Profil & vérification",
      step: "profilVerification",
      status: "incomming"
    },
    {
      id: 4,
      Label: "Profil & vérification",
      step: "otpCode",
      status: "incomming"
    },
  ])

  const [currentStep] = useState(steps.find(s => s.step === step)!)

  const handleSteps = () => {
    const updateSteps: StepValidation[] = []
    for (const step of steps) {
      if (step.step === currentStep.step && step.step !== "otpCode") {
        updateSteps.push(
          {
            ...step,
            status: "current"
          }
        )
        continue;
      } else if (step.step !== "otpCode") {
        if (step.id < currentStep.id) {
          updateSteps.push(
            {
              ...step,
              status: "validate"
            }
          )
        } else {
          updateSteps.push(step)
        }
      }

    }
    setSteps(updateSteps)

  }

  useEffect(() => {
    handleSteps()
  }, [])

  return (
    <div className="flex flex-col items-start gap-2.5">
      <div className="text-cocoa-70 text-[12px] leading-[18px]" >Compte agriculteur</div>
      <div className="flex flex-col items-start gap-4">
        {
          steps.map(
            (s) => {
              return (
                  <div key={s.id} className="flex items-center justify-start gap-4">
                  <div className={["h-[18px] w-[18px] rounded-full flex items-center justify-center", s.status === "validate" ? "bg-roast" : s.status === "current" ? "bg-transparent border border-dashed border-cocoa-70" : "bg-transparent border border-cocoa-70"].join(' ')}>
                      {s.status === "validate" && <CheckIcon className="fill-harvest" />}
                    </div>
                  <div className={["text-[12px] leading-[12px] font-normal", s.status === "current" ? "text-cocoa" : "text-cocoa-70"].join(" ")}>{s.Label}</div>
                  </div>
              );
            }
          )
        }
      </div>
      {step === "otpCode" && <div className="text-cocoa-70 text-[12px] leading-[18px] max-w-[210px] text-[12px] leading-[20px]" >Maintenant veuillez saisir le <br /><span className="text-cocoa">code OTP</span> qui vous a été envoyé
        par mail <span className="text-cocoa">pour vérifier votre compte</span> </div> }
    </div>
  )
}

export default FarmerStepMarkers