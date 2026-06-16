import api from "../../../api/axios";
import type { Doctor } from "../types/doctor.type";

export const getDoctors = async():Promise<Doctor[]>=>{
    const response = await api.get('/doctors');
    
    return response.data.data
} 