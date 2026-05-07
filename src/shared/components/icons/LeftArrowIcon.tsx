import { cn } from "../../lib/utils";
import type { ComponentProps } from "react";

export default function LeftArrowIcon({ className, ...rest }: ComponentProps<"svg">) {
    return (
        <svg className={cn("size-5 fill-(--dashboard-icon-muted)", className)} {...rest} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.46401 13.2403L3.22351 9L7.46401 4.75969L8.25432 5.57306L5.38989 8.4375H14.7765V9.5625H5.38989L8.25432 12.4269L7.46401 13.2403Z" />
        </svg>
    );
}
