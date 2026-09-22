/**
 * Ícones de linha do site (traço fino, herdando currentColor) e o "G" oficial
 * do Google (cores da marca, sem alterações).
 */
type P = { size?: number; className?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
});

export const IconWhatsApp = ({ size = 20, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Z" />
    <path d="M8.8 8.6c.2-.5.5-.5.8-.5h.6c.2 0 .4 0 .6.5s.7 1.7.7 1.8c.1.2.1.3 0 .5-.3.6-.7.8-.5 1.2.7 1.2 1.6 2 2.8 2.5.3.2.5 0 .7-.2l.7-.8c.2-.2.4-.2.6-.1l1.7.8c.3.2.4.3.4.5 0 .8-.5 1.7-1.3 2-.7.2-1.6.3-2.9-.3-1.4-.6-2.9-1.7-4-3.4-.7-1-1.3-2.2-1.2-3.4 0-.5.2-1 .3-1.1Z" fill="currentColor" stroke="none" />
  </svg>
);

export const IconPhone = ({ size = 20, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M5 4h4l1.5 4L8.5 9.5a12 12 0 0 0 6 6L16 13.5l4 1.5v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);

export const IconInstagram = ({ size = 20, className }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const IconPin = ({ size = 20, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const IconClock = ({ size = 20, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const IconArrowRight = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4 12h15M14 6.5 19.5 12 14 17.5" />
  </svg>
);

export const IconChevronRight = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M9 5.5 15.5 12 9 18.5" />
  </svg>
);

export const IconStar = ({ size = 22, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 17.1l-5.7 3.1 1.2-6.3L2.8 9.5l6.4-.8L12 2.8Z"
      fill="var(--dourado)"
    />
  </svg>
);

export const IconSpeech = ({ size = 34, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 4a8 8 0 0 1 8 8 8 8 0 0 1-8 8H5.5c-.8 0-1.2-.9-.7-1.5l1.3-1.6A8 8 0 0 1 12 4Z" />
  </svg>
);

export const IconUsers = ({ size = 30, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="9" cy="8.5" r="3" />
    <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
    <circle cx="16.5" cy="9.5" r="2.4" />
    <path d="M15.5 14.5a4.6 4.6 0 0 1 5 4.5" />
  </svg>
);

export const IconToothLine = ({ size = 30, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M8.5 3.5c-2.6 0-4.5 2-4.5 5 0 4.5 2 12 3.8 12 1.4 0 1.3-4.2 2.3-5.8.5-.8 1.6-.8 2 0 .9 1.6.8 5.8 2.2 5.8 1.8 0 3.7-7.5 3.7-12 0-3-1.9-5-4.5-5-1.4 0-2 .7-2.7.7s-1-.7-2.3-.7Z" />
  </svg>
);

export const IconHeartLine = ({ size = 30, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 20.5S3.5 15 3.5 9.3C3.5 6.4 5.6 4.5 8 4.5c1.7 0 3.2 1 4 2.4.8-1.4 2.3-2.4 4-2.4 2.4 0 4.5 1.9 4.5 4.8 0 5.7-8.5 11.2-8.5 11.2Z" />
  </svg>
);

export const IconBulb = ({ size = 26, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3a6 6 0 0 0-3.4 10.9c.7.5 1.1 1.2 1.2 2V17h4.4v-1.1c.1-.8.5-1.5 1.2-2A6 6 0 0 0 12 3Z" />
    <path d="M10 20h4" />
  </svg>
);

export const IconDoc = ({ size = 26, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M7 3.5h7L18.5 8v12a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z" />
    <path d="M14 3.5V8h4.5M8.5 12h7M8.5 15.5h7" />
  </svg>
);

export const IconShieldLine = ({ size = 26, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3 5 5.8v5.4c0 4.4 3 8.3 7 9.8 4-1.5 7-5.4 7-9.8V5.8L12 3Z" />
    <path d="m9 12 2.2 2.2L15.5 9.7" />
  </svg>
);

export const IconSmile = ({ size = 26, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M8.5 14a4.5 4.5 0 0 0 7 0M9.3 9.8h0M14.7 9.8h0" />
  </svg>
);

export const IconPause = ({ size = 14, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 14 14" className={className} aria-hidden="true">
    <path d="M4 2.5v9M10 2.5v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconPlay = ({ size = 14, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 14 14" className={className} aria-hidden="true">
    <path d="M4 2.2v9.6L11.5 7 4 2.2Z" fill="currentColor" />
  </svg>
);

export const IconCamera = ({ size = 28, className }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="3.5" y="7" width="17" height="12.5" rx="2" />
    <path d="M8.5 7 10 4.5h4L15.5 7" />
    <circle cx="12" cy="13" r="3.2" />
  </svg>
);

/** "G" oficial do Google — cores da marca, sem alterações. */
export const IconGoogleG = ({ size = 22, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden="true">
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
    />
    <path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    />
  </svg>
);
