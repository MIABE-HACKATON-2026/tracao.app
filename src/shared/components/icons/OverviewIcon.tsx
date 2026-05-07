import { cn } from "../../lib/utils";
import type { ComponentProps } from "react";

export default function OverviewIcon({ className, ...rest }: ComponentProps<"svg">) {
    return (
        <svg className={cn("size-5 fill-(--dashboard-icon-muted)", className)} {...rest} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.7722 14.025V9.74719H15.825V14.025H11.7722ZM7.72224 8.25282V3.97501H15.825V8.25282H7.72224ZM2.17505 14.025V9.74719H10.2779V14.025H2.17505ZM2.17505 8.25282V3.97501H6.22786V8.25282H2.17505ZM8.69705 7.27801H14.85V4.95001H8.69705V7.27801ZM3.15005 13.05H9.30305V10.722H3.15005V13.05ZM12.747 13.05H14.85V10.722H12.747V13.05ZM3.15005 7.27801H5.25305V4.95001H3.15005V7.27801Z" />
        </svg>
    );
}
