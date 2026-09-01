import DoctorCard from "./DoctorCard";
import type { Doctor } from "../../types/doctor.type";

interface DoctorListProps {
  doctors: Doctor[];
}

export default function DoctorList({
  doctors,
}: DoctorListProps) {
if (doctors.length === 0) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center shadow-sm">
      <div className="flex justify-center mb-5">

      </div>

      <h3 className="text-2xl font-bold text-gray-800">
        No Doctors Found
      </h3>

      <p className="mt-3 text-gray-500 max-w-lg mx-auto leading-relaxed">
        We couldn't find any doctors matching the current filters.
        Try selecting different specializations, adjusting sorting
        options, or clearing active filters.
      </p>

      <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-sm text-gray-600 border">
        <span>💡</span>
        <span>
          You can also add a new doctor using the
          <strong> "Add Doctor"</strong> button above.
        </span>
      </div>
    </div>
  );
}
  return (
    <div className="doctors-grid">
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
        />
      ))}
    </div>
  );
}