import { cn } from "../../lib/utils";
import type { ComponentProps } from "react";

export default function FilterIcon({ className, ...rest }: ComponentProps<"svg">) {
    return (
        <svg className={cn("size-5 fill-(--dashboard-icon-muted)", className)} {...rest} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.40907 12.675V11.7H10.5836V12.675H7.40907ZM4.80301 9.4875V8.5125H13.1899V9.4875H4.80301ZM3.07501 6.3V5.325H14.925V6.3H3.07501Z" />
        </svg>
    );
}
