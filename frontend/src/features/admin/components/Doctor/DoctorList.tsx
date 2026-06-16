import DoctorCard from "./DoctorCard";
import type { Doctor } from "../../types/doctor.type";

interface DoctorListProps {
  doctors: Doctor[];
}

export default function DoctorList({
  doctors,
}: DoctorListProps) {
    console.log("doctor data",doctors)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
        />
      ))}
    </div>
  );
}