import { cn } from "../../lib/utils";
import type { ComponentProps } from "react";

export default function AddIcon({ className, ...rest }: ComponentProps<"svg">) {
    return (
        <svg className={cn("size-5 fill-(--dashboard-icon-muted)", className)} {...rest} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.4375 9.5625H4.125V8.4375H8.4375V4.125H9.5625V8.4375H13.875V9.5625H9.5625V13.875H8.4375V9.5625Z" />
        </svg>
    );
}
