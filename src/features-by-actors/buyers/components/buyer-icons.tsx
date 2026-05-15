import type { ComponentProps } from "react";

const BuyerIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>{props.children}</svg>
);

export const BuyerDashboardIcon = (props: ComponentProps<"svg">) => (
  <BuyerIcon {...props}>
    <path d="M2.25 8.25L9 2.25L15.75 8.25V15C15.75 15.4125 15.5875 15.7656 15.2625 16.0594C14.9375 16.3531 14.55 16.5 14.1 16.5H3.9C3.45 16.5 3.0625 16.3531 2.7375 16.0594C2.4125 15.7656 2.25 15.4125 2.25 15V8.25Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.75 16.5V9.75H11.25V16.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </BuyerIcon>
);

export const BuyerMarketIcon = (props: ComponentProps<"svg">) => (
  <BuyerIcon {...props}>
    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M9 5.25V9.75L11.25 11.25" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M14.25 3L12 5.25" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </BuyerIcon>
);

export const BuyerTransactionIcon = (props: ComponentProps<"svg">) => (
  <BuyerIcon {...props}>
    <path d="M2.25 9H15.75M15.75 9L12.75 6M15.75 9L12.75 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6L3 9L6 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </BuyerIcon>
);

export const BuyerTraceIcon = (props: ComponentProps<"svg">) => (
  <BuyerIcon {...props}>
    <path d="M3.75 3.75H14.25V14.25H3.75V3.75Z" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M6 9H12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M9 6V12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </BuyerIcon>
);

export const BuyerBlockchainIcon = (props: ComponentProps<"svg">) => (
  <BuyerIcon {...props}>
    <path d="M9 1.5L15.75 5.25V12.75L9 16.5L2.25 12.75V5.25L9 1.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    <path d="M9 16.5V9.75M9 9.75L2.25 6M9 9.75L15.75 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </BuyerIcon>
);

export const BuyerTransportIcon = (props: ComponentProps<"svg">) => (
  <BuyerIcon {...props}>
    <path d="M2.25 11.25V12.75C2.25 13.1625 2.5875 13.5 3 13.5H3.75C3.75 12.3375 4.5875 11.25 5.25 11.25C5.9125 11.25 6.75 12.3375 6.75 13.5H11.25C11.25 12.3375 12.0875 11.25 12.75 11.25C13.4125 11.25 14.25 12.3375 14.25 13.5H15C15.4125 13.5 15.75 13.1625 15.75 12.75V9.75L13.5 6.75H9.75V3H3C2.5875 3 2.25 3.3375 2.25 3.75V11.25Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    <circle cx="5.25" cy="13.5" r="1.125" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="12.75" cy="13.5" r="1.125" stroke="currentColor" strokeWidth="1.3"/>
  </BuyerIcon>
);

export const BuyerProfileIcon = (props: ComponentProps<"svg">) => (
  <BuyerIcon {...props}>
    <circle cx="9" cy="6.75" r="2.625" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M3.75 15.75C3.75 12.75 5.625 11.25 9 11.25C12.375 11.25 14.25 12.75 14.25 15.75" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </BuyerIcon>
);

export const BuyerComplianceIcon = (props: ComponentProps<"svg">) => (
  <BuyerIcon {...props}>
    <path d="M5.25 9L7.5 11.25L12.75 5.25" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25Z" stroke="currentColor" strokeWidth="1.3"/>
  </BuyerIcon>
);

export const BuyerScanIcon = (props: ComponentProps<"svg">) => (
  <BuyerIcon {...props}>
    <rect x="2.25" y="2.25" width="5.25" height="5.25" rx="0.75" stroke="currentColor" strokeWidth="1.3"/>
    <rect x="10.5" y="2.25" width="5.25" height="5.25" rx="0.75" stroke="currentColor" strokeWidth="1.3"/>
    <rect x="2.25" y="10.5" width="5.25" height="5.25" rx="0.75" stroke="currentColor" strokeWidth="1.3"/>
    <rect x="10.5" y="10.5" width="5.25" height="5.25" rx="0.75" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M12.375 12.375H13.875V13.875" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </BuyerIcon>
);

export const BuyerReportIcon = (props: ComponentProps<"svg">) => (
  <BuyerIcon {...props}>
    <path d="M3.75 2.25V15.75H14.25" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.75 12L9 9L11.25 11.25L14.25 6.75" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 6.75H14.25V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </BuyerIcon>
);

export const BuyerTransfoIcon = (props: ComponentProps<"svg">) => (
  <BuyerIcon {...props}>
    <path d="M2.25 4.5H15.75V13.5H2.25V4.5Z" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M6 9H12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M5.25 2.25L6.75 4.5M12.75 2.25L11.25 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </BuyerIcon>
);
