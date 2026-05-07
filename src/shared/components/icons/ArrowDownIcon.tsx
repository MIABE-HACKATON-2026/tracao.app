import { cn } from "../../lib/utils";
import type { ComponentProps } from "react";

export default function ArrowDownIcon({ className, ...rest }: ComponentProps<"svg">) {
    return (
        <svg className={cn("size-5 fill-(--dashboard-icon-muted)", className)} {...rest} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.00002 11.2903L4.7597 7.05L5.55002 6.25969L9.00002 9.70969L12.45 6.25969L13.2403 7.05L9.00002 11.2903Z" />
        </svg>
    );
}
