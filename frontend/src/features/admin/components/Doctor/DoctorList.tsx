import './DoctorList.css';
import DoctorCard from './DoctorCard';

import type { Doctor } from '../../types/doctor.type';

interface DoctorListProps {
  doctors: Doctor[];
}

export default function DoctorList({ doctors }: DoctorListProps) {
  if (doctors.length === 0) {
    return (
      <div className="doctor-list-empty">
        <div className="empty-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            width="32"
            height="32"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
            <path d="M8 11h6" />
          </svg>
        </div>

        <h3>No Doctors Found</h3>

        <p>
          We couldn't find any doctors matching the current filters. Try selecting different
          specializations or clearing the active filters.
        </p>

        <div className="empty-hint">
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>

          <span>
            You can also add a new doctor using <strong>"Add Doctor"</strong> button above.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="doctors-grid">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
}
