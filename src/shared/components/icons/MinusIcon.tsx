import { cn } from "../../lib/utils";
import type { ComponentProps } from "react";

export default function MinusIcon({ className, ...rest }: ComponentProps<"svg">) {
    return (
        <svg className={cn("size-5 fill-(--dashboard-icon-muted)", className)} {...rest} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.75 9.75V8.25H14.25V9.75H3.75Z" />
        </svg>
    );
}
