import { cn } from "../../lib/utils";
import type { ComponentProps } from "react";

export default function MenuIcon({ className, ...rest }: ComponentProps<"svg">) {
    return (
        <svg className={cn("size-6 fill-cocoa", className)} {...rest} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H20V18H4V16Z" fill="currentColor"/>
        </svg>
    );
}
