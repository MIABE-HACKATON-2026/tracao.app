import type { ReactNode } from "react"
import { Link } from "react-router";

export interface IAuthSplitScreenText {
    title: string;
    subtitle: string;
    showOperator?: boolean 
}

type IAuthSplitScreen = IAuthSplitScreenText & {children : ReactNode}

const AuthSplitScreenLayout = ({ title, subtitle, showOperator=false, children } :  IAuthSplitScreen) => {
  return (
    <div className="w-full h-screen grid grid-cols-[1.5fr_1fr]">
          <div className="bg-roast relative px-[124px] pt-[82px]">
              <img src="./images/pattern.png" className="absolute inset-0 w-full h-full object-cover z-0" alt="" />
              <div className="w-full h-full pb-8 relative flex flex-col items-start justify-between">
                  <div className="flex flex-col gap-15 items-start">
                      <img src="./images/logo-harvest.png" alt="" />
                      <div className="text-[60px] leading-[76px] max-w-[520px] text-harvest font-semibold">{title}</div>
                      <div className="text-[20px] leading-[28px] max-w-[520px] text-harvest font-normal">{subtitle}</div>
                  </div>
                  <div className="font-normal text-harvest-40 text-[20px] leading-[28px] tracking-[0%]">2026 Tracao. Tous droits réservé.</div>                  
              </div>
          </div>
          <div className="relative flex items-center justify-center">
              <Link to="/login/as-operator" className="absolute top-4 right-4 text-[12px] text-cocoa-40 hover:text-cocoa hover:underline">Êtes-vous un opérateur?</Link>
              <div className="w-[328px] flex flex-col gap-[148px] pb-[64px]">
                  <div className="text-[28px] text-black leading-[34px] font-medium">Tracao</div>
                  <div className="">{children}</div>
              </div>
          </div>
    </div>
  )
}

export default AuthSplitScreenLayout
