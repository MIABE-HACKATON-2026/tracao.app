import { useState } from "react"
import ModalsLayout from "../../../../shared/layouts/ModalsLayout"
import { buyerCategory } from "../../constants/account-choice"
import { useAuth } from "../../stores/auth.store"
import type { BuyerType } from "../../../buyers/types/buyer-profile"

const BuyerCategoryModal = ({ showModal, continueToSubrole }: { showModal: (param: boolean) => void, continueToSubrole: (param: boolean) => void }) => {
    const [buyers, setBuyers] = useState(buyerCategory)
    const [selectedBuyerId, setSelectedBuyerId] = useState(1)
    const { setBuyerType } = useAuth()

    // console.log(selectedBuyerId)

    const handleSelect = (index: number) => {
        const updateBuyers = buyers.map(b => {
            if (index === b.id) setSelectedBuyerId(index)
            return ({
                ...b,
                isSelected: index === b.id
            })
        });

        setBuyers(updateBuyers)
    }

    const continueSubrole = () => {
        const selected = buyers.find((b) => b.id === selectedBuyerId);
        let bType: BuyerType = 'individual';
        if (selected?.id === 2) bType = 'company';
        if (selected?.id === 3) bType = 'institution';

        setBuyerType(bType);

        showModal(false)
        continueToSubrole(true)
    }

    return (
        <>
            <ModalsLayout toggleModal={() => { showModal(false); }}>
                <div className="w-[329px] rounded-[16px] p-4 flex flex-col gap-5 bg-white">
                    <div className="text-[12px] text-cocoa">Quels genre d’entité êtes-vous ?</div>
                    <div className="w-full flex flex-col gap-3">
                        {
                            buyers.map(b => {
                                return (
                                    <div onClick={() => handleSelect(b.id)} key={b.id} className={["h-11 w-full px-3 rounded-[8px] flex items-center justify-between cursor-pointer bg-cocoa-5", b.isSelected ? "border border-cocoa" : ""].join(" ")}>
                                        <div className={["text-[12px] leading-[20px]", b.isSelected ? "text-cocoa-80" : "text-cocoa-40"].join(' ')}>{b.label}</div>
                                        <div className={["h-4 w-4 border p-[2px] rounded-full", b.isSelected ? "border-cocoa" : "border-cocoa-40"].join(' ')}>
                                            {b.isSelected && <div className="h-full w-full bg-cocoa rounded-full"></div>}
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="w-full flex items-center justify-end">
                        <div onClick={() => continueSubrole()} className="px-4 h-11 rounded-[28px] bg-black text-white flex items-center justify-center text-[14px] leading-[20px] cursor-pointer">Continuer</div>
                    </div>
                </div>
            </ModalsLayout>
        </>
    )
}

export default BuyerCategoryModal
