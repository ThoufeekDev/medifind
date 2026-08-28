import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import { useHospitalStore } from "../features/admin/store/hospital.store";

export default function HospitalOnboardingRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const { hospital,loading,hasFetchedHospital, fetchHospital } = useHospitalStore();


  useEffect(() => {

     if(!hasFetchedHospital){
           fetchHospital();
     }
     

  },[hasFetchedHospital,fetchHospital]);


 

if (!hasFetchedHospital || loading) {
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