import { cn } from "../../lib/utils";
import type { ComponentProps } from "react";

export default function RightArrowIcon({ className, ...rest }: ComponentProps<"svg">) {
    return (
        <svg className={cn("size-5 fill-(--dashboard-icon-muted)", className)} {...rest} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.3847 13.2403L9.59419 12.4269L12.4586 9.5625H3.375V8.4375H12.4586L9.59419 5.57306L10.3847 4.75969L14.625 9L10.3847 13.2403Z" />
        </svg>
    );
}
