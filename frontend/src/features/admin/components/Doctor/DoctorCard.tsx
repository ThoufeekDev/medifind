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
    <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col items-center">
        <img
          src={doctor.imageUrl || FALLBACK_IMAGE}
          alt={doctor.name}
          className="w-24 h-24 rounded-full object-cover border mb-4"
        />

        <h3 className="text-lg font-semibold flex items-center gap-2">
          {doctor.name}

          <span
            className={`w-2.5 h-2.5 rounded-full ${
              doctor.onDuty
                ? "bg-green-500"
                : "bg-gray-400"
            }`}
          />
        </h3>

        <p className="text-gray-600">
          {doctor.specialization}
        </p>

        <p className="text-sm text-gray-500 mt-1">
          {doctor.experience} Years Experience
        </p>

        <p className="text-sm font-medium mt-1">
          ₹{doctor.consultationFee}
        </p>

        <div className="flex gap-2 mt-3">
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              doctor.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {doctor.isActive
              ? "Active"
              : "Inactive"}
          </span>

          <span
            className={`px-2 py-1 text-xs rounded-full ${
              doctor.onDuty
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {doctor.onDuty
              ? "On Duty"
              : "Off Duty"}
          </span>
        </div>

        {doctor.reviewCount > 0 ? (
          <p className="mt-3 text-sm">
            ⭐ {doctor.averageRating} (
            {doctor.reviewCount} reviews)
          </p>
        ) : (
          <p className="mt-3 text-sm text-gray-500">
            ⭐ New Doctor
          </p>
        )}
      </div>

      <div className="flex gap-2 mt-5">
        <button className="flex-1 border rounded-md py-2 text-sm hover:bg-gray-50">
          View Profile
        </button>

        <button className="flex-1 bg-blue-600 text-white rounded-md py-2 text-sm hover:bg-blue-700">
          Book
        </button>
      </div>
    </div>
  );
}