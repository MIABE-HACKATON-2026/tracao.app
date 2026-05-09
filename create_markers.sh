#!/bin/bash
DIR_COMPONENTS="src/features-by-actors/auth/components/molecules"

cat << 'MARKER' > $DIR_COMPONENTS/BuyerCompanyStepMarkers.tsx
import { useEffect, useState } from "react"
import { CheckIcon } from "../../../../shared/components/icons"
import type { BuyerCompanySteps } from "../../layouts/AccountCreationStepLayout"

interface StepValidation {
  id: number;
  step: Partial<BuyerCompanySteps>;
  Label: string;
  status: 'validate' | 'current' | 'incomming' | 'otpCode'
}

const BuyerCompanyStepMarkers = ({ step }: { step: BuyerCompanySteps }) => {
  const [steps, setSteps] = useState<StepValidation[]>([
    {
      id: 1,
      Label: "Infos de la société",
      step: "companyPersonalInfos",
      status: "incomming",
    },
    {
      id: 2,
      Label: "Contact",
      step: "contactInfos",
      status: "incomming",
    },
    {
      id: 3,
      Label: "Preuve officielle",
      step: "officialProof",
      status: "incomming",
    },
    {
      id: 4,
      Label: "Infos de connection",
      step: "connectionInfo",
      status: "incomming",
    },
    {
      id: 5,
      Label: "",
      step: "otpCode",
      status: "incomming",
    }
  ]);

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
      <div className="text-cocoa-70 text-[12px] leading-[18px]" >Compte acheteur : Société</div>
      <div className="flex flex-col items-start gap-4">
        {
          steps.map(
            (s) => {
              return (
                  <div key={s.id} className="flex items-center justify-start gap-4">
                  <div className={["h-[18px] w-[18px] rounded-full flex items-center justify-center", s.status === "validate" ? "bg-roast" : s.status === "current" ? "bg-transparent border border-dashed border-cocoa-70" : "bg-transparent border border-cocoa-70"].join(' ')}>
                      {s.status === "validate" && <CheckIcon className="fill-harvest" />}
                    </div>
                  {s.Label && <div className={["text-[12px] leading-[12px] font-normal", s.status === "current" ? "text-cocoa" : "text-cocoa-70"].join(" ")}>{s.Label}</div>}
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
export default BuyerCompanyStepMarkers
MARKER

cat << 'MARKER' > $DIR_COMPONENTS/BuyerInstitutionStepMarkers.tsx
import { useEffect, useState } from "react"
import { CheckIcon } from "../../../../shared/components/icons"
import type { BuyerInstitutionSteps } from "../../layouts/AccountCreationStepLayout"

interface StepValidation {
  id: number;
  step: Partial<BuyerInstitutionSteps>;
  Label: string;
  status: 'validate' | 'current' | 'incomming' | 'otpCode'
}

const BuyerInstitutionStepMarkers = ({ step }: { step: BuyerInstitutionSteps }) => {
  const [steps, setSteps] = useState<StepValidation[]>([
    {
      id: 1,
      Label: "Infos de l'institution",
      step: "institutionPersonalInfos",
      status: "incomming",
    },
    {
      id: 2,
      Label: "Contact",
      step: "contactInfos",
      status: "incomming",
    },
    {
      id: 3,
      Label: "Preuve officielle",
      step: "officialProof",
      status: "incomming",
    },
    {
      id: 4,
      Label: "Infos de connection",
      step: "connectionInfo",
      status: "incomming",
    },
    {
      id: 5,
      Label: "",
      step: "otpCode",
      status: "incomming",
    }
  ]);

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
      <div className="text-cocoa-70 text-[12px] leading-[18px]" >Compte acheteur : Institution</div>
      <div className="flex flex-col items-start gap-4">
        {
          steps.map(
            (s) => {
              return (
                  <div key={s.id} className="flex items-center justify-start gap-4">
                  <div className={["h-[18px] w-[18px] rounded-full flex items-center justify-center", s.status === "validate" ? "bg-roast" : s.status === "current" ? "bg-transparent border border-dashed border-cocoa-70" : "bg-transparent border border-cocoa-70"].join(' ')}>
                      {s.status === "validate" && <CheckIcon className="fill-harvest" />}
                    </div>
                  {s.Label && <div className={["text-[12px] leading-[12px] font-normal", s.status === "current" ? "text-cocoa" : "text-cocoa-70"].join(" ")}>{s.Label}</div>}
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
export default BuyerInstitutionStepMarkers
MARKER
