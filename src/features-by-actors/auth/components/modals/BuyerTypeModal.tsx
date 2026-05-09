import { useState } from "react"
import ModalsLayout from "../../../../shared/layouts/ModalsLayout"
import Input from "../../../../shared/components/atomes/Input"

const BuyerTypeModal = ({ showModal, finish }: { showModal: (param: boolean) => void, finish: (param: boolean) => void }) => {
    const submitSubrole = () => {
        showModal(false)
        finish(true)
    }

    const [buyerTypes] = useState([{ label: 'Importateur', value: 'importer' }, { label: 'Exportateur', value: 'exporter' }])

  return (
    <>
          <ModalsLayout toggleModal={() => { showModal(false);}}>
              <div className="w-[329px] rounded-[16px] p-4 flex flex-col gap-5 bg-white">
                  <div className="text-[12px] text-cocoa">Êtes-vous un importateur ou un exportateur ?</div>
                  <div className="w-full flex flex-col gap-3">
                      <Input variant="select" options={buyerTypes} placeholder="Choisissez votre sous-rôle" />
                  </div>
                  <div className="w-full flex items-center justify-end">
                      <div onClick={() => submitSubrole()} className="px-4 h-11 rounded-[28px] bg-black text-white flex items-center justify-center text-[14px] leading-[20px] cursor-pointer">Définir le sous-rôle</div>
                  </div>
              </div>
          </ModalsLayout>
    </>
  )
}

export default BuyerTypeModal
