import type { Doctor } from "../../types/doctor.type";

interface DoctorCardProps {
  doctor: Doctor;
}

const FALLBACK_IMAGE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqXZtK2H_tL2dVLrMld2yMjz8AwRW8DqTGnjEYBYge3Q&s=10";

export default function DoctorCard({
  doctor,
}: DoctorCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="flex flex-col items-center">
        <img
          src={doctor.imageUrl || FALLBACK_IMAGE}
          alt={doctor.name}
          className="w-24 h-24 rounded-full object-cover mb-3"
        />

        <h3 className="font-semibold text-lg">
          {doctor.name}
        </h3>

        <p className="text-gray-600">
          {doctor.specialization}
        </p>

        <p className="text-sm text-gray-500">
          {doctor.experience} Years Experience
        </p>

        {doctor.reviewCount > 0 ? (
          <p className="mt-2">
            ⭐ {doctor.averageRating} (
            {doctor.reviewCount} reviews)
          </p>
        ) : (
          <p className="mt-2 text-gray-500">
            ⭐ New Doctor
          </p>
        )}
      </div>

      <div className="flex gap-2 mt-4">
        <button className="flex-1 border rounded py-2">
          View Profile
        </button>

        <button className="flex-1 border rounded py-2">
          Book Appointment
        </button>
      </div>
    </div>
  );
}