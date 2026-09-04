import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';

import { useHospitalStore } from '../features/admin/store/hospital.store';
export default function AdminRedirect() {
  const navigate = useNavigate();

  const fetchHospital = useHospitalStore((state) => state.fetchHospital);

  useEffect(() => {
    const checkHospital = async () => {
      try {
        const response = await fetchHospital();
        // console.log("Hospital check response:", response);
        if (response) {
          navigate('/admin/dashboard', { replace: true });
        } else {
          navigate('/admin/create-hospital', { replace: true });
        }
      } catch (error) {
        console.error('Error checking hospital:', error);
        navigate('/admin/create-hospital', { replace: true });
      }
    };

    checkHospital();
  }, [navigate]);

  return <Loader />;
}
