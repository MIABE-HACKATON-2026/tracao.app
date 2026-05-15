import React from "react";
import { OpDataIcon } from "../components/agent-icons";
const DataEntry: React.FC = () => (
    <div className="w-full h-full flex flex-col gap-5">
        <div className="flex justify-between items-center">
            <div className="flex flex-col items-start gap-1"><h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Saisie données</h1><p className="text-[12px] leading-[16px] text-cocoa-60">Enregistrer une récolte ou créer un lot (offline)</p></div>
        </div>
        <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-6 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Quantité récoltée (Kg)" className="h-[48px] bg-white rounded-[12px] px-4 text-[14px] outline-none focus:ring-1 focus:ring-cocoa-20 placeholder:text-cocoa-40" />
                <input type="date" placeholder="Date de récolte" className="h-[48px] bg-white rounded-[12px] px-4 text-[14px] outline-none focus:ring-1 focus:ring-cocoa-20 placeholder:text-cocoa-40" />
                <div className="col-span-2 h-[48px] bg-white rounded-[12px] px-4 flex items-center justify-between cursor-pointer hover:border hover:border-cocoa-10">
                    <span className="text-[14px] text-cocoa-40">Sélectionner le lot (ou créer)</span>
                    <OpDataIcon className="h-4 w-4 fill-cocoa-40" />
                </div>
            </div>
            <button className="h-[48px] rounded-[12px] bg-cocoa text-white text-[14px] font-medium hover:opacity-90 cursor-pointer">Enregistrer (offline)</button>
        </div>
    </div>
);
export default DataEntry;
