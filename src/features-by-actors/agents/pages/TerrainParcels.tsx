import React from "react";
import { MapIcon } from "../../../shared/components/icons";

const TerrainParcels: React.FC = () => (
    <div className="w-full h-full flex flex-col gap-5">
        <div className="flex justify-between items-center">
            <div className="flex flex-col items-start gap-1"><h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Parcelles terrain</h1><p className="text-[12px] leading-[16px] text-cocoa-60">Parcelles créées sur le terrain</p></div>
        </div>
        <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-6 flex flex-col items-center justify-center gap-4">
            <MapIcon className="w-8 h-8 text-cocoa-40" />
            <span className="text-[14px] text-cocoa-40">Créez des parcelles en traçant le périmètre sur le terrain (GPS walk)</span>
            <button className="h-[48px] px-8 rounded-full bg-cocoa text-white text-[14px] font-medium hover:opacity-90 cursor-pointer">Démarrer le tracé GPS</button>
        </div>
    </div>
);
export default TerrainParcels;
