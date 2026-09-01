import api from "../../../api/axios";

export const getSpecialization  = async () =>{
    const response = await api.get('/specializations');
    return response.data.data;
}