import React from 'react'
import FarmerStepMarkers from '../components/molecules/FarmerStepMarkers'
import StoreStepMarkers from '../components/molecules/StoreStepMarkers';
import { Link } from 'react-router';
import BuyerIndividualStepMarkers from '../components/molecules/BuyerIndividualStepMarkers';
import BuyerCompanyStepMarkers from '../components/molecules/BuyerCompanyStepMarkers';
import BuyerInstitutionStepMarkers from '../components/molecules/BuyerInstitutionStepMarkers';

export type ActorType =
    | "farmer"
    | "store"
    | "buyer/institution"
    | "buyer/company"
    | "buyer/individual";

export type FarmerSteps =
    | "personalInfos"
    | "contactInfos"
    | "profilVerification"
    | "otpCode";

export type StoreSteps =
    | "personalInfos"
    | "officialProof"
    | "connectionInfo"
    | "otpCode";

export type BuyerIndividualSteps =
    | "individualInfo"
    | "contactInfos"
    | "profilVerification"
    | "otpCode";

export type BuyerCompanySteps =
    | "companyPersonalInfos"
    | "contactInfos"
    | "officialProof"
    | "connectionInfo"
    | "otpCode";

export type BuyerInstitutionSteps =
    | "institutionPersonalInfos"
    | "contactInfos"
    | "officialProof"
    | "connectionInfo"
    | "otpCode";

type ActorStepsMap = {
    farmer: FarmerSteps;
    store: StoreSteps;
    "buyer/institution": BuyerInstitutionSteps;
    "buyer/company": BuyerCompanySteps;
    "buyer/individual": BuyerIndividualSteps;
};

interface AccountCreationStepLayoutProps<T extends ActorType> {
    actorType: T;

    step: ActorStepsMap[T];

    children: React.ReactNode;
}


const AccountCreationStepLayout = <T extends ActorType>({ actorType, step, children }: AccountCreationStepLayoutProps<T>) => {
    const landingURL = import.meta.env.VITE_LANDING_URL ? import.meta.env.VITE_LANDING_URL : 'http://localhost:5173'
    return (
        <div className='w-full h-screen grid grid-cols-[256px_1fr]'>
            <div className="flex flex-col items-start justify-between h-full w-full p-4">
                <Link to={landingURL}><img src="/logo.svg" alt="" /> </Link>
                {actorType === "farmer" && <FarmerStepMarkers step={step as FarmerSteps} />}
                {actorType === "store" && <StoreStepMarkers step={step as StoreSteps} />}
                {actorType === "buyer/individual" && <BuyerIndividualStepMarkers step={step as BuyerIndividualSteps} />}
                {actorType === "buyer/company" && <BuyerCompanyStepMarkers step={step as BuyerCompanySteps} />}
                {actorType === "buyer/institution" && <BuyerInstitutionStepMarkers step={step as BuyerInstitutionSteps} />}
                <div className=""></div>
            </div>
            <div className="w-full h-full flex items-center justify-start pl-[224px]">{children}</div>
        </div>
    )
}

export default AccountCreationStepLayout