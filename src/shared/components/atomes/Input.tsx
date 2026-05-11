import {
    type ComponentProps,
    useRef,
    useState,
    useEffect,
} from "react";

import {
    EyeCloseIcon,
    EyeIcon,
    SearchIcon,
    DocIcon
} from "../icons";

import LocationModal from "../../../features-by-actors/auth/components/modals/LocationModal";

type InputVariant =
    | "text"
    | "email"
    | "password"
    | "select"
    | "location"
    | "search"
    | "otp"
    | "file";

interface SelectOption {
    label: string;
    value: string;
}

export interface LocationValue {
    city: string;
    country: string;
    district?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    zoomLevel?: number;
}

interface InputProps
    extends ComponentProps<"input"> {
    variant?: InputVariant;
    label?: string;
    options?: SelectOption[];

    onLocationChange?: (
        value: LocationValue
    ) => void;

    onSelectChange?: (value: string) => void;

    onOtpChange?: (
        value: string
    ) => void;
}

const Input = ({
    variant = "text",
    label,
    className = "",
    options = [],
    placeholder,
    onLocationChange,
    onSelectChange,
    onOtpChange,
    ...props
}: InputProps) => {
    const [showPassword, setShowPassword] =
        useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const [showLocationModal, setShowLocationModal] =
        useState(false);

    const [selectedLocation, setSelectedLocation] =
        useState<LocationValue | null>(null);

    const [selectedOption, setSelectedOption] =
        useState<SelectOption | null>(null);

    const [otp, setOtp] = useState([
        "",
        "",
        "",
        "",
        "",
        "",
    ]);

    const otpRefs = useRef<
        (HTMLInputElement | null)[]
    >([]);

    const selectRef =
        useRef<HTMLDivElement>(null);

    const inputType =
        variant === "password"
            ? showPassword
                ? "text"
                : "password"
            : variant === "email"
                ? "email"
                : "text";

    useEffect(() => {
        const handleClickOutside = (
            event: MouseEvent
        ) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(
                    event.target as Node
                )
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const handleOtpChange = (
        value: string,
        index: number
    ) => {
        if (!/^\d?$/.test(value)) {
            return;
        }

        const newOtp = [...otp];

        newOtp[index] = value;

        setOtp(newOtp);

        onOtpChange?.(
            newOtp.join("")
        );

        if (
            value &&
            index < 5
        ) {
            otpRefs.current[
                index + 1
            ]?.focus();
        }
    };

    const handleOtpKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0
        ) {
            otpRefs.current[
                index - 1
            ]?.focus();
        }
    };

    return (
        <>
            <div className="flex flex-col gap-2 w-full relative">
                {label && (
                    <label className="text-[14px] text-cocoa-80 font-medium flex items-center gap-1">
                        {label}
                        {props.required && <span className="w-1.5 h-1.5 rounded-full bg-red shadow-sm"></span>}
                    </label>
                )}
                {!label && props.required && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red border-1 border-white z-10"></span>
                )}
                {variant === "select" ? (
                    <div
                        ref={selectRef}
                        className="relative w-full"
                    >
                        <div
                            onClick={() =>
                                setIsOpen(!isOpen)
                            }
                            className={`flex items-center bg-cocoa-5 h-11 rounded-[8px] transition-all px-3 cursor-pointer ${className}`}
                        >
                            <span
                                className={[
                                    "text-[14px]",
                                    selectedOption
                                        ? "text-black"
                                        : "text-cocoa-60",
                                ].join(" ")}
                            >
                                {selectedOption
                                    ? selectedOption.label
                                    : placeholder}
                            </span>
                        </div>

                        {isOpen && (
                            <div className="absolute top-[50px] left-0 w-full bg-white rounded-[8px] overflow-hidden z-50 shadow-md">
                                {options.map((option) => (
                                    <div
                                        key={option.value}
                                        onClick={() => {
                                            setSelectedOption(
                                                option
                                            );
                                            if (onSelectChange) {
                                                onSelectChange(option.value);
                                            }

                                            setIsOpen(false);
                                        }}
                                        className="px-3 h-11 flex items-center cursor-pointer hover:bg-cocoa-5 text-[14px]"
                                    >
                                        {option.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : variant === "location" ? (
                    <div
                        onClick={() =>
                            setShowLocationModal(true)
                        }
                        className={`flex items-center bg-cocoa-5 h-11 rounded-[8px] transition-all px-3 cursor-pointer ${className}`}
                    >
                        <span
                            className={[
                                "text-[14px]",
                                selectedLocation
                                    ? "text-black"
                                    : "text-cocoa-60",
                            ].join(" ")}
                        >
                            {selectedLocation
                                ? `${selectedLocation.city}, ${selectedLocation.country}`
                                : placeholder}
                        </span>
                    </div>
                ) : variant === "file" ? (
                    <label
                        className={`w-full h-[100px] rounded-[8px] border border-dashed border-cocoa-20 flex flex-col items-center justify-center gap-1 cursor-pointer ${className}`}
                    >
                        <input
                            {...props}
                            type="file"
                            className="hidden"
                        />

                        <DocIcon className="fill-cocoa-40" />

                        <span className="text-[14px] text-cocoa-40">
                            {placeholder}
                        </span>
                    </label>) : variant === "otp" ? (
                        <div className="flex items-center gap-2 w-full">
                            {otp.map(
                                (
                                    digit,
                                    index
                                ) => (
                                    <input
                                        key={
                                            index
                                        }
                                        ref={(
                                            el
                                        ) => {
                                            otpRefs.current[
                                                index
                                            ] =
                                                el;
                                        }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={
                                            1
                                        }
                                        value={
                                            digit
                                        }
                                        onChange={(
                                            e
                                        ) =>
                                            handleOtpChange(
                                                e
                                                    .target
                                                    .value,
                                                index
                                            )
                                        }
                                        onKeyDown={(
                                            e
                                        ) =>
                                            handleOtpKeyDown(
                                                e,
                                                index
                                            )
                                        }
                                        className="w-full h-[44px] rounded-[10px] bg-cocoa-5 outline-none text-center text-[16px] text-black"
                                    />
                                )
                            )}
                        </div>
                    ) : (
                    <div className="flex items-center bg-cocoa-5 h-11 rounded-[8px] transition-all relative">
                        <input
                            {...props}
                            type={inputType}
                            placeholder={placeholder}
                            className={`pl-3 bg-transparent outline-none w-full text-black placeholder:text-cocoa-40 text-[14px] ${variant ===
                                "search"
                                ? "pr-3"
                                : "px-3"
                                } ${className}`}
                        />

                        {variant ===
                            "search" && (
                                <div className="pr-3 flex items-center justify-center">
                                    <SearchIcon className="fill-cocoa-40 rotate-y-180" />
                                </div>
                            )}

                        {variant ===
                            "password" && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="text-cocoa-60 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                                >
                                    {showPassword ? (
                                        <EyeCloseIcon className="fill-cocoa-60" />
                                    ) : (
                                        <EyeIcon className="fill-cocoa-60" />
                                    )}
                                </button>
                            )}
                    </div>
                )}
            </div>

            {showLocationModal && (
                <LocationModal
                    close={() =>
                        setShowLocationModal(false)
                    }
                    onSubmit={(
                        location
                    ) => {
                        setSelectedLocation(
                            location
                        );

                        onLocationChange?.(
                            location
                        );

                        setShowLocationModal(
                            false
                        );
                    }}
                />
            )}
        </>
    );
};

export default Input;