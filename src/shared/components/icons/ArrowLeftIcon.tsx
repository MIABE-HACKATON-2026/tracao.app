import { cn } from "../../lib/utils";
import type { ComponentProps } from "react";

export default function ArrowLeftIcon({ className, ...rest }: ComponentProps<"svg">) {
    return (
        <svg className={cn("size-5 fill-(--dashboard-icon-muted)", className)} {...rest} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.9403 15.8806L5 8.94031L11.9403 2L12.9485 3.00819L7.01619 8.94031L12.9485 14.8724L11.9403 15.8806Z" />
        </svg>
    );
}
