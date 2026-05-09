import { useState } from "react";

import { CheckIcon } from "../../../shared/components/icons";
import Button from "../../../shared/components/atomes/Button";
import { Link, useNavigate } from "react-router";
import BuyerCategoryModal from "../components/modals/BuyerCategoryModal";
import { accountChoice } from "../contants/account-choice";
import BuyerTypeModal from "../components/modals/BuyerTypeModal";

const ChoiceAccountType = () => {
    const navigate = useNavigate()
    const [accounts, setAccounts] = useState(accountChoice);
    const [selectedAccountId, setSelectedAccountId] = useState(1);
    const [isShowModal, setIsShowModal] = useState(false)
    const [selectBuyerType, setSelectBuyerType] = useState(false)
    const handleSelect = (index: number) => {
        const updatedAccounts = accounts.map((account) => {
            setSelectedAccountId(index)
            return ({
            ...account,
            isSelected: account.id === index,
        })});

        setAccounts(updatedAccounts);
    };

    const continueSignup = () => {

        if (selectedAccountId === 1) {
            setIsShowModal(false)
            navigate("/farmers/personals-info")
        } else if (selectedAccountId === 2) {
            setIsShowModal(true)
        } else if (selectedAccountId === 3) {
            setIsShowModal(false)
            navigate("/stores/personals-info")
        }
    }

    const selectBuyerTypeFunc = (param: boolean) => {
        if (param) {
            setSelectBuyerType(true)
        } else {
            setIsShowModal(false)
        }
    }

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-[64px] relative">
            {isShowModal && <BuyerCategoryModal showModal={(param) => setIsShowModal(param)} continueToSubrole={(param) => selectBuyerTypeFunc(param)} />}
            {selectBuyerType && <BuyerTypeModal showModal={(param) => setSelectBuyerType(param)} finish={(param) => selectBuyerTypeFunc(param)} />}
            <img src="./hero-pattern.svg" className="absolute inset-0 w-full h-full object-cover z-0" alt="" />

            <div className="flex flex-col gap-3 items-center justify-start">
                <div className="text-black text-[28px] leading-[34px] font-medium">
                    Quels type de compte aimeriez-vous créer ?
                </div>

                <div className="text-cocoa-70 text-[14px] leading-[20px] font-normal">
                    Veuillez choisir un type de compte pour continuer
                </div>
            </div>

            <div className="w-[946px] h-100 gap-6 grid grid-cols-3">
                {accounts.map((ac) => {
                    return (
                        <div
                            key={ac.title}
                            onClick={() => handleSelect(ac.id)}
                            className={[
                                "rounded-[8px] duration-100 relative cursor-pointer flex flex-col items-start justify-end pb-10 pr-4",
                                ac.isSelected
                                    ? "bg-roast text-harvest-60"
                                    : "bg-cocoa-5 hover:bg-cocoa-10",
                            ].join(" ")}
                        >
                            <div
                                className={[
                                    "h-10 w-10 border-2 flex items-center justify-center rounded-full absolute top-3 right-3",
                                    ac.isSelected
                                        ? "border-harvest"
                                        : "border-cocoa",
                                ].join(" ")}
                            >
                                {ac.isSelected && (
                                    <CheckIcon className="fill-harvest" />
                                )}
                            </div>

                            <div className="flex flex-col items-start gap-[17px]">
                                <img
                                    src={
                                        ac.isSelected
                                            ? ac.activeIllustration
                                            : ac.illustration
                                    }
                                    alt={ac.title}
                                />

                                <div className="flex flex-col pl-10 gap-[8px]">
                                    <div
                                        className={[
                                            "text-[16px] font-normal leading-[20px]",
                                            ac.isSelected
                                                ? "text-harvest"
                                                : "text-cocoa",
                                        ].join(" ")}
                                    >
                                        {ac.title}
                                    </div>

                                    <div
                                        className={[
                                            "text-[12px] font-normal leading-[14px]",
                                            ac.isSelected
                                                ? "text-harvest-60"
                                                : "text-cocoa-60",
                                        ].join(" ")}
                                    >
                                        {ac.subtitle}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="w-[300px] flex flex-col items-center justify-start gap-4 relative z-100">
                <Button onClick={continueSignup} variant="primary">Continuer</Button>
                <div className="text-[14px] leading-[20px] text-cocoa-40">Avez vous un compte?  <Link to="/login" className="text-black underline">Se connecter</Link></div>
            </div>
        </div>
    );
};

export default ChoiceAccountType;