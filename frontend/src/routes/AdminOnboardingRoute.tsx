import { Navigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { useHospitalStore } from "../features/admin/store/hospital.store";
import Loader from "../components/common/Loader";
interface Props {
  children: React.ReactNode;
}

export default function AdminOnboardingRoute({
  children,
}: Props) {

  const {
    hospital,
    fetchHospital
  } = useHospitalStore();
  const [checking, setChecking] =
    useState(true);

      useEffect(() => {

    const checkHospital = async () => {
      await fetchHospital();
      setChecking(false);
    };

    checkHospital();

  }, []);

    if (checking) {
    return <Loader />;
  }

  console.log("Hospital in AdminOnboardingRoute:", hospital);

  if (hospital) {
    return (
      <Navigate
        to="/admin/dashboard"
        replace
      />
    );
  }

  return children;
}