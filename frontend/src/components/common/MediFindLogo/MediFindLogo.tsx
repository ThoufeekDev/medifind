import './MediFindLogo.css';

export interface MediFindLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'badge' | 'icon-only' | 'light';
  showText?: boolean;
  subtitle?: string;
  className?: string;
  onClick?: () => void;
}

export default function MediFindLogo({
  size = 'md',
  variant = 'default',
  showText = true,
  subtitle,
  className = '',
  onClick,
}: MediFindLogoProps) {
  return (
    <div
      className={`medifind-logo size-${size} variant-${variant} ${onClick ? 'clickable' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="medifind-logo-icon" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="9" fill="url(#medifind-logo-grad)" />
          
          {/* Medical Plus Cross Emblem */}
          <path
            d="M16 6V26M6 16H26"
            stroke="#ffffff"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Cyan Heartbeat Pulse Overlay */}
          <path
            d="M10 16H13.2L14.8 11.5L17.2 20.5L18.8 16H22"
            stroke="#06b6d4"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <defs>
            <linearGradient id="medifind-logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="55%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="medifind-logo-text">
          <span className="brand-title">
            <span className="brand-medi">Medi</span>
            <span className="brand-find">Find</span>
          </span>
          {subtitle && <span className="brand-subtitle">{subtitle}</span>}
        </div>
      )}
    </div>
  );
}
