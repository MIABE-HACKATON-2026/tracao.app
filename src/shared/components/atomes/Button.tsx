import { type ButtonHTMLAttributes, type ReactNode } from "react";
type ButtonVariant = "primary" | "google";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    loading?: boolean;
}

const Button = ({
    children,
    variant = "primary",
    startIcon,
    endIcon,
    loading = false,
    className = "",
    disabled,
    ...props
}: ButtonProps) => {
    const variants = {
        primary:
            "bg-black text-white hover:opacity-90",

        google:
            "bg-white text-black border border-black hover:bg-black-5",
    };

    return (
        <button
            {...props}
            disabled={disabled || loading}
            className={`
        flex items-center justify-center gap-2
        h-11 rounded-full
        font-normal transition-all cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        text-[14px] leading-[20px]
        w-full
        ${variants[variant]}
        ${className}
      `}
        >
            {loading ? (
                <div className="flex items-centr justify-center gap-1">
                    <div className="animate-pulse h-2 w-2 rounded-full bg-black-80"></div>
                    <div className="animate-pulse h-2 w-2 rounded-full bg-black-50"></div>
                    <div className="animate-pulse h-2 w-2 rounded-full bg-black-20"></div>
                </div>
            ) : (
                <>
                    {startIcon && startIcon}

                    <span >{children}</span>

                    {endIcon && endIcon}
                </>
            )}
        </button>
    );
};

export default Button;