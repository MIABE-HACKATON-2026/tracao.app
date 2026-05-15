import type { ComponentProps } from "react";

const StoreIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>{props.children}</svg>
);

export const StoreDashboardIcon = (props: ComponentProps<"svg">) => (
  <StoreIcon {...props}>
    <path d="M2.25 8.25L9 2.25L15.75 8.25V15C15.75 15.4125 15.5875 15.7656 15.2625 16.0594C14.9375 16.3531 14.55 16.5 14.1 16.5H3.9C3.45 16.5 3.0625 16.3531 2.7375 16.0594C2.4125 15.7656 2.25 15.4125 2.25 15V8.25Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.75 16.5V9.75H11.25V16.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </StoreIcon>
);

export const StoreMembersIcon = (props: ComponentProps<"svg">) => (
  <StoreIcon {...props}>
    <path d="M12 7C13.1046 7 14 6.10457 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5C10 6.10457 10.8954 7 12 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 7C7.10457 7 8 6.10457 8 5C8 3.89543 7.10457 3 6 3C4.89543 3 4 3.89543 4 5C4 6.10457 4.89543 7 6 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 15V13C16 11.8954 15.1046 11 14 11H10C8.89543 11 8 11.8954 8 13V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 15V13C8 11.8954 7.10457 11 6 11H4C2.89543 11 2 11.8954 2 13V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </StoreIcon>
);

export const StoreAgentsIcon = (props: ComponentProps<"svg">) => (
  <StoreIcon {...props}>
    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 15C2 12.7909 3.79086 11 6 11H12C14.2091 11 16 12.7909 16 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 2L15 5L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </StoreIcon>
);

export const StoreValidationIcon = (props: ComponentProps<"svg">) => (
  <StoreIcon {...props}>
    <path d="M6 3H12L15 6V15C15 15.5523 14.5523 16 14 16H4C3.44772 16 3 15.5523 3 15V4C3 3.44772 3.44772 3 4 3H6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 10L8 12L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 3V6H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </StoreIcon>
);

export const StoreTransportIcon = (props: ComponentProps<"svg">) => (
  <StoreIcon {...props}>
    <path d="M1 9H13V15H1V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 9L17 11V15H13V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="4" cy="15" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="14" cy="15" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M1 11H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M1 13H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </StoreIcon>
);

export const StoreFraudIcon = (props: ComponentProps<"svg">) => (
  <StoreIcon {...props}>
    <path d="M9 2L2 5V9C2 12.866 5.13401 16 9 16C12.866 16 16 12.866 16 9V5L9 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 6V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="12.5" r="0.5" fill="currentColor"/>
  </StoreIcon>
);

export const StoreReportIcon = (props: ComponentProps<"svg">) => (
  <StoreIcon {...props}>
    <path d="M3 15H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3 12L7 8L11 11L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="3" cy="12" r="1" fill="currentColor"/>
    <circle cx="7" cy="8" r="1" fill="currentColor"/>
    <circle cx="11" cy="11" r="1" fill="currentColor"/>
    <circle cx="15" cy="5" r="1" fill="currentColor"/>
  </StoreIcon>
);

export const StoreBellIcon = (props: ComponentProps<"svg">) => (
  <StoreIcon {...props}>
    <path d="M15 14H3V13C3 10.5 5 8.5 5 8.5V5C5 2.5 7 1 9 1C11 1 13 2.5 13 5V8.5C13 8.5 15 10.5 15 13V14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 14C7 15.5 8 17 9 17C10 17 11 15.5 11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </StoreIcon>
);

export const StoreProfileIcon = (props: ComponentProps<"svg">) => (
  <StoreIcon {...props}>
    <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 14.5C3 12 5.5 10 9 10C12.5 10 15 12 15 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="1.5" y="1.5" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
  </StoreIcon>
);

export const StorePendingIcon = (props: ComponentProps<"svg">) => (
  <StoreIcon {...props}>
    <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9 5V9L12 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </StoreIcon>
);

export const StoreHistoryIcon = (props: ComponentProps<"svg">) => (
  <StoreIcon {...props}>
    <path d="M15 9C15 12.3137 12.3137 15 9 15C5.68629 15 3 12.3137 3 9C3 5.68629 5.68629 3 9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 5V9L12 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 3L15 6L12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </StoreIcon>
);

export const StoreMissionIcon = (props: ComponentProps<"svg">) => (
  <StoreIcon {...props}>
    <path d="M9 2V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 9H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="9" cy="9" r="4" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="9" cy="9" r="1.5" fill="currentColor"/>
  </StoreIcon>
);

export const StoreQrIcon = (props: ComponentProps<"svg">) => (
  <StoreIcon {...props}>
    <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 10H12V12H10V10Z" fill="currentColor"/>
    <path d="M14 10H16V12H14V10Z" fill="currentColor"/>
    <path d="M10 14H12V16H10V14Z" fill="currentColor"/>
    <path d="M14 14H16V16H14V14Z" fill="currentColor"/>
  </StoreIcon>
);
