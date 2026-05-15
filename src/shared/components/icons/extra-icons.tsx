import type { ComponentProps } from "react";

export const UndoIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M5.25 7.5L2.25 10.5L5.25 13.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.25 10.5H11.25C13.7353 10.5 15.75 8.48528 15.75 6C15.75 3.51472 13.7353 1.5 11.25 1.5H9.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const RedoIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M12.75 7.5L15.75 10.5L12.75 13.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.75 10.5H6.75C4.26472 10.5 2.25 8.48528 2.25 6C2.25 3.51472 4.26472 1.5 6.75 1.5H8.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const EditIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M11.25 3.75L14.25 6.75M12.6375 2.3625C13.0125 1.9875 13.6219 1.9875 13.9969 2.3625L15.6375 4.00312C16.0125 4.37812 16.0125 4.9875 15.6375 5.3625L5.25 15.75H2.25V12.75L12.6375 2.3625Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ShareIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M13.5 11.25C12.4645 11.25 11.625 12.0895 11.625 13.125C11.625 14.1605 12.4645 15 13.5 15C14.5355 15 15.375 14.1605 15.375 13.125C15.375 12.0895 14.5355 11.25 13.5 11.25Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M4.5 6.75C3.46447 6.75 2.625 7.58947 2.625 8.625C2.625 9.66053 3.46447 10.5 4.5 10.5C5.53553 10.5 6.375 9.66053 6.375 8.625C6.375 7.58947 5.53553 6.75 4.5 6.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M13.5 2.25C12.4645 2.25 11.625 3.08947 11.625 4.125C11.625 5.16053 12.4645 6 13.5 6C14.5355 6 15.375 5.16053 15.375 4.125C15.375 3.08947 14.5355 2.25 13.5 2.25Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M6.375 7.5L11.625 5.25M6.375 9.75L11.625 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const DownloadIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M9 2.25V11.25M9 11.25L5.25 7.5M9 11.25L12.75 7.5M2.25 13.5V14.25C2.25 15.0784 2.92157 15.75 3.75 15.75H14.25C15.0784 15.75 15.75 15.0784 15.75 14.25V13.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LinkIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M5.83333 8.16667L8.16667 5.83333M4.66667 5.83333L3.5 6.99999C2.5335 7.96649 2.5335 9.5335 3.5 10.5C4.4665 11.4665 6.03351 11.4665 7 10.5L8.16667 9.33333M5.83333 4.66667L6.99999 3.5C7.96649 2.5335 9.5335 2.5335 10.5 3.5C11.4665 4.4665 11.4665 6.03351 10.5 7L9.33333 8.16667"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IDCardIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <rect x="4" y="8" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="14" cy="20" r="4" stroke="currentColor" strokeWidth="2" />
    <path d="M26 16H38M26 24H38M26 32H38M6 32C6 28 10 26 14 26C18 26 22 28 22 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IDCardBackIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <rect x="4" y="8" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
    <rect x="4" y="16" width="40" height="8" fill="currentColor" opacity="0.2" />
    <rect x="8" y="30" width="12" height="4" fill="currentColor" opacity="0.2" />
  </svg>
);

export const CameraIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M7.22107 4.5H16.7789C17.6539 4.5 18.4239 5.09 18.636 5.941L19.15 8H20C21.1046 8 22 8.89543 22 10V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V10C2 8.89543 2.89543 8 4 8H4.85L5.364 5.941C5.5761 5.09 6.3461 4.5 7.22107 4.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const FlashIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M8.66667 1.33333L2 9.33333H7.33333L6.66667 14.6667L13.3333 6.66667H8L8.66667 1.33333Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const MapIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M1 4.25L6.25 1L11.5 4.25L16.75 1V13.75L11.5 17L6.25 13.75L1 17V4.25Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M6.25 1V13.75M11.5 4.25V17" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const ArrowRightIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const HeartBrokenIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path d="M12 4.431c-1.108-2.608-4.029-4.431-7-4.431-3.866 0-7 3.134-7 7 0 5.225 3.816 9.309 14 20.25 10.184-10.941 14-15.025 14-20.25 0-3.866-3.134-7-7-7-2.971 0-5.892 1.823-7 4.431z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 8l4 8M14 8l-4 8" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);



export const TrashIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M2.25 4.5H15.75M6.75 4.5V3C6.75 2.17157 7.42157 1.5 8.25 1.5H9.75C10.5784 1.5 11.25 2.17157 11.25 3V4.5M14.25 4.5V14.25C14.25 15.0784 13.5784 15.75 12.75 15.75H5.25C4.42157 15.75 3.75 15.0784 3.75 14.25V4.5H14.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.5 7.5V12.75M10.5 7.5V12.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MoreVerticalIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <circle cx="9" cy="4" r="1.5" fill="currentColor" />
    <circle cx="9" cy="9" r="1.5" fill="currentColor" />
    <circle cx="9" cy="14" r="1.5" fill="currentColor" />
  </svg>
);

export const CheckCircleIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M15.75 9C15.75 12.7279 12.7279 15.75 9 15.75C5.27208 15.75 2.25 12.7279 2.25 9C2.25 5.27208 5.27208 2.25 9 2.25C12.7279 2.25 15.75 5.27208 15.75 9Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 9L8.25 11.25L12 6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const XCircleIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M15.75 9C15.75 12.7279 12.7279 15.75 9 15.75C5.27208 15.75 2.25 12.7279 2.25 9C2.25 5.27208 5.27208 2.25 9 2.25C12.7279 2.25 15.75 5.27208 15.75 9Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11.25 6.75L6.75 11.25M6.75 6.75L11.25 11.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PlusIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M9 3.75V14.25M3.75 9H14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MailIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M2.25 4.5H15.75V13.5H2.25V4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M2.25 4.5L9 9.75L15.75 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const MapPinIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M15 7.5C15 12.75 9 16.5 9 16.5C9 16.5 3 12.75 3 7.5C3 4.18629 5.68629 1.5 9 1.5C12.3137 1.5 15 4.18629 15 7.5Z" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="9" cy="7.5" r="2.25" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const SlashIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M12 3L6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const CreditCardIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <rect x="2.25" y="4.5" width="13.5" height="9.75" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2.25 8.25H15.75" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const TagIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M15.375 9.375L9.375 15.375L2.25 8.25V2.25H8.25L15.375 9.375Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="6" cy="6" r="1" fill="currentColor" />
  </svg>
);

export const ClockIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <circle cx="9" cy="9" r="6.75" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 4.5V9L12 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const BoxIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M15.75 5.25L9 1.5L2.25 5.25V12.75L9 16.5L15.75 12.75V5.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M2.25 5.25L9 9L15.75 5.25M9 9V16.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const CpuIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <rect x="4.5" y="4.5" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6.75 1.5V4.5M11.25 1.5V4.5M6.75 13.5V16.5M11.25 13.5V16.5M1.5 6.75H4.5M1.5 11.25H4.5M13.5 6.75H16.5M13.5 11.25H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const HashIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M3 6.75H15M3 11.25H15M6.75 3V15M11.25 3V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const ShieldCheckIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M9 1.5L2.25 4.5V9C2.25 13.1421 9 16.5 9 16.5C9 16.5 15.75 13.1421 15.75 9V4.5L9 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M6.75 9L8.25 10.5L11.25 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TerminalIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M3 5.25L6.75 9L3 12.75M9.75 13.5H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="1.5" y="2.25" width="15" height="13.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const ActivityIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M16.5 9H13.5L11.25 15.75L6.75 2.25L4.5 9H1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DatabaseIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <ellipse cx="9" cy="4.5" rx="6.75" ry="2.25" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2.25 4.5V13.5C2.25 14.7426 5.27208 15.75 9 15.75C12.7279 15.75 15.75 14.7426 15.75 13.5V4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2.25 9C2.25 10.2426 5.27208 11.25 9 11.25C12.7279 11.25 15.75 10.2426 15.75 9" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const ShieldIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M9 1.5L2.25 4.5V9C2.25 13.1421 9 16.5 9 16.5C9 16.5 15.75 13.1421 15.75 9V4.5L9 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const ShieldAlertIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M9 1.5L2.25 4.5V9C2.25 13.1421 9 16.5 9 16.5C9 16.5 15.75 13.1421 15.75 9V4.5L9 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9 6V9.75M9 12V12.0075" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const AlertTriangleIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M9 2.25L1.5 15H16.5L9 2.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9 6.75V10.5M9 12.75V12.7575" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const ChevronDownIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const FileTextIcon = ({ className = "", ...props }: ComponentProps<"svg">) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M10.5 1.5H3.75C2.92157 1.5 2.25 2.17157 2.25 3V15C2.25 15.8284 2.92157 16.5 3.75 16.5H14.25C15.0784 16.5 15.75 15.8284 15.75 15V6.75L10.5 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M10.5 1.5V6.75H15.75" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M5.25 9.75H12.75M5.25 12.75H12.75M5.25 6.75H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
