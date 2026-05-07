import { cn } from "../../lib/utils";
import type { ComponentProps } from "react";

export default function CursorIcon({ className, ...rest }: ComponentProps<"svg">) {
    return (
        <svg className={cn("size-5 fill-(--dashboard-icon-muted)", className)} {...rest} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.89892 10.6297L7.53167 8.35106H10.9573L5.89892 4.37306V10.6297ZM10.2159 15.8076L7.60536 10.1884L4.77411 14.1418V2.0625L14.2067 9.47587H9.33598L11.9207 15.0101L10.2159 15.8076Z" />
        </svg>
    );
}
