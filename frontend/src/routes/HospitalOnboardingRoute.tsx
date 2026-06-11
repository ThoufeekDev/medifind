import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import { useHospitalStore } from "../features/admin/store/hospital.store";

export default function HospitalOnboardingRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const { hospital, fetchHospital } = useHospitalStore();

  const [checking, setChecking] =  useState(true);

  useEffect(() => {

    const loadHospital = async () => {
      await fetchHospital();
      setChecking(false);
    };

    loadHospital();

  }, []);


  // console.log("Hospital in Onboarding Route:", hospital);

  if (checking) {
    return <Loader />;
  }

  if (!hospital) {
    return (
      <Navigate
        to="/admin/create-hospital"
        replace
      />
    );
  }

  return children;
}