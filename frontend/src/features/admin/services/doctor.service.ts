import api from "../../../api/axios";
import type { Doctor } from "../types/doctor.type";
import type {DoctorFilters} from  "../types/doctorFilters.type";
export const getDoctors = async(filters?:DoctorFilters):Promise<Doctor[]>=>{
    const params = new URLSearchParams();
    if(filters?.specialization){
        params.append('specialization',filters.specialization);
    }

    if(filters?.onDuty!==undefined){
        params.append('onDuty',String(filters.onDuty));
    }

    if(filters?.sort){
        params.append('onDuty',String(filters.onDuty))
    }

    
    const response = await api.get(`/doctors?${params.toString()}`);
    
    return response.data.data
} 