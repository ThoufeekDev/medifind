import api from "../../../api/axios";

import type { Hospital } from "../types/hospital.type";


export interface CreateHospitalResponse{
    success:boolean,
    hospitalInfo:Hospital
}

export interface GetHospitalResponse {
    success:boolean,
    hospital:Hospital | null,
}




export const getMyHospital = async():Promise<GetHospitalResponse>=>{
   
        const response = await api.get<GetHospitalResponse>('/hospital/me');
        // console.log('getHospital',response.data)
        return response.data
    
}

export const createHospital = async(data:FormData):Promise<Hospital>=>{
    const response = await api.post<CreateHospitalResponse>(
        '/hospital',
        data,
        {
            headers:{
                "Content-Type":"multipart/form-data",
            }
        }
    );
  
    return response.data.hospitalInfo;
}




