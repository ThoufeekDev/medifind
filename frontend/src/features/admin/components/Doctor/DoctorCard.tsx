import type { Doctor } from "../../types/doctor.type";

interface DoctorCardProps {
  doctor: Doctor;
}

const FALLBACK_IMAGE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqXZtK2H_tL2dVLrMld2yMjz8AwRW8DqTGnjEYBYge3Q&s=10";

export default function DoctorCard({
  doctor,
}: DoctorCardProps) {
  // Generates diverse mock schedules matching the layout's aesthetic look
  const getSchedule = (doc: Doctor) => {
    if (!doc.onDuty) return "Mon - Sat, Emergency Only";
    const charCodeSum = doc.name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    if (charCodeSum % 3 === 0) return "Mon - Fri, 09:00 - 17:00";
    if (charCodeSum % 3 === 1) return "Tue, Thu, Sat | Available";
    return "Mon - Fri, 08:00 - 16:00";
  };

  return (
    <div className={`doctor-card ${!doctor.isActive ? "is-inactive" : ""}`}>
      {/* Top Section: Photo and Rating */}
      <div className="card-header-row">
        <div className="photo-container">
          <img
            src={doctor.imageUrl || FALLBACK_IMAGE}
            alt={doctor.name}
            className="doctor-photo"
          />
          <div className={`status-badge-wrapper ${doctor.onDuty ? "on-duty" : "off-duty"}`} title={doctor.onDuty ? "On Duty" : "Off Duty"}>
            {doctor.onDuty ? (
              <svg className="badge-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg className="badge-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            )}
          </div>
        </div>

        <div className="rating-block">
          <div className="rating-value">
            <svg className="star-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>{doctor.averageRating > 0 ? doctor.averageRating.toFixed(1) : "5.0"}</span>
          </div>
          <div className="review-count">
            {doctor.reviewCount > 0 ? `(${doctor.reviewCount} REVIEWS)` : "(NEW DOCTOR)"}
          </div>
        </div>
      </div>

      {/* Middle Section: Name, specialty, details */}
      <div className="card-body">
        <h3 className="doctor-name">
          {doctor.name}
          {!doctor.isActive && <span className="inactive-label">Inactive</span>}
        </h3>
        <p className="doctor-specialty">{doctor.specialization}</p>

        <div className="doctor-details-list">
          <div className="detail-item" title="Experience">
            <svg className="detail-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <span>{doctor.experience} Years Experience</span>
          </div>
          <div className="detail-item" title="Schedule">
            <svg className="detail-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>{getSchedule(doctor)}</span>
          </div>
          <div className="detail-item fee-item" title="Consultation Fee">
            <svg className="detail-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <span>₹{doctor.consultationFee} Consultation</span>
          </div>
        </div>
      </div>

      <div className="card-divider"></div>

      {/* Bottom Section: Action Buttons */}
      <div className="card-actions">
        <button className="btn-card-secondary">
          Profile
        </button>
        <button className="btn-card-primary">
          Book
        </button>
      </div>
    </div>
  );
}