import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useHospitalStore } from '../features/admin/store/hospital.store';
import Loader from '../components/common/Loader';
interface Props {
  children: React.ReactNode;
}

export default function AdminOnboardingRoute({ children }: Props) {
  const { hospital, loading, hasFetchedHospital, fetchHospital } = useHospitalStore();

  useEffect(() => {
    if (!hasFetchedHospital) {
      fetchHospital();
    }
  }, [hasFetchedHospital, fetchHospital]);

  if (loading) {
    return <Loader />;
  }

  if (hospital) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}
