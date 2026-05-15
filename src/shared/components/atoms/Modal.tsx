import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    transparentContainer?: boolean; // Si vrai, ne met pas de fond blanc/arrondis sur le conteneur principal
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, transparentContainer = false }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa-40 p-4 overflow-y-auto" onClick={onClose}>
            <div 
                className={`${transparentContainer ? '' : 'bg-white rounded-[24px] shadow-2xl overflow-hidden'} w-fit max-w-[980px] relative`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
