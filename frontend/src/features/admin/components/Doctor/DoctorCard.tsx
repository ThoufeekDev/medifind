import type { Doctor } from '../../types/doctor.type';

interface DoctorCardProps {
  doctor: Doctor;
}

import "./DoctorCard.css"

const FALLBACK_IMAGE =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqXZtK2H_tL2dVLrMld2yMjz8AwRW8DqTGnjEYBYge3Q&s=10';

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <article className={`doctor-card ${!doctor.isActive ? 'is-inactive' : ''}`}>
      {/* --------------------------------
          Header
      --------------------------------- */}
      <div className="card-header-row">
        <div className="photo-container">
          <img src={doctor.imageUrl || FALLBACK_IMAGE} alt={doctor.name} className="doctor-photo" />

          <div
            className={`status-badge-wrapper ${doctor.onDuty ? 'on-duty' : 'off-duty'}`}
            title={doctor.onDuty ? 'Currently on duty' : 'Currently off duty'}
          >
            {doctor.onDuty ? (
              <svg
                className="badge-svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                className="badge-svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
          </div>
        </div>

        <div className="rating-block">
          <div className="rating-value">
            <svg
              className="star-icon"
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="currentColor"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>

            <span>{doctor.averageRating > 0 ? doctor.averageRating.toFixed(1) : '—'}</span>
          </div>

          <div className="review-count">
            {doctor.reviewCount > 0 ? `${doctor.reviewCount} reviews` : 'No reviews'}
          </div>
        </div>
      </div>

      {/* --------------------------------
          Doctor Information
      --------------------------------- */}
      <div className="card-body">
        <div className="doctor-title-row">
          <div>
            <h3 className="doctor-name">{doctor.name}</h3>

            <p className="doctor-specialty">{doctor.specialization}</p>
          </div>

          {!doctor.isActive && <span className="inactive-label">Inactive</span>}
        </div>

        <div className="doctor-details-list">
          {/* Experience */}
          <div className="detail-item" title="Experience">
            <svg
              className="detail-icon"
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>

            <span>
              {doctor.experience} {doctor.experience === 1 ? 'year' : 'years'} experience
            </span>
          </div>

          {/* Availability */}
          <div className="detail-item" title="Availability">
            <svg
              className="detail-icon"
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <polyline points="12 7 12 12 15 14" />
            </svg>

            <span>{doctor.onDuty ? 'Currently on duty' : 'Off duty'}</span>
          </div>

          {/* Consultation Fee */}
          <div className="detail-item fee-item" title="Consultation fee">
            <svg
              className="detail-icon"
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>

            <span>₹{doctor.consultationFee} consultation</span>
          </div>
        </div>
      </div>

      {/* --------------------------------
          Footer Actions
      --------------------------------- */}
      <div className="card-divider" />

      <div className="card-actions">
        <button type="button" className="btn-card-secondary">
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20h-2.6v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H6v-2.6h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V5h2.6v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1v2.6h-.1a1.7 1.7 0 0 0-1.6 1Z" />
          </svg>
          View Details
        </button>

        <button
          type="button"
          className={`btn-card-primary ${doctor.isActive ? 'deactivate' : 'activate'}`}
        >
          {doctor.isActive ? (
            <>
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              Deactivate
            </>
          ) : (
            <>
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <polyline points="8 12 11 15 16 9" />
              </svg>
              Activate
            </>
          )}
        </button>
      </div>
    </article>
  );
}
