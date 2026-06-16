import { useEffect, useState } from "react";
import DoctorList from "../../components/Doctor/DoctorList";
import { getDoctors } from "../../services/doctor.service";
import Loader from "../../../../components/common/Loader";
import type { Doctor } from "../../types/doctor.type";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const data = await getDoctors();

      setDoctors(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader/>
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Doctors Directory
        </h1>

        <button>
          Add Doctor
        </button>
      </div>

      <DoctorList doctors={doctors} />
    </div>
  );
}