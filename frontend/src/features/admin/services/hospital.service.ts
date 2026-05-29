import api from "../../../api/axios";
import type { CreateHospitalDTO } from "../dtos/createHospital.dto";
export const getMyHospital = async()=>{
   
        const response = await api.get('/hospital/me');
        return response.data
    
}

export const createHospital = async(data:CreateHospitalDTO)=>{
    const response = await api.post('/hospital',data);
    console.log("Create hospital response:", response.data.hospitalInfo);
    return response.data.hospitalInfo;
}