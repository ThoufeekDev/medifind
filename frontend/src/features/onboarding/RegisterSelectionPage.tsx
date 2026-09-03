import { Link } from 'react-router-dom';
import './gateWay.css';

export default function GatewayPage() {
  return (
    <div className="gateway-container">
      {/* Platform Entry Header */}
      <header className="gateway-header">
        <div className="brand-logo" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          MediFind
        </div>
        <h1>Welcome</h1>
        <p>
          Find trusted healthcare services or onboard your hospital to manage doctors, appointments,
          and patients.
        </p>
      </header>

      {/* Grid Configuration Segment */}
      <nav className="gateway-grid" aria-label="Portal Navigation Actions">
        {/* OPTION 1: SEEKER / PATIENT */}
        <Link to="/register/user" className="gateway-card patient-path">
          <div className="card-icon" aria-hidden="true">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M21 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            </svg>
          </div>
          <h2>Find Healthcare</h2>
          <p>Search hospitals, discover specialists, and book appointments.</p>
          <span className="card-action-link">
            Get Started
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </Link>

        {/* OPTION 2: HOSPITAL / ADMIN */}
        <Link to="/register/hospital" className="gateway-card hospital-path">
          <div className="card-icon" aria-hidden="true">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </div>
          <h2>Register Hospital</h2>
          <p>Manage your hospital, doctors, appointments, and patient operations.</p>
          <span className="card-action-link">
            Register Hospital
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </Link>
      </nav>
    </div>
  );
}
