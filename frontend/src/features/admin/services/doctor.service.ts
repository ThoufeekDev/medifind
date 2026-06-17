import api from "../../../api/axios";

import type { Doctor } from "../types/doctor.type";
import type {DoctorFilters} from  "../types/doctorFilters.type";
export const getDoctors = async(filters?:DoctorFilters):Promise<Doctor[]>=>{
    const params = new URLSearchParams();
    if(filters?.specializations?.length){
        params.append('specialization',filters.specializations.join(","));
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

export const createDoctor = async(data:FormData)=>{
    const response = await api.post('/doctors',data,
        {
            headers:{
                "Content-Type":"multipart/form-data"
            },
        }
    );
    return response.data;
}