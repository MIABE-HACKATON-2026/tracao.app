import React from "react";
import { OpFarmerIcon } from "../components/agent-icons";
import Modal from "../../../shared/components/atoms/Modal";

const CreateFarmer: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1"><h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Créer un farmer</h1><p className="text-[12px] leading-[16px] text-cocoa-60">Enregistrer un nouvel agriculteur (offline)</p></div>
            </div>
            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-6 overflow-y-auto flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Prénom" className="h-[48px] bg-white rounded-[12px] px-4 text-[14px] outline-none focus:ring-1 focus:ring-cocoa-20 placeholder:text-cocoa-40" />
                    <input type="text" placeholder="Nom" className="h-[48px] bg-white rounded-[12px] px-4 text-[14px] outline-none focus:ring-1 focus:ring-cocoa-20 placeholder:text-cocoa-40" />
                    <input type="tel" placeholder="Téléphone" className="h-[48px] bg-white rounded-[12px] px-4 text-[14px] outline-none focus:ring-1 focus:ring-cocoa-20 placeholder:text-cocoa-40" />
                    <input type="text" placeholder="Ville" className="h-[48px] bg-white rounded-[12px] px-4 text-[14px] outline-none focus:ring-1 focus:ring-cocoa-20 placeholder:text-cocoa-40" />
                    <input type="text" placeholder="Pays" className="h-[48px] bg-white rounded-[12px] px-4 text-[14px] outline-none focus:ring-1 focus:ring-cocoa-20 placeholder:text-cocoa-40" />
                    <div className="h-[48px] bg-white rounded-[12px] px-4 flex items-center">
                        <span className="text-[14px] text-cocoa-20">Cliquez sur la carte pour la position GPS</span>
                    </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-[12px]">
                    <div className="flex items-center gap-3">
                        <OpFarmerIcon className="h-5 w-5 fill-cocoa-40" />
                        <span className="text-[12px] text-cocoa-60">Mode hors-ligne : les données seront synchronisées plus tard</span>
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="h-[38px] px-6 rounded-[8px] bg-cocoa text-white text-[12px] font-medium hover:opacity-90 cursor-pointer">Enregistrer</button>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-8 flex flex-col gap-6">
                    <h2 className="text-[20px] font-medium text-cocoa">Agriculteur enregistré avec succès</h2>
                    <p className="text-[14px] text-cocoa-60">Les données ont été sauvegardées localement et seront synchronisées dès que le réseau sera disponible.</p>
                    <button onClick={() => setIsModalOpen(false)} className="h-[48px] px-8 rounded-full bg-cocoa text-white text-[14px] font-medium hover:opacity-90 self-end">OK</button>
                </div>
            </Modal>
        </div>
    );
};
export default CreateFarmer;
