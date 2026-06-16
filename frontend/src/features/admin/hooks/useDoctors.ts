import { useEffect, useState } from "react";
import { getDoctors } from "../services/doctor.service";
import type { Doctor } from "../types/doctor.type";

export const useDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const data = await getDoctors();
      setDoctors(data);
    } finally {
      setLoading(false);
    }
  };

  return {
    doctors,
    loading,
    refresh: loadDoctors,
  };
};