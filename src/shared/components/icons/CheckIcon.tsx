import { cn } from "../../lib/utils";
import type { ComponentProps } from "react";

export default function CheckIcon({ className, ...rest }: ComponentProps<"svg">) {
    return (
        <svg className={cn("size-5 fill-(--dashboard-icon-muted)", className)} {...rest} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.1625 13.2403L3.16162 9.23943L3.96337 8.4375L7.1625 11.6366L14.0366 4.7625L14.8384 5.56443L7.1625 13.2403Z" />
        </svg>
    );
}
