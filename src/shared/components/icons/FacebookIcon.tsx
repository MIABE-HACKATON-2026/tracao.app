import { cn } from "../../lib/utils";
import type { ComponentProps } from "react";

export default function FacebookIcon({ className, ...rest }: ComponentProps<"svg">) {
    return (
        <svg className={cn("size-5 fill-(--dashboard-icon-muted)", className)} {...rest} width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.34475 10.0485L9.86301 6.81553H6.621V4.71751C6.621 3.83302 7.07386 2.97087 8.52598 2.97087H10V0.218447C10 0.218447 8.66226 0 7.38333 0C4.7132 0 2.96804 1.54835 2.96804 4.35146V6.81553H0V10.0485H2.96804V17.8641C3.56317 17.9535 4.17315 18 4.79452 18C5.41589 18 6.02587 17.9535 6.621 17.8641V10.0485H9.34475Z" />
        </svg>
    );
}
