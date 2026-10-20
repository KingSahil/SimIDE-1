

export const VsCodeIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M17.5 2.5L7.2 10.4L3.1 7.2L1.5 8.2V15.8L3.1 16.8L7.2 13.6L17.5 21.5L22.5 19V5L17.5 2.5ZM17.5 17.5L9.6 12L17.5 6.5V17.5Z"
      fill="#007ACC"
    />
    <path
      d="M17.5 2.5L22.5 5V19L17.5 21.5V17.5L9.6 12L17.5 6.5V2.5Z"
      fill="#168BFF"
    />
    <path
      d="M3.1 7.2L7.2 10.4L3.1 13.6L1.5 12.3V8.7L3.1 7.2Z"
      fill="#005A9E"
    />
  </svg>
);

export const GithubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export const SimIdeLogo: React.FC<{ size?: number; className?: string }> = ({ size = 28, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="navCubeTop" x1="12" y1="8" x2="36" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#168BFF" />
        <stop offset="100%" stopColor="#8057E8" />
      </linearGradient>
      <linearGradient id="navCubeLeft" x1="12" y1="20" x2="24" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#007ACC" />
        <stop offset="100%" stopColor="#0D1521" />
      </linearGradient>
      <linearGradient id="navCubeRight" x1="24" y1="20" x2="36" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#168BFF" />
        <stop offset="100%" stopColor="#152235" />
      </linearGradient>
    </defs>
    <polygon points="24,8 39,16.5 24,25 9,16.5" fill="url(#navCubeTop)" stroke="#26364A" strokeWidth="1.5" />
    <polygon points="9,16.5 24,25 24,40 9,31.5" fill="url(#navCubeLeft)" stroke="#26364A" strokeWidth="1.5" />
    <polygon points="24,25 39,16.5 39,31.5 24,40" fill="url(#navCubeRight)" stroke="#26364A" strokeWidth="1.5" />
    <path d="M19 14.5 L15 17 L19 19.5" stroke="#F4F7FB" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M29 14.5 L33 17 L29 19.5" stroke="#F4F7FB" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="24" cy="17" r="1.8" fill="#3CCB83" />
  </svg>
);
