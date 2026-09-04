import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export default function NotFoundPage() {
  return (
    <main className="industry-error-container">
      <div className="error-card">
        {/* Animation Area */}
        <div className="runner-sandbox">
          <div className="runner">
            <div className="head"></div>
            <div className="torso"></div>
            <div className="arm-back"></div>
            <div className="arm-front"></div>
            <div className="leg-back"></div>
            <div className="leg-front"></div>
          </div>

          <div className="floor-line"></div>

          <div className="speed-line sl-1"></div>
          <div className="speed-line sl-2"></div>
          <div className="speed-line sl-3"></div>
        </div>

        {/* Error Code */}
        <h1 className="display-code">404</h1>

        {/* Message */}
        <div className="text-group">
          <h2 className="heading">Page Not Found</h2>

          <p className="subtext">
            Sorry, we couldn't find the page you're looking for. The page may have been moved,
            deleted, or the URL may be incorrect.
          </p>
        </div>

        {/* Actions */}
        <div className="action-group">
          <Link to="/" className="btn-primary">
            Return to Home
          </Link>

          <button type="button" onClick={() => window.history.back()} className="btn-secondary">
            Go Back
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="error-footer">
        <p>&copy; {new Date().getFullYear()} MediFind. All rights reserved.</p>
      </footer>
    </main>
  );
}
