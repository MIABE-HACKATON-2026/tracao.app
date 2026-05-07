import { type ComponentProps } from "react";
import { useState } from "react";
import { EyeCloseIcon, EyeIcon } from "../icons";

type InputVariant = "text" | "email" | "password";

interface InputProps extends ComponentProps<"input"> {
    variant?: InputVariant;
    label?: string;
}

const Input = ({
    variant = "text",
    label,
    className = "",
    ...props
}: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);


    const inputType =
        variant === "password"
            ? showPassword
                ? "text"
                : "password"
            : variant;

    return (
        <div className="flex flex-col gap-2 w-full relative">
            <div className="flex items-center bg-cocoa-5 h-11 rounded-[8px] transition-all">
                <input
                    {...props}
                    type={inputType}
                    className={`bg-transparent outline-none w-full text-black placeholder:text-cocoa-40 px-3 text-[14px] ${className}`}
                />

                {variant === "password" && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-cocoa-60 absolute bg-transparente top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                    >
                        {showPassword ? <EyeCloseIcon className="fill-cocoa-60" /> : <EyeIcon className="fill-cocoa-60" />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Input;