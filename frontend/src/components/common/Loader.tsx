// components/common/Loader.tsx
import { motion } from 'framer-motion';

interface LoaderProps {
  text?: string;
  subtext?: string;
  fullScreen?: boolean;
}

export default function Loader({
  text = 'MediFind',
  subtext = 'Loading healthcare services...',
  fullScreen = true,
}: LoaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: fullScreen ? '100dvh' : '100%',
        minHeight: fullScreen ? '100vh' : '300px',
        backgroundColor: fullScreen ? '#f8fafc' : 'transparent',
        backgroundImage: fullScreen
          ? 'radial-gradient(circle at 50% 35%, rgba(6, 182, 212, 0.09) 0%, rgba(2, 132, 199, 0.03) 50%, rgba(248, 250, 252, 1) 100%)'
          : 'none',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif",
        position: fullScreen ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        zIndex: fullScreen ? 9999 : 1,
      }}
    >
      {/* Transparent Floating Animation Engine */}
      <motion.div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          maxWidth: '360px',
          width: '100%',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Heartbeat Pulse Ring Engine */}
        <div style={{ position: 'relative', width: 80, height: 80, marginBottom: '1.25rem' }}>
          {/* Radial Expand Pulse Aura */}
          <motion.div
            style={{
              position: 'absolute',
              inset: -10,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.22) 0%, rgba(6, 182, 212, 0) 70%)',
            }}
            animate={{ scale: [0.9, 1.45, 0.9], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          />

          {/* SVG Rotating Gradient Ring */}
          <svg width="80" height="80" viewBox="0 0 80 80" style={{ position: 'absolute', inset: 0 }}>
            <defs>
              <linearGradient id="medifind-loader-spin" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="70%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="rgba(2, 132, 199, 0.08)" />
              </linearGradient>
            </defs>
            <circle
              cx="40"
              cy="40"
              r="35"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="4"
            />
            <motion.circle
              cx="40"
              cy="40"
              r="35"
              fill="none"
              stroke="url(#medifind-loader-spin)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="165 60"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '40px 40px' }}
            />
          </svg>

          {/* Central Medical Badge with Heartbeat Rhythm */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 16,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(6, 182, 212, 0.35)',
            }}
            animate={{
              scale: [1, 1.12, 1, 1.06, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.2, 0.4, 0.6, 1],
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </motion.div>
        </div>

        {/* Brand Name Header */}
        <div
          style={{
            fontSize: '1.3rem',
            fontWeight: 800,
            color: '#0f172a',
            letterSpacing: '-0.025em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem',
            marginBottom: '0.35rem',
          }}
        >
          <span>{text === 'MediFind' ? 'Medi' : text}</span>
          {text === 'MediFind' && <span style={{ color: '#06b6d4' }}>Find</span>}
        </div>

        {/* Subtext */}
        <div
          style={{
            fontSize: '0.84rem',
            color: '#64748b',
            fontWeight: 500,
            lineHeight: 1.45,
            marginBottom: '1.35rem',
          }}
        >
          {subtext}
        </div>

        {/* Sleek Sweep Progress Shimmer Bar */}
        <div
          style={{
            width: '100%',
            height: '3px',
            background: '#f1f5f9',
            borderRadius: '99px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: '45%',
              background:
                'linear-gradient(90deg, rgba(6, 182, 212, 0.1), #06b6d4, #0284c7, rgba(2, 132, 199, 0.1))',
              borderRadius: '99px',
            }}
            animate={{
              left: ['-45%', '100%'],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}



