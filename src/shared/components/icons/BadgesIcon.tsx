import { cn } from "../../lib/utils";
import type { ComponentProps } from "react";

export default function BadgesIcon({ className, ...rest }: ComponentProps<"svg">) {
    return (
        <svg className={cn("size-5 fill-(--dashboard-icon-muted)", className)} {...rest} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.45045 16.725V11.3698L2.92932 7.2L5.96101 2.175H12.039L15.0707 7.2L12.5308 11.4073V16.725L9.00001 15.5265L5.45045 16.725ZM6.42545 15.3403L9.00001 14.4836L11.5558 15.3403V12.15H6.42545V15.3403ZM6.51338 3.15L4.05713 7.2L6.51338 11.25H11.4866L13.9429 7.2L11.4866 3.15H6.51338ZM8.21251 9.78319L5.92932 7.5L6.61876 6.81057L8.21251 8.40432L11.3813 5.21682L12.0707 5.90625L8.21251 9.78319Z" />
        </svg>
    );
}
