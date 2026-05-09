import React from "react";

type ModalsLayoutProps = {
  children: React.ReactNode;
  props?: React.ComponentProps<"div">;
  toggleModal: () => void;
};

const ModalsLayout = ({
  children,
  props,
  toggleModal,
}: ModalsLayoutProps) => {
  return (
    <div
      {...props}
      className={`w-full bg-cocoa-40 flex items-center justify-center fixed z-1000 inset-0 ${props?.className || ""
        }`}
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;

        toggleModal();
      }}
    >
      {children}
    </div>
  );
};

export default ModalsLayout;