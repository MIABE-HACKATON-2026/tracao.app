import { cn } from "../../lib/utils";
import type { ComponentProps } from "react";

export default function PlayIcon({ className, ...rest }: ComponentProps<"svg">) {
    return (
        <svg className={cn("size-5 fill-(--dashboard-icon-muted)", className)} {...rest} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.375 13.572V4.42799L13.5576 8.99999L6.375 13.572ZM7.5 11.5125L11.4519 8.99999L7.5 6.48749V11.5125Z" />
        </svg>
    );
}
