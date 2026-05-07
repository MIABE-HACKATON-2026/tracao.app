import { cn } from "../../lib/utils";
import type { ComponentProps } from "react";

export default function FlagIcon({ className, ...rest }: ComponentProps<"svg">) {
    return (
        <svg className={cn("size-5 fill-(--dashboard-icon-muted)", className)} {...rest} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.125 16.125V2.625H15.375L13.839 6.10106L15.375 9.57694H5.25V16.125H4.125ZM5.25 8.45194H13.6746L12.6159 6.10106L13.6746 3.75H5.25V8.45194Z" />
        </svg>
    );
}
