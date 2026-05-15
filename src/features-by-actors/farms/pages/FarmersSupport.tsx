import React from "react";
import { FarmersSupportIcon } from "../../../shared/components/icons";
import { PhoneIcon, EmailIcon, MessagingIcon } from "../../../shared/components/icons";

const FarmersSupport: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Support</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Besoin d'aide ? Contactez notre équipe</p>
                </div>
            </div>

            <div className="flex-1 w-full rounded-[16px] bg-cocoa-5 p-6 overflow-y-auto flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-[16px] p-6 flex flex-col items-center gap-4 border border-white hover:shadow-sm transition-shadow">
                        <div className="h-12 w-12 rounded-[12px] bg-cocoa-5 flex items-center justify-center">
                            <PhoneIcon className="h-6 w-6 text-cocoa" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-[14px] text-cocoa font-medium">Support téléphonique</h3>
                            <p className="text-[12px] text-cocoa-40 mt-1">Lun-Ven 8h-18h</p>
                        </div>
                        <a href="tel:+2250102030405" className="text-[14px] text-cocoa font-mono font-medium hover:underline">+225 01 02 03 04 05</a>
                    </div>

                    <div className="bg-white rounded-[16px] p-6 flex flex-col items-center gap-4 border border-white hover:shadow-sm transition-shadow">
                        <div className="h-12 w-12 rounded-[12px] bg-cocoa-5 flex items-center justify-center">
                            <EmailIcon className="h-6 w-6 text-cocoa" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-[14px] text-cocoa font-medium">Support email</h3>
                            <p className="text-[12px] text-cocoa-40 mt-1">Réponse sous 24h</p>
                        </div>
                        <a href="mailto:support@tracao.app" className="text-[14px] text-cocoa font-medium hover:underline">support@tracao.app</a>
                    </div>

                    <div className="bg-white rounded-[16px] p-6 flex flex-col items-center gap-4 border border-white hover:shadow-sm transition-shadow">
                        <div className="h-12 w-12 rounded-[12px] bg-cocoa-5 flex items-center justify-center">
                            <MessagingIcon className="h-6 w-6 text-cocoa" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-[14px] text-cocoa font-medium">Chat en direct</h3>
                            <p className="text-[12px] text-cocoa-40 mt-1">Temps réel</p>
                        </div>
                        <button className="h-[38px] px-5 rounded-[8px] bg-cocoa text-white text-[12px] font-medium hover:opacity-90 transition-opacity cursor-pointer">
                            Démarrer un chat
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-[16px] p-6 flex flex-col gap-4 border border-white">
                    <h3 className="text-[14px] text-cocoa font-medium">FAQ - Questions fréquentes</h3>
                    <div className="flex flex-col gap-2">
                        {[
                            { q: "Comment créer une parcelle ?", a: "Rendez-vous dans 'Mes parcelles' puis cliquez sur 'Créer une parcelle'. Vous pouvez tracer le périmètre sur la carte." },
                            { q: "Comment générer un QR code pour mon lot ?", a: "Les QR codes sont générés automatiquement lors de la création d'un lot. Vous les retrouvez dans la page 'Mes lots'." },
                            { q: "Que faire en cas de conflit GPS ?", a: "Contactez votre coopérative qui pourra valider ou rejeter la parcelle après vérification sur le terrain." },
                        ].map((faq, i) => (
                            <details key={i} className="group">
                                <summary className="flex items-center justify-between py-3 px-4 rounded-[8px] bg-cocoa-5 cursor-pointer hover:bg-cocoa-10 transition-colors">
                                    <span className="text-[13px] text-cocoa font-medium">{faq.q}</span>
                                    <span className="text-cocoa-20 group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="px-4 py-3 text-[12px] text-cocoa-60 leading-relaxed">{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FarmersSupport;
