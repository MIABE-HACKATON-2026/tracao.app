import { cn } from "../../lib/utils";
import type { ComponentProps } from "react";

export default function ArrowRightIcon({ className, ...rest }: ComponentProps<"svg">) {
    return (
        <svg className={cn("size-5 fill-(--dashboard-icon-muted)", className)} {...rest} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.39289 15.9403L4.3847 14.9321L10.3168 9.00001L4.3847 3.06788L5.39289 2.05969L12.3332 9.00001L5.39289 15.9403Z" />
        </svg>
    );
}
